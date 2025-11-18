#!/usr/bin/env node

/**
 * Environment Verification Script
 * Ensures Node.js version and dependencies are correct
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
const RESET = '\x1b[0m';

console.log(`${BLUE}═══════════════════════════════════════════════════════${RESET}`);
console.log(`${BLUE}  Environment Verification${RESET}`);
console.log(`${BLUE}═══════════════════════════════════════════════════════${RESET}\n`);

let allChecks = true;

// 1. Check Node version
console.log(`${YELLOW}▶ Node.js Version${RESET}`);
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion >= 22) {
    console.log(`${GREEN}✓${RESET} Node ${nodeVersion} (required: >=22.0.0)`);
} else {
    console.log(`${RED}✗${RESET} Node ${nodeVersion} (required: >=22.0.0)`);
    allChecks = false;
}

// 2. Check npm version
console.log(`\n${YELLOW}▶ npm Version${RESET}`);
try {
    const npmVersion = execSync('npm -v', { encoding: 'utf8' }).trim();
    const majorNpm = parseInt(npmVersion.split('.')[0]);
    if (majorNpm >= 10) {
        console.log(`${GREEN}✓${RESET} npm ${npmVersion} (required: >=10.0.0)`);
    } else {
        console.log(`${RED}✗${RESET} npm ${npmVersion} (required: >=10.0.0)`);
        allChecks = false;
    }
} catch (e) {
    console.log(`${RED}✗${RESET} npm not found`);
    allChecks = false;
}

// 3. Check folder structure
console.log(`\n${YELLOW}▶ Project Structure${RESET}`);
const requiredDirs = ['public', 'src', 'config', '.github/workflows'];
requiredDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
        console.log(`${GREEN}✓${RESET} ${dir}/`);
    } else {
        console.log(`${YELLOW}!${RESET} ${dir}/ (not found)`);
    }
});

// 4. Check public/index.html
console.log(`\n${YELLOW}▶ Public Assets${RESET}`);
const indexPath = path.join(process.cwd(), 'public', 'index.html');
if (fs.existsSync(indexPath)) {
    const stats = fs.statSync(indexPath);
    console.log(`${GREEN}✓${RESET} public/index.html (${(stats.size / 1024).toFixed(1)} KB)`);
} else {
    console.log(`${RED}✗${RESET} public/index.html (not found)`);
    allChecks = false;
}

// 5. Check environment files
console.log(`\n${YELLOW}▶ Environment Configuration${RESET}`);
const envFiles = {
    '.env.example': 'example template',
    '.env.local': 'development (ignored in git)',
    '.env.production': 'production settings',
    'wrangler.toml': 'Cloudflare Pages config'
};

Object.entries(envFiles).forEach(([file, description]) => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        console.log(`${GREEN}✓${RESET} ${file} - ${description}`);
    } else {
        console.log(`${YELLOW}!${RESET} ${file} - ${description} (not found)`);
    }
});

// 6. Check package.json
console.log(`\n${YELLOW}▶ Package Configuration${RESET}`);
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log(`${GREEN}✓${RESET} package.json - v${pkg.version}`);
    console.log(`   Project: ${pkg.name}`);
    console.log(`   Author: ${pkg.author}`);
} else {
    console.log(`${RED}✗${RESET} package.json (not found)`);
    allChecks = false;
}

// 7. Check GitHub Actions workflow
console.log(`\n${YELLOW}▶ CI/CD Configuration${RESET}`);
const workflowPath = path.join(process.cwd(), '.github', 'workflows', 'deploy.yml');
if (fs.existsSync(workflowPath)) {
    console.log(`${GREEN}✓${RESET} GitHub Actions workflow (.github/workflows/deploy.yml)`);
    console.log(`   Auto-deploys to production on push to main`);
} else {
    console.log(`${YELLOW}!${RESET} GitHub Actions workflow (not found)`);
}

// Summary
console.log(`\n${BLUE}═══════════════════════════════════════════════════════${RESET}`);
if (allChecks) {
    console.log(`${GREEN}✓ All critical checks passed!${RESET}`);
    console.log(`\n${BLUE}Next steps:${RESET}`);
    console.log(`  1. npm install          - Install dependencies`);
    console.log(`  2. npm run dev          - Start development server`);
    console.log(`  3. Set Cloudflare tokens in GitHub Secrets:`);
    console.log(`     - CLOUDFLARE_API_TOKEN`);
    console.log(`     - CLOUDFLARE_ACCOUNT_ID`);
} else {
    console.log(`${RED}✗ Some checks failed. Please fix the issues above.${RESET}`);
    process.exit(1);
}
console.log(`${BLUE}═══════════════════════════════════════════════════════${RESET}\n`);
