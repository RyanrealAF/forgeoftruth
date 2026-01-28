const fetch = require('node-fetch').default;

async function initSchema() {
  console.log('🔧 Initializing database schema...');
  
  try {
    const response = await fetch('http://127.0.0.1:8787/init-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    
    const result = await response.json();
    console.log('✅ Schema initialization result:', result);
    
    // Test the lesson_content table
    console.log('🧪 Testing lesson_content table...');
    const testResponse = await fetch('http://127.0.0.1:8787/insert-lesson-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'test-content',
        lesson_id: 'test-lesson',
        content_type: 'markdown',
        content_text: 'Test content',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    });
    
    const testResult = await testResponse.json();
    console.log('✅ Test result:', testResult);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

initSchema();