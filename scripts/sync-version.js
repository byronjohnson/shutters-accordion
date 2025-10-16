#!/usr/bin/env node

/**
 * Version Sync Script
 * Keeps version numbers consistent across all project files
 */

const fs = require('fs');
const path = require('path');

const VERSION_FILE = path.join(__dirname, 'VERSION');
const PACKAGE_JSON = path.join(__dirname, 'package.json');
const CORE_JS = path.join(__dirname, 'src/shutters-core.js');
const INDEX_JS = path.join(__dirname, 'index.js');

function readVersion() {
  return fs.readFileSync(VERSION_FILE, 'utf8').trim();
}

function updatePackageJson(version) {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  pkg.version = version;
  fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✓ Updated package.json to ${version}`);
}

function updateCoreJs(version) {
  let content = fs.readFileSync(CORE_JS, 'utf8');
  content = content.replace(
    /static VERSION = '[^']+'/,
    `static VERSION = '${version}'`
  );
  content = content.replace(
    /@version [^\n]+/,
    `@version ${version}`
  );
  fs.writeFileSync(CORE_JS, content);
  console.log(`✓ Updated shutters-core.js to ${version}`);
}

function updateIndexJs(version) {
  let content = fs.readFileSync(INDEX_JS, 'utf8');
  content = content.replace(
    /@version [^\n]+/,
    `@version ${version}`
  );
  content = content.replace(
    /export const VERSION = '[^']+'/,
    `export const VERSION = '${version}'`
  );
  fs.writeFileSync(INDEX_JS, content);
  console.log(`✓ Updated index.js to ${version}`);
}

function main() {
  try {
    const version = readVersion();
    console.log(`\nSyncing version to: ${version}\n`);
    
    updatePackageJson(version);
    updateCoreJs(version);
    updateIndexJs(version);
    
    console.log(`\n✅ All files synced to version ${version}\n`);
  } catch (error) {
    console.error('❌ Error syncing versions:', error.message);
    process.exit(1);
  }
}

main();
