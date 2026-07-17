/**
 * Cloudinary Image Upload Script
 * 
 * Recursively scans public/ and uploads all images to Cloudinary.
 * Generates cloudinary-map.json mapping local paths → Cloudinary URLs.
 * 
 * Usage: node scripts/upload-images.mjs
 * 
 * Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * in your .env.local file.
 */

import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';

// ─── Resolve Paths ──────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const mapFile = path.join(rootDir, 'cloudinary-map.json');
const envFile = path.join(rootDir, '.env.local');

// ─── Load .env.local manually (no dotenv dependency needed) ─────────────────
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
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envFile);

// ─── Debug: Verify Credentials Are Loaded ───────────────────────────────────
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('\n─── Cloudinary Credential Check ───');
console.log(`  Cloud Name : ${cloudName || '❌ MISSING'}`);
console.log(`  API Key    : ${apiKey ? apiKey.slice(0, 4) + '****' + apiKey.slice(-4) : '❌ MISSING'}`);
console.log(`  API Secret : ${apiSecret ? 'true (loaded)' : '❌ MISSING (false)'}`);
console.log('───────────────────────────────────\n');

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ One or more Cloudinary credentials are missing from .env.local');
  console.error('   Required variables:');
  console.error('     CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('     CLOUDINARY_API_KEY=your_api_key');
  console.error('     CLOUDINARY_API_SECRET=your_api_secret');
  process.exit(1);
}

// ─── Configure Cloudinary SDK ───────────────────────────────────────────────
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

// ─── Ping Test: Verify credentials work BEFORE uploading ────────────────────
async function verifyCredentials() {
  console.log('🔍 Verifying Cloudinary credentials with ping...');
  try {
    const result = await cloudinary.api.ping();
    if (result.status === 'ok') {
      console.log('✅ Cloudinary ping successful! Credentials are valid.\n');
      return true;
    }
  } catch (error) {
    console.error('\n❌ Cloudinary ping FAILED!');
    console.error(`   HTTP Status: ${error.http_code || 'unknown'}`);
    console.error(`   Message: ${error.message}`);
    console.error('');
    
    if (error.http_code === 401 || error.http_code === 403) {
      console.error('   Diagnosis: Authentication failed. This means:');
      console.error('     • Your CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET is invalid, OR');
      console.error('     • Your CLOUDINARY_CLOUD_NAME does not match the API key/secret pair.');
      console.error('');
      console.error('   Fix: Go to https://console.cloudinary.com/settings/api-keys');
      console.error('         Copy the correct Cloud Name, API Key, and API Secret.');
      console.error('         Paste them into your .env.local file.');
    } else if (error.http_code === 404) {
      console.error('   Diagnosis: Cloud Name is likely invalid.');
      console.error('     • Double-check CLOUDINARY_CLOUD_NAME in your .env.local');
    } else {
      console.error('   Diagnosis: Unexpected error. Check your network or Cloudinary status.');
    }
    return false;
  }
}

// ─── Scan for Images ────────────────────────────────────────────────────────
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'];

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.startsWith('.')) continue; // skip .DS_Store etc.
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

// ─── Upload Logic ───────────────────────────────────────────────────────────
async function uploadImages() {
  // Step 1: Verify credentials
  const credentialsOk = await verifyCredentials();
  if (!credentialsOk) {
    console.error('\n⛔ Aborting upload. Fix your credentials first.');
    process.exit(1);
  }

  // Step 2: Find images
  const allImages = getFilesRecursively(publicDir);
  console.log(`📁 Found ${allImages.length} images in public/\n`);

  if (allImages.length === 0) {
    console.log('No images found. Nothing to upload.');
    return;
  }

  // Step 3: Load existing map (for skip logic)
  let mapData = {};
  if (fs.existsSync(mapFile)) {
    try {
      mapData = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch (e) {
      console.warn('⚠️  Could not parse existing cloudinary-map.json. Starting fresh.');
    }
  }

  let uploadedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Step 4: Upload each image
  for (let i = 0; i < allImages.length; i++) {
    const filePath = allImages[i];
    const relativePath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/'); // e.g. /projects/app.png

    // Skip if already in our map
    if (mapData[relativePath]) {
      console.log(`  [${i + 1}/${allImages.length}] SKIP (already mapped): ${relativePath}`);
      skippedCount++;
      continue;
    }

    // Build the Cloudinary folder path.
    // e.g. relativePath = "/projects/app.png"
    //   → folder = "portfolio/projects"
    //   → filename auto-detected by use_filename: true
    const relDir = path.dirname(relativePath); // "/projects" or "/"
    const folder = ('portfolio' + relDir).replace(/\/+$/, ''); // "portfolio/projects"

    try {
      console.log(`  [${i + 1}/${allImages.length}] UPLOADING: ${relativePath} → ${folder}/`);

      // FIX: Do NOT set public_id when using use_filename + folder.
      // Setting both public_id AND folder causes the SDK to create
      // a nested path like folder/public_id which can conflict.
      // Instead, let Cloudinary derive the public_id from the filename.
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        use_filename: true,
        unique_filename: false,
        overwrite: false,
        resource_type: 'auto', // handles svg, png, jpg, etc.
      });

      mapData[relativePath] = result.secure_url;
      uploadedCount++;

      // Save mapping after each successful upload (crash-safe)
      fs.writeFileSync(mapFile, JSON.stringify(mapData, null, 2));
      console.log(`           ✅ → ${result.secure_url}`);
    } catch (error) {
      errorCount++;
      console.error(`           ❌ FAILED: ${error.message || error}`);
    }
  }

  // Step 5: Final report
  console.log('\n═══════════════════════════════════');
  console.log('        Upload Summary');
  console.log('═══════════════════════════════════');
  console.log(`  Total images found : ${allImages.length}`);
  console.log(`  Uploaded           : ${uploadedCount}`);
  console.log(`  Skipped (mapped)   : ${skippedCount}`);
  console.log(`  Errors             : ${errorCount}`);
  console.log(`  Map file           : cloudinary-map.json`);
  console.log('═══════════════════════════════════\n');

  if (errorCount > 0) {
    console.log('⚠️  Some images failed. Re-run this script to retry them.');
  }
}

uploadImages().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
