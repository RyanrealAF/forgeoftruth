const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const fetch = require('node-fetch').default;

/**
 * Curriculum Migration Script
 * Migrates 120-lesson curriculum from markdown files to D1 database
 */

const CURRICULUM_PATH = path.join(__dirname, '../Educational/public/curriculum');
const API_BASE = 'http://127.0.0.1:8787';

// Phase mapping from master index
const PHASE_MAPPING = {
  'PHASE 1: THE PHYSICS': 'DOCTRINE',
  'PHASE 2: THE REFLECTION': 'REFLECTION', 
  'PHASE 3: THE ENDGAME': 'ENDGAME'
};

class CurriculumMigrator {
  constructor() {
    this.modules = [];
    this.lessons = [];
    this.references = [];
    this.stats = {
      modules: 0,
      lessons: 0,
      references: 0,
      errors: []
    };
  }

  /**
   * Main migration orchestrator
   */
  async migrate() {
    console.log('🚀 Starting Curriculum Migration...\n');

    try {
      // Phase 1: Parse master index and structure
      console.log('📋 Phase 1: Parsing master index and structure...');
      await this.parseMasterIndex();
      
      // Phase 2: Process all markdown files
      console.log('📚 Phase 2: Processing markdown files...');
      await this.processMarkdownFiles();
      
      // Phase 3: Validate and migrate to database
      console.log('✅ Phase 3: Validating and migrating to database...');
      await this.validateAndMigrate();
      
      // Phase 4: Create cross-references from NotebookLM content
      console.log('🔗 Phase 4: Creating NotebookLM cross-references...');
      await this.createNotebookLMReferences();
      
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    }
  }

  /**
   * Parse master index to extract module structure
   */
  async parseMasterIndex() {
    const masterIndexPath = path.join(CURRICULUM_PATH, 'master_index.md');
    const content = await fs.readFile(masterIndexPath, 'utf-8');
    
    // Extract module information using regex
    const moduleRegex = /### (Module \d+): (.+)/g;
    const phaseRegex = /## (PHASE \d+: .+)/g;
    
    let currentPhase = '';
    let moduleMatch;
    let phaseMatch;
    
    // First pass: extract phases
    while ((phaseMatch = phaseRegex.exec(content)) !== null) {
      const phaseTitle = phaseMatch[1];
      const phaseCode = PHASE_MAPPING[phaseTitle] || 'DOCTRINE';
      currentPhase = phaseCode;
    }
    
    // Reset regex state
    phaseRegex.lastIndex = 0;
    currentPhase = '';
    
    // Second pass: extract modules with their phases
    while ((moduleMatch = moduleRegex.exec(content)) !== null) {
      const moduleTitle = moduleMatch[2];
      const moduleNumber = parseInt(moduleMatch[1].replace('Module ', ''));
      
      // Determine phase based on module number
      let phase = 'DOCTRINE';
      if (moduleNumber >= 3 && moduleNumber <= 8) phase = 'REFLECTION';
      if (moduleNumber >= 9) phase = 'ENDGAME';
      
      // Generate unique ID that won't conflict with existing test data
      const uniqueId = `module-${Date.now()}-${String(moduleNumber).padStart(3, '0')}`;
      
      this.modules.push({
        id: uniqueId,
        sequence: moduleNumber,
        title: moduleTitle,
        phase: phase,
        focus: this.getModuleFocus(moduleTitle),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    console.log(`   ✓ Parsed ${this.modules.length} modules`);
  }

  /**
   * Get module focus based on title
   */
  getModuleFocus(title) {
    const focusMap = {
      'Hybrid Warfare Fundamentals': 'State Actor Doctrine & Non-Linear Conflict',
      'Intelligence Preparation of the Battlespace': 'HUMINT Tradecraft & Asset Development',
      'Network Topology & C2 Mirroring': 'Criminal Network Structure & State Parallels',
      'The Economics of Coercion': 'Resource Control & Financial Warfare',
      'Information Operations & Propaganda': 'Narrative Control & Psychological Operations',
      'Surveillance & Counter-Surveillance': 'Intelligence Gathering & Operational Security',
      'Paramilitary & Proxy Dynamics': 'Coercive Force & Proxy Management',
      'Institutional Co-option & State Capture': 'Systemic Corruption & Institutional Penetration',
      'Advanced Persistent Threats (Cyber & Cognitive)': 'Sovereign Cyber Capabilities & Cognitive Domain',
      'Strategic Endgames & Total Control': 'Grand Strategy & Systemic Dominance'
    };
    
    return focusMap[title] || 'Tactical Operations & Strategic Doctrine';
  }

  /**
   * Process all markdown files in curriculum directory
   */
  async processMarkdownFiles() {
    const modulesDir = await fs.readdir(CURRICULUM_PATH);
    const moduleDirs = modulesDir.filter(dir => dir.startsWith('mod_'));
    
    for (const moduleDir of moduleDirs) {
      await this.processModuleDirectory(moduleDir);
    }
    
    console.log(`   ✓ Processed ${this.lessons.length} lessons`);
  }

  /**
   * Process individual module directory
   */
  async processModuleDirectory(moduleDir) {
    const modulePath = path.join(CURRICULUM_PATH, moduleDir);
    const files = await fs.readdir(modulePath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Extract module number from directory name (handle both formats: mod_01 and mod_01_hybrid_warfare)
    const moduleNumberMatch = moduleDir.match(/mod_(\d+)/);
    if (!moduleNumberMatch) return;
    
    const moduleNumber = parseInt(moduleNumberMatch[1]);
    
    // Find the corresponding module with the unique ID
    const module = this.modules.find(m => m.sequence === moduleNumber);
    if (!module) return;
    
    const moduleId = module.id;
    
    for (let i = 0; i < markdownFiles.length; i++) {
      const file = markdownFiles[i];
      const filePath = path.join(modulePath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      
      const lesson = this.parseLessonFile(content, moduleId, i + 1, file);
      if (lesson) {
        this.lessons.push(lesson);
      }
    }
  }

  /**
   * Parse individual lesson file
   */
  parseLessonFile(content, moduleId, sequence, filename) {
    // Extract title from first H1
    const titleMatch = content.match(/^# (.+)$/m);
    if (!titleMatch) return null;
    
    const title = titleMatch[1].trim();
    const lessonId = `${moduleId}-lesson-${String(sequence).padStart(3, '0')}`;
    
    // Extract tactical concept from content
    const tacticalConcept = this.extractTacticalConcept(content, title);
    
    // Extract historical validator
    const historicalValidator = this.extractHistoricalValidator(content, title);
    
    // Create content JSON
    const contentJson = JSON.stringify({
      title: title,
      overview: this.extractOverview(content),
      principles: this.extractPrinciples(content),
      techniques: this.extractTechniques(content),
      foundation: this.extractFoundation(content),
      indicators: this.extractIndicators(content),
      counter_tactics: this.extractCounterTactics(content)
    });
    
    return {
      id: lessonId,
      module_id: moduleId,
      sequence: sequence,
      title: title,
      tactical_concept: tacticalConcept,
      historical_validator: historicalValidator,
      content_json: contentJson,
      difficulty_level: this.calculateDifficulty(content),
      estimated_duration_minutes: this.calculateDuration(content),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Extract tactical concept from lesson content
   */
  extractTacticalConcept(content, title) {
    // Look for tactical category in content
    const categoryMatch = content.match(/\*\*Tactical Category:\*\* (.+)/);
    if (categoryMatch) return categoryMatch[1].trim();
    
    // Look for operational mechanics section
    const mechanicsMatch = content.match(/\*\*Operational Mechanics\*\*[\s\S]*?\n\n/);
    if (mechanicsMatch) return 'Operational Mechanics';
    
    // Default based on title keywords
    const titleLower = title.toLowerCase();
    if (titleLower.includes('reconnaissance') || titleLower.includes('intel')) return 'Intelligence Gathering';
    if (titleLower.includes('manipulation') || titleLower.includes('psych')) return 'Psychological Operations';
    if (titleLower.includes('network') || titleLower.includes('structure')) return 'Network Analysis';
    if (titleLower.includes('coercion') || titleLower.includes('control')) return 'Resource Control';
    
    return 'Tactical Operations';
  }

  /**
   * Extract historical validator from lesson content
   */
  extractHistoricalValidator(content, title) {
    // Look for historical validator in content
    const validatorMatch = content.match(/\*\*Historical Validator:\*\* (.+)/);
    if (validatorMatch) return validatorMatch[1].trim();
    
    // Look for source attribution
    const sourceMatch = content.match(/\*Source: (.+)\*/);
    if (sourceMatch) return sourceMatch[1].trim();
    
    // Default validators based on module
    const moduleId = content.match(/module_id: (.+)/);
    if (moduleId) {
      const modId = moduleId[1];
      if (modId.includes('01')) return 'Gerasimov Doctrine';
      if (modId.includes('02')) return 'Intelligence Tradecraft';
      if (modId.includes('03')) return 'Criminal Network Analysis';
      if (modId.includes('04')) return 'Economic Warfare';
      if (modId.includes('05')) return 'Propaganda Techniques';
      if (modId.includes('06')) return 'Surveillance Methods';
      if (modId.includes('07')) return 'Paramilitary Tactics';
      if (modId.includes('08')) return 'Institutional Corruption';
      if (modId.includes('09')) return 'Cyber Warfare';
      if (modId.includes('10')) return 'Strategic Doctrine';
    }
    
    return 'Tactical Analysis';
  }

  /**
   * Extract overview from content
   */
  extractOverview(content) {
    const overviewMatch = content.match(/\*\*Overview\*\*[\s\S]*?(?=\*\*|$)/);
    if (overviewMatch) {
      return overviewMatch[0].replace(/\*\*Overview\*\*/, '').trim();
    }
    return 'Overview not available';
  }

  /**
   * Extract principles from content
   */
  extractPrinciples(content) {
    const principlesMatch = content.match(/\*\*Principles\*\*[\s\S]*?(?=\*\*|$)/);
    if (principlesMatch) {
      const principlesText = principlesMatch[0].replace(/\*\*Principles\*\*/, '').trim();
      return principlesText.split('\n').filter(line => line.trim().startsWith('-')).map(line => 
        line.replace(/^- /, '').trim()
      );
    }
    return [];
  }

  /**
   * Extract techniques from content
   */
  extractTechniques(content) {
    const techniquesMatch = content.match(/\*\*Techniques\*\*[\s\S]*?(?=\*\*|$)/);
    if (techniquesMatch) {
      const techniquesText = techniquesMatch[0].replace(/\*\*Techniques\*\*/, '').trim();
      return techniquesText.split('\n').filter(line => line.trim().startsWith('-')).map(line => 
        line.replace(/^- /, '').trim()
      );
    }
    return [];
  }

  /**
   * Extract foundation from content
   */
  extractFoundation(content) {
    const foundationMatch = content.match(/\*\*Foundation\*\*[\s\S]*?(?=\*\*|$)/);
    if (foundationMatch) {
      return foundationMatch[0].replace(/\*\*Foundation\*\*/, '').trim();
    }
    return 'Foundation not available';
  }

  /**
   * Extract indicators from content
   */
  extractIndicators(content) {
    const indicatorsMatch = content.match(/\*\*Indicators\*\*[\s\S]*?(?=\*\*|$)/);
    if (indicatorsMatch) {
      const indicatorsText = indicatorsMatch[0].replace(/\*\*Indicators\*\*/, '').trim();
      return indicatorsText.split('\n').filter(line => line.trim().startsWith('-')).map(line => 
        line.replace(/^- /, '').trim()
      );
    }
    return [];
  }

  /**
   * Extract counter-tactics from content
   */
  extractCounterTactics(content) {
    const counterMatch = content.match(/\*\*Counter-Tactics\*\*[\s\S]*?(?=\*\*|$)/);
    if (counterMatch) {
      const counterText = counterMatch[0].replace(/\*\*Counter-Tactics\*\*/, '').trim();
      return counterText.split('\n').filter(line => line.trim().startsWith('-')).map(line => 
        line.replace(/^- /, '').trim()
      );
    }
    return [];
  }

  /**
   * Calculate difficulty level based on content complexity
   */
  calculateDifficulty(content) {
    const length = content.length;
    if (length < 500) return 1;
    if (length < 1500) return 2;
    return 3;
  }

  /**
   * Calculate estimated duration based on content length
   */
  calculateDuration(content) {
    const wordCount = content.split(/\s+/).length;
    // Average reading speed: 200 words per minute
    const baseMinutes = Math.ceil(wordCount / 200);
    return Math.max(15, baseMinutes); // Minimum 15 minutes
  }

  /**
   * Validate and migrate data to database
   */
  async validateAndMigrate() {
    // Validate modules
    await this.validateAndInsertModules();
    
    // Validate and insert lessons
    await this.validateAndInsertLessons();
    
    // Insert lesson content
    await this.insertLessonContent();
  }

  /**
   * Validate and insert modules
   */
  async validateAndInsertModules() {
    console.log('   📦 Validating and inserting modules...');
    
    for (const module of this.modules) {
      try {
        const response = await fetch(`${API_BASE}/insert-module`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(module)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to insert module ${module.id}: ${response.statusText}`);
        }
        
        this.stats.modules++;
        console.log(`     ✓ Inserted module ${module.id}: ${module.title}`);
        
      } catch (error) {
        this.stats.errors.push(`Module ${module.id}: ${error.message}`);
        console.error(`     ❌ Error inserting module ${module.id}:`, error.message);
      }
    }
  }

  /**
   * Validate and insert lessons
   */
  async validateAndInsertLessons() {
    console.log('   📚 Validating and inserting lessons...');
    
    for (const lesson of this.lessons) {
      try {
        // Validate lesson data
        if (!lesson.title || !lesson.tactical_concept || !lesson.historical_validator) {
          throw new Error('Missing required fields');
        }
        
        const response = await fetch(`${API_BASE}/insert-lesson`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lesson)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to insert lesson ${lesson.id}: ${response.statusText}`);
        }
        
        this.stats.lessons++;
        console.log(`     ✓ Inserted lesson ${lesson.id}: ${lesson.title}`);
        
      } catch (error) {
        this.stats.errors.push(`Lesson ${lesson.id}: ${error.message}`);
        console.error(`     ❌ Error inserting lesson ${lesson.id}:`, error.message);
      }
    }
  }

  /**
   * Insert lesson content to lesson_content table
   */
  async insertLessonContent() {
    console.log('   📝 Inserting lesson content...');
    
    for (const lesson of this.lessons) {
      try {
        // Find the original module directory name based on the module sequence
        const moduleSequence = parseInt(lesson.module_id.match(/-(\d+)$/)[1]);
        const originalModuleDir = `mod_${String(moduleSequence).padStart(2, '0')}`;
        
        // Find the actual directory name that exists
        const modulesDir = await fs.readdir(CURRICULUM_PATH);
        const actualModuleDir = modulesDir.find(dir => dir.startsWith(`mod_${String(moduleSequence).padStart(2, '0')}`));
        
        if (!actualModuleDir) {
          throw new Error(`Module directory not found for sequence ${moduleSequence}`);
        }
        
        // Find the markdown file
        const modulePath = path.join(CURRICULUM_PATH, actualModuleDir);
        const files = await fs.readdir(modulePath);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        
        // Find the matching file based on lesson title
        const lessonFile = markdownFiles.find(f => 
          f.toLowerCase().includes(lesson.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''))
        );
        
        let contentText = '';
        if (lessonFile) {
          const filePath = path.join(modulePath, lessonFile);
          contentText = await fs.readFile(filePath, 'utf-8');
        } else {
          // Fallback to JSON content if file not found
          contentText = lesson.content_json;
        }
        
        const contentData = {
          id: `content-${lesson.id}`,
          lesson_id: lesson.id,
          content_type: 'markdown',
          content_text: contentText,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const response = await fetch(`${API_BASE}/insert-lesson-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contentData)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to insert content for lesson ${lesson.id}: ${response.statusText}`);
        }
        
        console.log(`     ✓ Inserted content for lesson ${lesson.id}`);
        
      } catch (error) {
        this.stats.errors.push(`Content ${lesson.id}: ${error.message}`);
        console.error(`     ❌ Error inserting content for lesson ${lesson.id}:`, error.message);
      }
    }
  }

  /**
   * Create NotebookLM references
   */
  async createNotebookLMReferences() {
    console.log('   🔗 Creating NotebookLM references...');
    
    const notebooklmPath = path.join(__dirname, '../notebooklm-import-raw');
    
    try {
      const files = await fs.readdir(notebooklmPath);
      const textFiles = files.filter(file => file.endsWith('.txt'));
      
      for (const file of textFiles) {
        const filePath = path.join(notebooklmPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        const reference = this.parseNotebookLMFile(content, file);
        if (reference) {
          try {
            const response = await fetch(`${API_BASE}/insert-reference`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(reference)
            });
            
            if (!response.ok) {
              throw new Error(`Failed to insert reference ${reference.id}: ${response.statusText}`);
            }
            
            this.stats.references++;
            console.log(`     ✓ Inserted reference ${reference.id}: ${reference.title}`);
            
          } catch (error) {
            this.stats.errors.push(`Reference ${reference.id}: ${error.message}`);
            console.error(`     ❌ Error inserting reference ${reference.id}:`, error.message);
          }
        }
      }
      
    } catch (error) {
      console.error('     ❌ Error reading NotebookLM directory:', error.message);
    }
  }

  /**
   * Parse NotebookLM file to extract reference metadata
   */
  parseNotebookLMFile(content, filename) {
    // Extract title from filename or content
    const title = filename.replace('.txt', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Extract author from content (look for patterns like "by Author" or "Author:")
    let author = 'Unknown';
    const authorMatch = content.match(/(?:by|Author|Written by):\s*([^\n]+)/i);
    if (authorMatch) author = authorMatch[1].trim();
    
    // Extract publication year
    let publicationDate = '';
    const yearMatch = content.match(/(\d{4})/);
    if (yearMatch) publicationDate = yearMatch[1];
    
    // Create description from first paragraph
    const description = content.split('\n\n')[0].substring(0, 500) + '...';
    
    return {
      id: `ref-${crypto.randomUUID()}`,
      lesson_id: null, // Will be linked later
      reference_type: 'CASE_STUDY',
      title: title,
      author: author,
      source_url: `notebooklm://raw/${filename}`,
      publication_date: publicationDate,
      description: description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Print migration summary
   */
  printSummary() {
    console.log('\n📊 Migration Summary:');
    console.log(`   Modules inserted: ${this.stats.modules}`);
    console.log(`   Lessons inserted: ${this.stats.lessons}`);
    console.log(`   References inserted: ${this.stats.references}`);
    console.log(`   Errors: ${this.stats.errors.length}`);
    
    if (this.stats.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      this.stats.errors.forEach(error => console.log(`   - ${error}`));
    }
    
    console.log('\n✅ Migration completed!');
  }
}

// Run migration
if (require.main === module) {
  const migrator = new CurriculumMigrator();
  migrator.migrate().catch(console.error);
}

module.exports = CurriculumMigrator;