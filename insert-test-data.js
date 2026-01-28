const fetch = require('node-fetch').default;

// Test data for modules
const modules = [
  {
    id: 'module-001',
    sequence: 1,
    title: 'Operational Security Protocols',
    phase: 'DOCTRINE',
    focus: 'Security and Counter-Intelligence',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'module-002',
    sequence: 2,
    title: 'Cognitive Dissonance Engineering',
    phase: 'THEORY',
    focus: 'Psychological Warfare Techniques',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'module-003',
    sequence: 3,
    title: 'Social Engineering Deployment',
    phase: 'TACTIC',
    focus: 'Human Psychology Exploitation',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Test data for lessons
const lessons = [
  {
    id: 'lesson-001',
    module_id: 'module-001',
    sequence: 1,
    title: 'OPSEC Fundamentals',
    tactical_concept: 'Operational Security',
    historical_validator: 'Military Intelligence Doctrine',
    content_json: JSON.stringify({
      overview: 'Comprehensive guidelines for maintaining operational security in hostile environments.',
      principles: [
        'Compartmentalization of information',
        'Need-to-know basis for information sharing',
        'Continuous assessment of information leakage vectors'
      ],
      foundation: 'Systematic process of identifying, controlling, and protecting critical information'
    }),
    difficulty_level: 2,
    estimated_duration_minutes: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'lesson-002',
    module_id: 'module-002',
    sequence: 1,
    title: 'Cognitive Dissonance Principles',
    tactical_concept: 'Cognitive Dissonance Engineering',
    historical_validator: 'Leon Festinger Research',
    content_json: JSON.stringify({
      overview: 'Systematic application of cognitive dissonance to destabilize target belief systems.',
      principles: [
        'Create conflicting cognitions within target belief system',
        'Exploit psychological discomfort to motivate change',
        'Introduce contradictory information strategically'
      ],
      foundation: 'When individuals encounter information that contradicts existing beliefs, they experience psychological discomfort'
    }),
    difficulty_level: 3,
    estimated_duration_minutes: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'lesson-003',
    module_id: 'module-003',
    sequence: 1,
    title: 'Social Engineering Techniques',
    tactical_concept: 'Human Psychology Exploitation',
    historical_validator: 'Kevin Mitnick Methods',
    content_json: JSON.stringify({
      overview: 'Advanced techniques for manipulating human psychology to gain unauthorized access.',
      techniques: [
        'Pretexting (creating false scenarios)',
        'Baiting (offering something enticing)',
        'Phishing (deceptive communication)'
      ],
      foundation: 'Exploitation of human psychology to bypass security measures and extract sensitive information'
    }),
    difficulty_level: 2,
    estimated_duration_minutes: 40,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Test data for tactical references
const references = [
  {
    id: 'ref-001',
    lesson_id: 'lesson-001',
    reference_type: 'BOOK',
    title: 'The Art of Intelligence',
    author: 'Henry A. Crumpton',
    source_url: 'https://example.com/art-of-intelligence',
    publication_date: '2014-01-01',
    description: 'Comprehensive guide to modern intelligence operations and operational security'
  },
  {
    id: 'ref-002',
    lesson_id: 'lesson-002',
    reference_type: 'ARTICLE',
    title: 'Cognitive Dissonance Theory',
    author: 'Leon Festinger',
    source_url: 'https://example.com/cognitive-dissonance',
    publication_date: '1957-01-01',
    description: 'Foundational research on cognitive dissonance and its psychological effects'
  },
  {
    id: 'ref-003',
    lesson_id: 'lesson-003',
    reference_type: 'VIDEO',
    title: 'Social Engineering in the Digital Age',
    author: 'Kevin Mitnick',
    source_url: 'https://example.com/social-engineering-video',
    publication_date: '2020-01-01',
    description: 'Modern techniques for social engineering attacks and defenses'
  }
];

async function insertData() {
  console.log('🚀 Inserting test data into D1 database...');
  
  try {
    // Insert modules directly using SQL
    console.log('📝 Inserting modules...');
    for (const module of modules) {
      const response = await fetch('http://127.0.0.1:8787/insert-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(module)
      });
      
      if (!response.ok) {
        console.error(`❌ Failed to insert module ${module.id}:`, response.statusText);
      } else {
        console.log(`✅ Module ${module.id} inserted successfully`);
      }
    }

    // Insert lessons directly using SQL
    console.log('📝 Inserting lessons...');
    for (const lesson of lessons) {
      const response = await fetch('http://127.0.0.1:8787/insert-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lesson)
      });
      
      if (!response.ok) {
        console.error(`❌ Failed to insert lesson ${lesson.id}:`, response.statusText);
      } else {
        console.log(`✅ Lesson ${lesson.id} inserted successfully`);
      }
    }

    // Insert references directly using SQL
    console.log('📝 Inserting references...');
    for (const reference of references) {
      const response = await fetch('http://127.0.0.1:8787/insert-reference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reference)
      });
      
      if (!response.ok) {
        console.error(`❌ Failed to insert reference ${reference.id}:`, response.statusText);
      } else {
        console.log(`✅ Reference ${reference.id} inserted successfully`);
      }
    }

    console.log('✅ Test data insertion complete!');
    
    // Verify data insertion
    console.log('🔍 Verifying data insertion...');
    await verifyData();
    
  } catch (error) {
    console.error('❌ Error inserting data:', error);
  }
}

async function verifyData() {
  try {
    // Check modules
    const modulesResponse = await fetch('http://127.0.0.1:8787/api/v1/docs');
    const modulesData = await modulesResponse.json();
    console.log(`📊 Found ${modulesData.length} modules in database`);
    
    // Check lessons
    const lessonsResponse = await fetch('http://127.0.0.1:8787/api/v1/concepts');
    const lessonsData = await lessonsResponse.json();
    console.log(`📊 Found ${lessonsData.length} lessons in database`);
    
    // Test search functionality
    const searchResponse = await fetch('http://127.0.0.1:8787/api/v1/search?q=security');
    const searchData = await searchResponse.json();
    console.log(`🔍 Search for "security" found ${searchData.totalResults} results`);
    
    console.log('✅ Data verification complete!');
    
  } catch (error) {
    console.error('❌ Error verifying data:', error);
  }
}

// Run the script
insertData();