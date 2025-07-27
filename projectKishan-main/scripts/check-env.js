// Environment check script for projectKishan
// Load environment variables from .env file
require('dotenv').config();

console.log('🔍 Checking Environment Variables...\n');

// Check Google Speech API Key
const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_SPEECH_API_KEY;
if (googleApiKey) {
  console.log('✅ Google Speech API Key: Found');
  console.log(`   Key starts with: ${googleApiKey.substring(0, 8)}...`);
  console.log(`   Key length: ${googleApiKey.length} characters`);
} else {
  console.log('❌ Google Speech API Key: Not found');
  console.log('   Make sure NEXT_PUBLIC_GOOGLE_SPEECH_API_KEY is set in .env file');
}

// Check other environment variables
const openaiKey = process.env.OPENAI_API_KEY;
console.log(openaiKey ? '✅ OpenAI API Key: Found' : '⚠️  OpenAI API Key: Not set (optional)');

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
console.log(nextAuthSecret ? '✅ NextAuth Secret: Found' : '⚠️  NextAuth Secret: Not set (optional)');

console.log('\n🚀 Environment configuration complete!');
console.log('💡 Restart your Next.js development server to load new environment variables.');

// Instructions
console.log('\n📋 Next Steps:');
console.log('1. Stop your development server (Ctrl+C)');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000/farmer-gpt');
console.log('4. Look for blue microphone (Google API active)');
