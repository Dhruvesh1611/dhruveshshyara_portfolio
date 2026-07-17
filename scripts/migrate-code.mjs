/**
 * Code Migration Script
 * 
 * Reads cloudinary-map.json and replaces all local image path references
 * in src/ files with their Cloudinary URLs.
 * 
 * Usage: node scripts/migrate-code.mjs
 * 
 * Run this AFTER upload-images.mjs has generated cloudinary-map.json.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const mapFile = path.join(rootDir, 'cloudinary-map.json');

if (!fs.existsSync(mapFile)) {
  console.error('❌ cloudinary-map.json not found. Please run upload-images.mjs first.');
  process.exit(1);
}

const mapData = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
const entries = Object.entries(mapData);

if (entries.length === 0) {
  console.error('❌ cloudinary-map.json is empty. No mappings to apply.');
  process.exit(1);
}

console.log(`\n📄 Loaded ${entries.length} mappings from cloudinary-map.json`);

const TARGET_EXTENSIONS = ['.jsx', '.js', '.json', '.ts', '.tsx', '.md', '.mdx'];

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.startsWith('.')) continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (TARGET_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allFiles = getFilesRecursively(srcDir);
console.log(`🔍 Found ${allFiles.length} source files to scan in src/\n`);

let modifiedFilesCount = 0;
const modifiedFilesList = [];

// Sort entries by path length descending so longer paths are replaced first
// This prevents partial replacements (e.g., "/png/c" matching before "/png/clogo.png")
entries.sort((a, b) => b[0].length - a[0].length);

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const [localPath, cloudinaryUrl] of entries) {
    // Escape special regex characters in the local path
    const escapedLocalPath = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Replace occurrences in double quotes: "/path/to/image.png"
    content = content.replace(new RegExp(`"${escapedLocalPath}"`, 'g'), `"${cloudinaryUrl}"`);

    // Replace occurrences in single quotes: '/path/to/image.png'
    content = content.replace(new RegExp(`'${escapedLocalPath}'`, 'g'), `'${cloudinaryUrl}'`);

    // Replace occurrences in backticks: `/path/to/image.png`
    content = content.replace(new RegExp(`\`${escapedLocalPath}\``, 'g'), `\`${cloudinaryUrl}\``);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relPath = path.relative(rootDir, filePath);
    console.log(`  ✅ UPDATED: ${relPath}`);
    modifiedFilesCount++;
    modifiedFilesList.push(relPath);
  }
}

console.log('\n═══════════════════════════════════');
console.log('     Code Migration Summary');
console.log('═══════════════════════════════════');
console.log(`  Files scanned  : ${allFiles.length}`);
console.log(`  Files modified : ${modifiedFilesCount}`);
if (modifiedFilesList.length > 0) {
  console.log('\n  Modified files:');
  for (const f of modifiedFilesList) {
    console.log(`    • ${f}`);
  }
}
console.log('═══════════════════════════════════\n');
