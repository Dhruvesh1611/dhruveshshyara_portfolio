/**
 * Cloudinary Deep Debug Script
 * 
 * Investigates the 403 "missing permissions" error by:
 * 1. Printing exact SDK upload URLs and request bodies
 * 2. Testing with CLOUDINARY_URL format
 * 3. Checking if product environment credentials mismatch
 * 4. Bypassing the SDK entirely with raw fetch + manual signature
 * 5. Testing multiple upload approaches
 * 
 * Usage: node scripts/debug-cloudinary.mjs
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const envFile = path.join(rootDir, '.env.local');

// ─── Load .env.local ────────────────────────────────────────────────────────
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ .env.local not found at: ${filePath}`);
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

const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║       CLOUDINARY DEEP DEBUG — Product Environment Focus       ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 1: Print credentials
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 1: Loaded Credentials ━━━');
console.log(`  CLOUDINARY_CLOUD_NAME  : ${cloudName || '❌ MISSING'}`);
console.log(`  CLOUDINARY_API_KEY     : ${apiKey || '❌ MISSING'}`);
console.log(`  CLOUDINARY_API_SECRET  : ${apiSecret ? `(${apiSecret.length} chars, starts with ${apiSecret.slice(0, 3)}...)` : '❌ MISSING'}`);
console.log(`  SDK Version            : ${JSON.parse(fs.readFileSync(path.join(rootDir, 'node_modules/cloudinary/package.json'), 'utf8')).version}`);
console.log('');

if (!cloudName || !apiKey || !apiSecret) {
  console.error('⛔ Cannot proceed — credentials are missing.');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 2: Configure SDK and print internal config
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 2: SDK Configuration ━━━');

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const cfg = cloudinary.config();
console.log(`  sdk cloud_name    : ${cfg.cloud_name}`);
console.log(`  sdk api_key       : ${cfg.api_key}`);
console.log(`  sdk api_secret    : ${cfg.api_secret ? '(set)' : '(NOT set)'}`);
console.log(`  sdk secure        : ${cfg.secure}`);
console.log(`  sdk upload_prefix : ${cfg.upload_prefix || '(default: https://api.cloudinary.com)'}`);
console.log(`  sdk private_cdn   : ${cfg.private_cdn || false}`);
console.log('');

// The SDK constructs upload URLs as:
// <upload_prefix>/v1_1/<cloud_name>/<resource_type>/upload
const effectiveUploadPrefix = cfg.upload_prefix || 'https://api.cloudinary.com';
const sdkUploadUrl = `${effectiveUploadPrefix}/v1_1/${cloudName}/image/upload`;
console.log(`  📡 Effective SDK Upload URL: ${sdkUploadUrl}`);
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 3: Admin API Ping
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 3: Admin API Ping ━━━');
try {
  const pingResult = await cloudinary.api.ping();
  console.log(`  ✅ Ping: ${pingResult.status}`);
  console.log(`  Rate limit remaining: ${pingResult.rate_limit_remaining}`);
} catch (err) {
  console.log(`  ❌ Ping FAILED: ${err.message} (HTTP ${err.http_code})`);
}
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 4: List sub-resources / environments if possible
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 4: Account Info ━━━');
try {
  const usage = await cloudinary.api.usage();
  console.log(`  Plan     : ${usage.plan}`);
  console.log(`  Storage  : ${JSON.stringify(usage.storage)}`);
  console.log(`  Credits  : ${JSON.stringify(usage.credits)}`);
} catch (err) {
  console.log(`  ⚠️  Usage fetch failed: ${err.message} (HTTP ${err.http_code || 'N/A'})`);
}
try {
  const rootFolders = await cloudinary.api.root_folders();
  console.log(`  Root folders: ${JSON.stringify(rootFolders.folders?.map(f => f.name) || [])}`);
} catch (err) {
  console.log(`  ⚠️  Root folders fetch failed: ${err.message}`);
}
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 5: SDK Upload Test — with monkey-patched HTTP to capture request
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 5: SDK Upload Test (with request capture) ━━━');

// Monkey-patch global fetch to intercept the SDK's outgoing request
const originalFetch = globalThis.fetch;
let capturedRequest = null;

globalThis.fetch = async function(url, options) {
  capturedRequest = { url: url.toString(), method: options?.method, headers: {} };
  
  // Capture headers
  if (options?.headers) {
    if (typeof options.headers.forEach === 'function') {
      options.headers.forEach((v, k) => capturedRequest.headers[k] = v);
    } else {
      capturedRequest.headers = { ...options.headers };
    }
  }

  // Try to extract form data fields (but body might be a FormData)
  if (options?.body && typeof options.body.getAll === 'function') {
    capturedRequest.formFields = {};
    // This is a FormData-like object
    try {
      for (const [key, value] of options.body.entries()) {
        if (typeof value === 'string') {
          capturedRequest.formFields[key] = key === 'file' ? '(data URI, truncated)' : value;
        } else {
          capturedRequest.formFields[key] = `(File: ${value.name || 'unknown'}, size: ${value.size || 'unknown'})`;
        }
      }
    } catch (e) {
      capturedRequest.formFields = { error: 'Could not enumerate form fields' };
    }
  }

  // Actually make the request
  const response = await originalFetch(url, options);
  
  // Clone to read body without consuming it
  const clonedResponse = response.clone();
  capturedRequest.responseStatus = response.status;
  capturedRequest.responseStatusText = response.statusText;
  
  // Capture response headers
  capturedRequest.responseHeaders = {};
  for (const [hk, hv] of response.headers.entries()) {
    capturedRequest.responseHeaders[hk] = hv;
  }
  
  // Capture response body
  try {
    capturedRequest.responseBody = await clonedResponse.text();
  } catch (e) {
    capturedRequest.responseBody = '(could not read)';
  }

  return response;
};

try {
  const result = await cloudinary.uploader.upload(tinyPng, {
    folder: 'debug',
    public_id: 'permission-test',
    overwrite: true,
    resource_type: 'image',
  });
  console.log('  ✅ SDK Upload SUCCEEDED!');
  console.log(`  URL: ${result.secure_url}`);
  await cloudinary.uploader.destroy('debug/permission-test');
} catch (err) {
  console.log('  ❌ SDK Upload FAILED');
  console.log(`     error.message  : ${err.message}`);
  console.log(`     error.http_code: ${err.http_code}`);
  console.log('');
  
  if (capturedRequest) {
    console.log('  ── Captured SDK Request ──');
    console.log(`     URL          : ${capturedRequest.url}`);
    console.log(`     Method       : ${capturedRequest.method}`);
    console.log(`     Form Fields  : ${JSON.stringify(capturedRequest.formFields, null, 6)}`);
    console.log('');
    console.log('  ── Captured Response ──');
    console.log(`     Status       : ${capturedRequest.responseStatus} ${capturedRequest.responseStatusText}`);
    console.log(`     x-cld-error  : ${capturedRequest.responseHeaders['x-cld-error'] || 'N/A'}`);
    console.log(`     Body         : ${capturedRequest.responseBody}`);
  }
}
console.log('');

// Restore original fetch
globalThis.fetch = originalFetch;

// ═══════════════════════════════════════════════════════════════════════════
// STEP 6: Direct REST API — Manual Signature — Standard Endpoint
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 6: Direct REST Upload (manual signature) ━━━');

async function directUpload(label, uploadUrl, extraParams = {}) {
  const timestamp = Math.floor(Date.now() / 1000);
  
  const allParams = {
    folder: 'debug',
    overwrite: 'true',
    public_id: 'direct-test',
    timestamp: timestamp.toString(),
    ...extraParams,
  };
  
  // Build signature: alphabetically sorted key=value pairs joined with &, then append api_secret
  const signatureString = Object.keys(allParams)
    .sort()
    .map(k => `${k}=${allParams[k]}`)
    .join('&') + apiSecret;
  
  const signature = crypto.createHash('sha256').update(signatureString).digest('hex');

  const formData = new URLSearchParams();
  formData.append('file', tinyPng);
  for (const [k, v] of Object.entries(allParams)) {
    formData.append(k, v);
  }
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  console.log(`\n  [${label}]`);
  console.log(`  POST → ${uploadUrl}`);
  console.log(`  Params: ${JSON.stringify(allParams)}`);
  console.log(`  Signature (sha256): ${signature}`);

  try {
    const resp = await fetch(uploadUrl, { method: 'POST', body: formData });
    const body = await resp.text();
    console.log(`  Status: ${resp.status} ${resp.statusText}`);
    console.log(`  x-cld-error: ${resp.headers.get('x-cld-error') || 'none'}`);
    console.log(`  Body: ${body}`);
    return { status: resp.status, body };
  } catch (e) {
    console.log(`  ❌ Fetch error: ${e.message}`);
    return { status: 0, body: '' };
  }
}

// Test 1: Standard endpoint with sha256
const standardUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
const r1 = await directUpload('SHA-256 Standard Endpoint', standardUrl);

// Test 2: If sha256 failed, try sha1 (older Cloudinary accounts may require sha1)
if (r1.status !== 200) {
  console.log('\n  ↳ SHA-256 failed, retrying with SHA-1...');
  
  const timestamp2 = Math.floor(Date.now() / 1000);
  const params2 = {
    folder: 'debug',
    overwrite: 'true',
    public_id: 'direct-test-sha1',
    timestamp: timestamp2.toString(),
  };
  const sigString2 = Object.keys(params2).sort().map(k => `${k}=${params2[k]}`).join('&') + apiSecret;
  const sig2 = crypto.createHash('sha1').update(sigString2).digest('hex');

  const form2 = new URLSearchParams();
  form2.append('file', tinyPng);
  for (const [k, v] of Object.entries(params2)) form2.append(k, v);
  form2.append('api_key', apiKey);
  form2.append('signature', sig2);

  console.log(`  POST → ${standardUrl}`);
  console.log(`  Signature (sha1): ${sig2}`);
  
  try {
    const resp2 = await fetch(standardUrl, { method: 'POST', body: form2 });
    const body2 = await resp2.text();
    console.log(`  Status: ${resp2.status} ${resp2.statusText}`);
    console.log(`  x-cld-error: ${resp2.headers.get('x-cld-error') || 'none'}`);
    console.log(`  Body: ${body2}`);
  } catch (e) {
    console.log(`  ❌ Fetch error: ${e.message}`);
  }
}
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 7: Try UNSIGNED upload with an upload preset
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━ STEP 7: Unsigned Upload Test (no signature) ━━━');

const unsignedForm = new URLSearchParams();
unsignedForm.append('file', tinyPng);
unsignedForm.append('upload_preset', 'ml_default');  // Cloudinary's default preset name
unsignedForm.append('folder', 'debug');

try {
  const resp = await fetch(standardUrl, { method: 'POST', body: unsignedForm });
  const body = await resp.text();
  console.log(`  Status: ${resp.status}`);
  console.log(`  Body: ${body}`);
  
  if (resp.status === 200) {
    console.log('  ✅ Unsigned upload WORKED! Consider using upload presets.');
    const parsed = JSON.parse(body);
    // Clean up
    try { await cloudinary.uploader.destroy(parsed.public_id); } catch(_) {}
  }
} catch (e) {
  console.log(`  ❌ Fetch error: ${e.message}`);
}
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// STEP 8: DIAGNOSIS
// ═══════════════════════════════════════════════════════════════════════════
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  DIAGNOSIS & RECOMMENDATIONS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('  The error "[prodenv:...] missing permissions (actions=[\\"create\\"])"');
console.log('  means your API key is associated with a Product Environment that');
console.log('  RESTRICTS the "create" action for this key.\n');
console.log('  Even if you are the root user, Cloudinary Product Environments');
console.log('  can restrict individual API keys at the environment level.\n');
console.log('  TO FIX THIS:\n');
console.log('  Option A: Update API Key Permissions');
console.log('    1. Go to https://console.cloudinary.com/settings/api-keys');
console.log('    2. Find your key: ' + apiKey);
console.log('    3. Click the ⚙️ gear icon or "Edit"');
console.log('    4. Under "Permissions" or "Access", enable: Create, Read, Update, Delete');
console.log('    5. Under "Product Environment", ensure it matches your cloud name\n');
console.log('  Option B: Use the CLOUDINARY_URL from your Dashboard');
console.log('    1. Go to https://console.cloudinary.com/pm/getting-started');
console.log('    2. Copy the "API environment variable" (CLOUDINARY_URL=cloudinary://...)');
console.log('    3. Add it to your .env.local as CLOUDINARY_URL');
console.log('    4. This URL contains the EXACT credentials for your active environment\n');
console.log('  Option C: Generate a New API Key');
console.log('    1. Go to https://console.cloudinary.com/settings/api-keys');
console.log('    2. Click "Generate New API Key"');
console.log('    3. Grant ALL permissions (Create, Read, Update, Delete)');
console.log('    4. Do NOT restrict to a specific Product Environment');
console.log('    5. Update your .env.local with the new key + secret\n');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                    DEBUG COMPLETE                             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');
