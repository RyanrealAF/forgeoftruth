// Cloudflare Worker for Tactical Index API
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        worker: 'tactical-index-api'
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Main API endpoint
    if (url.pathname === '/api/v1/tactical') {
      return new Response(JSON.stringify({
        message: 'Tactical Index API - Ready for action',
        version: '0.1.0',
        endpoints: [
          '/health - Health check',
          '/api/v1/tactical - Main API endpoint'
        ]
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 404 for unknown routes
    return new Response(JSON.stringify({
      error: 'Not Found',
      path: url.pathname,
      available_endpoints: [
        '/health',
        '/api/v1/tactical'
      ]
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
