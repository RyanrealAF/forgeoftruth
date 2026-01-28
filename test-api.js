const fetch = require('node-fetch').default;

async function testAPI() {
  console.log('🧪 Testing API endpoints...');
  
  try {
    // Test 1: Insert lesson content with proper JSON
    console.log('1. Testing lesson content insertion...');
    const contentData = {
      id: 'test-content-001',
      lesson_id: 'lesson-001',
      content_type: 'markdown',
      content_text: '# OPSEC Fundamentals\n\nThis is the content for the OPSEC Fundamentals lesson.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const response = await fetch('http://127.0.0.1:8787/insert-lesson-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentData)
    });
    
    const result = await response.json();
    console.log('✅ Result:', result);
    
    // Test 2: Check if content was inserted
    console.log('2. Checking lesson content table...');
    const checkResponse = await fetch('http://127.0.0.1:8787/test-db');
    const checkResult = await checkResponse.json();
    console.log('✅ Table counts:', checkResult.tables);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAPI();