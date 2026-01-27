# Tactical Index API Documentation

## Overview

The Tactical Index API is a Cloudflare Worker-based REST API that provides access to a tactical curriculum database. The API is connected to a D1 database containing modules, lessons, and tactical references for a 120-lesson curriculum.

## Base URL

```
http://127.0.0.1:8787
```

## Endpoints

### Health Check

#### GET /health

Returns the health status of the API and database connection.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-27T14:34:10.380Z",
  "worker": "tactical-index-api",
  "database": "connected"
}
```

### Database Test

#### GET /test-db

Tests the database connection and returns information about available tables.

**Response:**
```json
{
  "status": "connected",
  "tables": {
    "modules": 0,
    "lessons": 0,
    "tactical_references": 0
  },
  "message": "Database connection successful"
}
```

### Database Initialization

#### GET /init-db

Initializes the database schema with the required tables and indexes.

**Response:**
```json
{
  "status": "success",
  "message": "Database schema initialized successfully"
}
```

### Modules (Docs)

#### GET /api/v1/docs

Returns all modules ordered by sequence.

**Response:**
```json
[
  {
    "id": "module-1",
    "sequence": 1,
    "title": "Module Title",
    "phase": "DOCTRINE",
    "focus": "Module Focus",
    "created_at": "2026-01-27T14:34:10.380Z",
    "updated_at": "2026-01-27T14:34:10.380Z"
  }
]
```

#### GET /api/v1/docs/:id

Returns a specific module by ID.

**Response:**
```json
{
  "id": "module-1",
  "sequence": 1,
  "title": "Module Title",
  "phase": "DOCTRINE",
  "focus": "Module Focus",
  "created_at": "2026-01-27T14:34:10.380Z",
  "updated_at": "2026-01-27T14:34:10.380Z"
}
```

### Lessons (Concepts)

#### GET /api/v1/concepts

Returns all lessons ordered by module and sequence.

**Response:**
```json
[
  {
    "id": "lesson-1",
    "module_id": "module-1",
    "sequence": 1,
    "title": "Lesson Title",
    "tactical_concept": "Tactical Concept",
    "historical_validator": "Historical Validator",
    "content_json": "{}",
    "difficulty_level": 1,
    "estimated_duration_minutes": 30,
    "created_at": "2026-01-27T14:34:10.380Z",
    "updated_at": "2026-01-27T14:34:10.380Z"
  }
]
```

#### GET /api/v1/concepts/:id

Returns a specific lesson by ID.

**Response:**
```json
{
  "id": "lesson-1",
  "module_id": "module-1",
  "sequence": 1,
  "title": "Lesson Title",
  "tactical_concept": "Tactical Concept",
  "historical_validator": "Historical Validator",
  "content_json": "{}",
  "difficulty_level": 1,
  "estimated_duration_minutes": 30,
  "created_at": "2026-01-27T14:34:10.380Z",
  "updated_at": "2026-01-27T14:34:10.380Z"
}
```

### Search

#### GET /api/v1/search?q=term

Searches across modules and lessons for the specified query term.

**Parameters:**
- `q` (required): Search query (minimum 2 characters)

**Response:**
```json
{
  "query": "doctrine",
  "totalResults": 2,
  "results": [
    {
      "type": "module",
      "id": "module-1",
      "title": "Doctrine Module",
      "content": "Module Focus",
      "created_at": "2026-01-27T14:34:10.380Z"
    },
    {
      "type": "lesson",
      "id": "lesson-1",
      "title": "Doctrine Lesson",
      "content": "Tactical Concept",
      "created_at": "2026-01-27T14:34:10.380Z"
    }
  ]
}
```

## Database Schema

### Modules Table

Stores curriculum modules/phases.

```sql
CREATE TABLE modules (
  id TEXT PRIMARY KEY,
  sequence INTEGER NOT NULL,
  title TEXT NOT NULL,
  phase TEXT NOT NULL,
  focus TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### Lessons Table

Stores individual tactical lessons.

```sql
CREATE TABLE lessons (
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
);
```

### Tactical References Table

Stores references and sources for lessons.

```sql
CREATE TABLE tactical_references (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  reference_type TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  source_url TEXT,
  publication_date TEXT,
  description TEXT,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);
```

## Error Responses

All endpoints return appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `405 Method Not Allowed`: Unsupported HTTP method
- `500 Internal Server Error`: Server error

**Error Response Format:**
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Usage Examples

### Testing the API

```bash
# Health check
curl http://127.0.0.1:8787/health

# Initialize database
curl http://127.0.0.1:8787/init-db

# Get all modules
curl http://127.0.0.1:8787/api/v1/docs

# Get all lessons
curl http://127.0.0.1:8787/api/v1/concepts

# Search for content
curl "http://127.0.0.1:8787/api/v1/search?q=doctrine"
```

## Development

The API is built using Cloudflare Workers with D1 database integration. The worker runs locally on port 8787 and automatically reloads when changes are made to the source code.

To start the development server:
```bash
npm run dev
```

The API supports hot reloading, so changes to `src/index.ts` will automatically update the running worker.