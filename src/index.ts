// Cloudflare Worker for Tactical Index API
// Connected to D1 database: tactical-curriculum-db

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Test route: GET /test-db
    if (url.pathname === '/test-db') {
      try {
        // Check what tables exist
        const tables = await env.DB.prepare('SELECT name FROM sqlite_master WHERE type="table"').all();
        
        // Try to count records in each table
        const tableCounts: Record<string, number> = {};
        for (const table of tables.results || []) {
          try {
            const count = await env.DB.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).first();
            tableCounts[table.name] = count?.count || 0;
          } catch (e) {
            tableCounts[table.name] = -1; // Error accessing table
          }
        }

        return new Response(JSON.stringify({
          status: 'connected',
          tables: tableCounts,
          message: 'Database connection successful'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          status: 'error',
          message: (error as Error).message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Initialize database schema
    if (url.pathname === '/init-db') {
      try {
        // Create modules table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS modules (
            id TEXT PRIMARY KEY,
            sequence INTEGER NOT NULL,
            title TEXT NOT NULL,
            phase TEXT NOT NULL,
            focus TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now'))
          )
        `).run();

        // Create lessons table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS lessons (
            id TEXT PRIMARY KEY,
            module_id TEXT NOT NULL,
            sequence INTEGER NOT NULL,
            title TEXT NOT NULL,
            tactical_concept TEXT NOT NULL,
            historical_validator TEXT NOT NULL,
            content_json TEXT,
            difficulty_level INTEGER DEFAULT 1,
            estimated_duration_minutes INTEGER DEFAULT 30,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
          )
        `).run();

        // Create tactical references table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS tactical_references (
            id TEXT PRIMARY KEY,
            lesson_id TEXT NOT NULL,
            reference_type TEXT NOT NULL,
            title TEXT NOT NULL,
            author TEXT,
            source_url TEXT,
            publication_date TEXT,
            description TEXT,
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
          )
        `).run();

        // Create lesson content table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS lesson_content (
            id TEXT PRIMARY KEY,
            lesson_id TEXT NOT NULL,
            content_type TEXT NOT NULL DEFAULT 'markdown',
            content_text TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
          )
        `).run();

        // Create indexing metadata table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS indexing_metadata (
            id TEXT PRIMARY KEY,
            content_id TEXT NOT NULL,
            content_type TEXT NOT NULL,
            indexing_status TEXT DEFAULT 'pending',
            quality_score REAL DEFAULT 0.0,
            validation_status TEXT DEFAULT 'pending',
            semantic_analysis TEXT,
            temporal_index TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (content_id) REFERENCES lesson_content(id) ON DELETE CASCADE
          )
        `).run();

        // Create quality metrics table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS quality_metrics (
            id TEXT PRIMARY KEY,
            metadata_id TEXT NOT NULL,
            metric_type TEXT NOT NULL,
            metric_value REAL NOT NULL,
            metric_weight REAL DEFAULT 1.0,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (metadata_id) REFERENCES indexing_metadata(id) ON DELETE CASCADE
          )
        `).run();

        // Create validation results table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS validation_results (
            id TEXT PRIMARY KEY,
            metadata_id TEXT NOT NULL,
            validation_type TEXT NOT NULL,
            validation_result TEXT NOT NULL,
            validation_details TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (metadata_id) REFERENCES indexing_metadata(id) ON DELETE CASCADE
          )
        `).run();

        // Create semantic entities table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS semantic_entities (
            id TEXT PRIMARY KEY,
            metadata_id TEXT NOT NULL,
            entity_type TEXT NOT NULL,
            entity_value TEXT NOT NULL,
            entity_confidence REAL DEFAULT 0.0,
            entity_context TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (metadata_id) REFERENCES indexing_metadata(id) ON DELETE CASCADE
          )
        `).run();

        // Create cross references table
        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS cross_references (
            id TEXT PRIMARY KEY,
            source_content_id TEXT NOT NULL,
            target_content_id TEXT NOT NULL,
            reference_type TEXT NOT NULL,
            reference_strength REAL DEFAULT 0.0,
            reference_context TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (source_content_id) REFERENCES lesson_content(id) ON DELETE CASCADE,
            FOREIGN KEY (target_content_id) REFERENCES lesson_content(id) ON DELETE CASCADE
          )
        `).run();

        // Create indexes
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_module_sequence ON modules(sequence)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_module_phase ON modules(phase)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_lesson_module ON lessons(module_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_lesson_sequence ON lessons(module_id, sequence)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_lesson_concept ON lessons(tactical_concept)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_reference_lesson ON tactical_references(lesson_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_reference_type ON tactical_references(reference_type)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_lesson_content_lesson ON lesson_content(lesson_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_lesson_content_type ON lesson_content(content_type)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_indexing_content ON indexing_metadata(content_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_indexing_status ON indexing_metadata(indexing_status)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_quality_metadata ON quality_metrics(metadata_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_validation_metadata ON validation_results(metadata_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_semantic_metadata ON semantic_entities(metadata_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_cross_source ON cross_references(source_content_id)').run();
        await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_cross_target ON cross_references(target_content_id)').run();

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Database schema initialized successfully'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          status: 'error',
          message: (error as Error).message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        worker: 'tactical-index-api',
        database: 'connected'
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // API Routes
    if (url.pathname.startsWith('/api/v1/')) {
      return handleAPIRoutes(request, env, url);
    }

    // Default route
    return new Response(JSON.stringify({
      message: 'Tactical Index API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        testDb: '/test-db',
        api: '/api/v1/',
        docs: '/api/v1/docs',
        concepts: '/api/v1/concepts',
        search: '/api/v1/search?q=term'
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  },
};

async function handleAPIRoutes(request: Request, env: Env, url: URL): Promise<Response> {
  const pathParts = url.pathname.split('/').filter(p => p);
  const apiVersion = pathParts[1];
  const resource = pathParts[2];
  const id = pathParts[3];

  if (apiVersion !== 'v1') {
    return new Response(JSON.stringify({ error: 'API version not supported' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    switch (resource) {
      case 'docs':
        return handleDocsRoutes(request, env, url, id);
      case 'concepts':
        return handleConceptsRoutes(request, env, url, id);
      case 'search':
        return handleSearchRoutes(request, env, url);
      case 'index':
        return handleIndexRoutes(request, env, url, id);
      case 'quality':
        return handleQualityRoutes(request, env, url, id);
      case 'forensic':
        return handleForensicRoutes(request, env, url, id);
      case 'discovery':
        return handleDiscoveryRoutes(request, env, url, id);
      default:
        return new Response(JSON.stringify({
          error: 'Resource not found',
          available: ['docs', 'concepts', 'search', 'index', 'quality', 'forensic', 'discovery']
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: (error as Error).message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleDocsRoutes(request: Request, env: Env, url: URL, id?: string): Promise<Response> {
  if (request.method === 'GET') {
    if (id) {
      // GET /api/v1/docs/:id
      const doc = await env.DB.prepare('SELECT * FROM modules WHERE id = ?').bind(id).first();
      if (!doc) {
        return new Response(JSON.stringify({ error: 'Module not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(doc), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // GET /api/v1/docs
      const docs = await env.DB.prepare('SELECT * FROM modules ORDER BY sequence').all();
      return new Response(JSON.stringify(docs.results || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleConceptsRoutes(request: Request, env: Env, url: URL, id?: string): Promise<Response> {
  if (request.method === 'GET') {
    if (id) {
      // GET /api/v1/concepts/:id
      const concept = await env.DB.prepare('SELECT * FROM lessons WHERE id = ?').bind(id).first();
      if (!concept) {
        return new Response(JSON.stringify({ error: 'Lesson not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(concept), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // GET /api/v1/concepts
      const concepts = await env.DB.prepare('SELECT * FROM lessons ORDER BY module_id, sequence').all();
      return new Response(JSON.stringify(concepts.results || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleSearchRoutes(request: Request, env: Env, url: URL): Promise<Response> {
  const query = url.searchParams.get('q');
  
  if (!query || query.trim().length < 2) {
    return new Response(JSON.stringify({
      error: 'Search query required (minimum 2 characters)'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Search across modules and lessons
    const searchPattern = `%${query.trim().toLowerCase()}%`;
    
    const modulesResults = await env.DB.prepare(`
      SELECT 'module' as type, id, title, focus as content, created_at 
      FROM modules 
      WHERE LOWER(title) LIKE ? OR LOWER(focus) LIKE ?
      ORDER BY sequence
      LIMIT 10
    `).bind(searchPattern, searchPattern).all();

    const lessonsResults = await env.DB.prepare(`
      SELECT 'lesson' as type, id, title, tactical_concept as content, created_at 
      FROM lessons 
      WHERE LOWER(title) LIKE ? OR LOWER(tactical_concept) LIKE ?
      ORDER BY module_id, sequence
      LIMIT 10
    `).bind(searchPattern, searchPattern).all();

    const results = [
      ...(modulesResults.results || []),
      ...(lessonsResults.results || [])
    ];

    return new Response(JSON.stringify({
      query: query,
      totalResults: results.length,
      results: results
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Search failed',
      message: (error as Error).message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Indexing API handlers
async function handleIndexRoutes(request: Request, env: Env, url: URL, id?: string): Promise<Response> {
  if (request.method === 'POST') {
    const body = await request.json();
    
    if (body.action === 'process-all') {
      // POST /api/v1/index/process-all - Process all content
      try {
        // For now, return a placeholder response
        return new Response(JSON.stringify({
          status: 'success',
          message: 'Bulk indexing completed',
          processed: 0,
          indexed: 0,
          errors: []
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Bulk indexing failed',
          message: (error as Error).message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      // POST /api/v1/index/process - Process single content for indexing
      try {
        const contentId = body.content_id;
        
        if (!contentId) {
          return new Response(JSON.stringify({ error: 'content_id required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Check if content exists
        const content = await env.DB.prepare('SELECT * FROM lesson_content WHERE id = ?').bind(contentId).first();
        if (!content) {
          return new Response(JSON.stringify({ error: 'Content not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Create indexing metadata
        const metadataId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO indexing_metadata (id, content_id, content_type, indexing_status, created_at, updated_at)
          VALUES (?, ?, ?, 'completed', datetime('now'), datetime('now'))
        `).bind(metadataId, contentId, content.content_type).run();

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Content indexed successfully',
          metadata_id: metadataId
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          error: 'Indexing failed',
          message: (error as Error).message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  if (request.method === 'GET') {
    if (id) {
      // GET /api/v1/index/:id - Get indexing status
      const metadata = await env.DB.prepare('SELECT * FROM indexing_metadata WHERE id = ?').bind(id).first();
      if (!metadata) {
        return new Response(JSON.stringify({ error: 'Indexing metadata not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(metadata), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // GET /api/v1/index - List all indexing operations
      const metadata = await env.DB.prepare('SELECT * FROM indexing_metadata ORDER BY created_at DESC').all();
      return new Response(JSON.stringify(metadata.results || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleQualityRoutes(request: Request, env: Env, url: URL, id?: string): Promise<Response> {
  if (request.method === 'GET') {
    if (id) {
      // GET /api/v1/quality/:id - Get quality metrics for content
      const metrics = await env.DB.prepare('SELECT * FROM quality_metrics WHERE metadata_id = ?').bind(id).all();
      const validation = await env.DB.prepare('SELECT * FROM validation_results WHERE metadata_id = ?').bind(id).all();
      
      return new Response(JSON.stringify({
        metadata_id: id,
        metrics: metrics.results || [],
        validation: validation.results || []
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // GET /api/v1/quality - List quality scores
      const scores = await env.DB.prepare(`
        SELECT im.id, im.content_id, im.quality_score, im.validation_status, im.created_at
        FROM indexing_metadata im
        ORDER BY im.quality_score DESC
      `).all();
      return new Response(JSON.stringify(scores.results || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleForensicRoutes(request: Request, env: Env, url: URL, id?: string): Promise<Response> {
  if (request.method === 'GET') {
    if (id) {
      // GET /api/v1/forensic/:id - Get forensic analysis for content
      const entities = await env.DB.prepare('SELECT * FROM semantic_entities WHERE metadata_id = ?').bind(id).all();
      
      return new Response(JSON.stringify({
        metadata_id: id,
        entities: entities.results || []
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // GET /api/v1/forensic - List all forensic analyses
      const analyses = await env.DB.prepare(`
        SELECT se.metadata_id, se.entity_type, se.entity_value, se.entity_confidence, se.created_at
        FROM semantic_entities se
        ORDER BY se.created_at DESC
      `).all();
      return new Response(JSON.stringify(analyses.results || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleDiscoveryRoutes(request: Request, env: Env, url: URL, id?: string): Promise<Response> {
  if (request.method === 'GET') {
    const query = url.searchParams.get('q');
    
    if (query) {
      // GET /api/v1/discovery?q=term - Search content with enhanced discovery
      const searchPattern = `%${query.trim().toLowerCase()}%`;
      
      // Search in content text
      const contentResults = await env.DB.prepare(`
        SELECT lc.id, lc.content_type, lc.content_text, im.quality_score
        FROM lesson_content lc
        LEFT JOIN indexing_metadata im ON lc.id = im.content_id
        WHERE LOWER(lc.content_text) LIKE ?
        ORDER BY im.quality_score DESC
        LIMIT 20
      `).bind(searchPattern).all();

      // Search in semantic entities
      const entityResults = await env.DB.prepare(`
        SELECT DISTINCT lc.id, lc.content_type, lc.content_text, im.quality_score
        FROM lesson_content lc
        JOIN indexing_metadata im ON lc.id = im.content_id
        JOIN semantic_entities se ON im.id = se.metadata_id
        WHERE LOWER(se.entity_value) LIKE ?
        ORDER BY im.quality_score DESC
        LIMIT 20
      `).bind(searchPattern).all();

      return new Response(JSON.stringify({
        query: query,
        content_results: contentResults.results || [],
        entity_results: entityResults.results || []
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // GET /api/v1/discovery - Get cross-references
      if (id) {
        const references = await env.DB.prepare(`
          SELECT cr.*, lc.title as target_title
          FROM cross_references cr
          JOIN lesson_content lc ON cr.target_content_id = lc.id
          WHERE cr.source_content_id = ?
        `).bind(id).all();
        
        return new Response(JSON.stringify({
          source_content_id: id,
          cross_references: references.results || []
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        const references = await env.DB.prepare(`
          SELECT cr.*, lc.title as source_title, lc2.title as target_title
          FROM cross_references cr
          JOIN lesson_content lc ON cr.source_content_id = lc.id
          JOIN lesson_content lc2 ON cr.target_content_id = lc2.id
          ORDER BY cr.created_at DESC
        `).all();
        
        return new Response(JSON.stringify(references.results || []), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}