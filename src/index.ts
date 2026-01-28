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

    // Insert module endpoint
    if (url.pathname === '/insert-module') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const moduleData = await request.json();
        
        await env.DB.prepare(`
          INSERT INTO modules (id, sequence, title, phase, focus, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          moduleData.id,
          moduleData.sequence,
          moduleData.title,
          moduleData.phase,
          moduleData.focus,
          moduleData.created_at,
          moduleData.updated_at
        ).run();

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Module inserted successfully',
          id: moduleData.id
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

    // Insert lesson endpoint
    if (url.pathname === '/insert-lesson') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const lessonData = await request.json();
        
        await env.DB.prepare(`
          INSERT INTO lessons (id, module_id, sequence, title, tactical_concept, historical_validator, content_json, difficulty_level, estimated_duration_minutes, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          lessonData.id,
          lessonData.module_id,
          lessonData.sequence,
          lessonData.title,
          lessonData.tactical_concept,
          lessonData.historical_validator,
          lessonData.content_json,
          lessonData.difficulty_level,
          lessonData.estimated_duration_minutes,
          lessonData.created_at,
          lessonData.updated_at
        ).run();

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Lesson inserted successfully',
          id: lessonData.id
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

    // Insert reference endpoint
    if (url.pathname === '/insert-reference') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const referenceData = await request.json();
        
        await env.DB.prepare(`
          INSERT INTO tactical_references (id, lesson_id, reference_type, title, author, source_url, publication_date, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          referenceData.id,
          referenceData.lesson_id,
          referenceData.reference_type,
          referenceData.title,
          referenceData.author,
          referenceData.source_url,
          referenceData.publication_date,
          referenceData.description
        ).run();

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Reference inserted successfully',
          id: referenceData.id
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

    // Insert lesson content endpoint
    if (url.pathname === '/insert-lesson-content') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const contentData = await request.json();
        
        await env.DB.prepare(`
          INSERT INTO lesson_content (id, lesson_id, content_type, content_text, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
          contentData.id,
          contentData.lesson_id,
          contentData.content_type,
          contentData.content_text,
          contentData.created_at,
          contentData.updated_at
        ).run();

        return new Response(JSON.stringify({
          status: 'success',
          message: 'Lesson content inserted successfully',
          id: contentData.id
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
      default:
        return new Response(JSON.stringify({
          error: 'Resource not found',
          available: ['docs', 'concepts', 'search']
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