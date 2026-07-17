/**
 * Cloudinary Credential Test Script
 * 
 * Calls cloudinary.api.ping() to verify your credentials are valid
 * before attempting any uploads.
 * 
 * Usage: node scripts/test-credentials.mjs
 */

import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const envFile = path.join(rootDir, '.env.local');

// ─── Load .env.local manually ──────────────────────────────────────────────
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ .env.local file not found at: ${filePath}`);
    process.exit(1);
  }
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.substring(0, eqIndex).trim();
    let value = trimmed.substring(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envFile);

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('\n═══════════════════════════════════════');
console.log('   Cloudinary Credential Test');
console.log('═══════════════════════════════════════\n');

console.log(`  Cloud Name : ${cloudName || '❌ MISSING'}`);
console.log(`  API Key    : ${apiKey ? apiKey.slice(0, 4) + '****' + apiKey.slice(-4) : '❌ MISSING'}`);
console.log(`  API Secret : ${apiSecret ? '✅ present (loaded)' : '❌ MISSING'}`);
console.log('');

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ One or more credentials are missing from .env.local.');
  console.error('');
  console.error('Add these lines to your .env.local:');
  console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('  CLOUDINARY_API_KEY=your_api_key');
  console.error('  CLOUDINARY_API_SECRET=your_api_secret');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

console.log('🔍 Calling cloudinary.api.ping()...\n');

try {
  const result = await cloudinary.api.ping();
  if (result.status === 'ok') {
    console.log('✅ SUCCESS! Your Cloudinary credentials are valid.');
    console.log('   You can now run: node scripts/upload-images.mjs');
  } else {
    console.log('⚠️  Unexpected response:', JSON.stringify(result));
  }
} catch (error) {
  console.error('❌ PING FAILED!\n');
  console.error(`   HTTP Code : ${error.http_code || 'N/A'}`);
  console.error(`   Message   : ${error.message}\n`);

  if (error.http_code === 401) {
    console.error('   🔑 Diagnosis: INVALID API KEY or API SECRET');
    console.error('      The API Key and Secret must belong to the same Cloudinary account.');
    console.error('      Go to: https://console.cloudinary.com/settings/api-keys');
  } else if (error.http_code === 403) {
    console.error('   🔑 Diagnosis: FORBIDDEN — Possible causes:');
    console.error('      1. API Key / Secret mismatch (most common)');
    console.error('      2. Cloud Name does not match the API credentials');
    console.error('      3. Your Cloudinary account has restricted API access');
    console.error('');
    console.error('   Fix: Go to https://console.cloudinary.com/settings/api-keys');
    console.error('         Ensure Cloud Name, API Key, and API Secret are all from the SAME account.');
  } else if (error.http_code === 404) {
    console.error('   🌐 Diagnosis: INVALID CLOUD NAME');
    console.error('      The cloud name "' + cloudName + '" does not exist.');
    console.error('      Check your Cloudinary dashboard for the correct name.');
  } else {
    console.error('   🌐 Diagnosis: Network error or Cloudinary service issue.');
    console.error('      Check your internet connection and try again.');
  }
}

console.log('\n═══════════════════════════════════════\n');
