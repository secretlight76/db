# Project Structure

## Protected Architecture

This project uses a **three-tier structure** to separate concerns and protect sensitive code:

```
┌─────────────────────────────────────────────────┐
│  public/                                        │  ← 🌐 PUBLIC (served to clients)
│  ├── index.html                                 │  Static assets, visible
│  └── ...                                        │  No secrets here
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│  src/                                           │  ← 🔒 PROTECTED (build-time only)
│  ├── config.js                                  │  Source code, environment config
│  └── ...                                        │  Not directly exposed
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│  config/                                        │  ← ⚙️ CONFIGURATION
│  ├── environments.js                            │  Environment-specific settings
│  └── ...                                        │  Git-tracked but non-sensitive
└─────────────────────────────────────────────────┘
```

## Detailed Structure

### 📁 `/public` - Public Assets
**These files are served directly to users.**

```
public/
├── index.html          # Main HTML application
├── assets/             # CSS, JS, images (bundled with index.html)
└── favicon.ico         # Browser icon
```

**Protection level:** ❌ No protection (served to everyone)
**Content:** Static HTML, CSS, JavaScript bundled in `<script>` tags
**Access:** Anyone with the URL can access

### 📁 `/src` - Protected Source Code
**Source code that gets processed/bundled before deployment.**

```
src/
├── config.js           # Configuration management module
├── utils/              # Utility functions
│   ├── audio.js       # Audio processing helpers
│   └── validation.js   # Input validation
├── constants.js        # Application constants
└── ...
```

**Protection level:** ✓ Protected (not directly served)
**Content:** ES6+ modules, raw source code
**Access:** Only during build process
**Purpose:** Source code is built/bundled before serving

### 📁 `/config` - Configuration Files
**Non-sensitive configuration that can be version-controlled.**

```
config/
├── environments.js     # Environment definitions
├── defaults.js         # Default settings
└── calibration.json    # Audio calibration presets
```

**Protection level:** ✓ Tracked in git but non-sensitive
**Content:** Configurations, presets, defaults
**Access:** Source code at build-time

### 📁 `/.github/workflows` - CI/CD Automation
**GitHub Actions workflows for automated deployment.**

```
.github/workflows/
└── deploy.yml         # Cloudflare Pages deployment
```

**Protection level:** ✓ Public but safe (no secrets in file)
**Content:** Workflow definitions
**Access:** GitHub Actions runner

### 📁 `/scripts` - Build & Verification Scripts
**Automation scripts for development and CI/CD.**

```
scripts/
├── verify-env.js      # Environment verification
├── build.js           # Custom build process
└── deploy.js          # Deployment helpers
```

**Protection level:** ⚠️ Build-time only
**Content:** Node.js scripts
**Access:** Local development and CI/CD

## File Classification

### 🟢 Public Files (Safe to commit)
```
public/index.html         ✓ Tracked in git ✓ Served to everyone
config/defaults.js        ✓ Tracked in git ✓ Non-sensitive
.github/workflows/        ✓ Tracked in git ✓ Public workflows
scripts/                  ✓ Tracked in git ✓ Build scripts
```

### 🟡 Development Files (Git-ignored but documented)
```
.env.local               ✗ NOT in git  (see .env.example)
node_modules/            ✗ NOT in git
.wrangler/               ✗ NOT in git  (Cloudflare cache)
```

### 🔴 Secret Files (Never commit)
```
.env                     ✗ NEVER in git  (production secrets)
secrets/                 ✗ NEVER in git  (API keys)
*.key, *.pem             ✗ NEVER in git  (private keys)
```

## Protection Mechanisms

### 1. Build-Time Compilation
```
src/config.js          → [Build Process] → public/index.html
                          (Webpack/Rollup)
```
Source files in `src/` are compiled and bundled, not directly served.

### 2. Environment Variable Isolation
```
.env.local    (development, git-ignored)
.env.production (production, tracked, non-sensitive)
Secrets      (CLOUDFLARE_API_TOKEN via GitHub Actions)
```

### 3. Git Ignore Rules
```gitignore
# Sensitive
.env
.env.local
secrets/

# Generated
node_modules/
dist/
.wrangler/
```

### 4. GitHub Secrets Management
```
GitHub Secrets (encrypted, never visible in logs):
├── CLOUDFLARE_API_TOKEN
├── CLOUDFLARE_ACCOUNT_ID
└── SLACK_WEBHOOK
```

## Access Control

| Location | Dev Access | Build Access | Runtime Access | Git Tracked |
|----------|-----------|--------------|----------------|------------|
| `/public` | ✓ Read | ✓ Read | ✓ Serve | ✓ Yes |
| `/src` | ✓ Edit | ✓ Process | ✗ No | ✓ Yes |
| `/config` | ✓ Read | ✓ Read | ✗ Build-time | ✓ Yes |
| `.env.local` | ✓ Edit | ✓ Read | ✓ Local | ✗ No |
| `.env.production` | ✗ Secrets | ✓ In CI/CD | ✓ Prod | ✗ No* |
| `secrets/` | ✓ Edit | ✗ No | ✗ No | ✗ No |

*Production secrets set in Cloudflare dashboard, not in repository

## Environment Progression

```
Local Development
    ↓
.env.local
    ↓
npm run dev
    ↓
http://localhost:8080
═════════════════════════════════════
    ↓
Git Push to main
    ↓
GitHub Actions
    ↓
wrangler.toml + .env.production
    ↓
Cloudflare Pages Production
    ↓
https://audio-level-converter.pages.dev
```

## Configuration Loading Hierarchy

1. **Local Development** (highest priority)
   ```
   .env.local
   ↓ (overrides)
   .env.example
   ```

2. **GitHub Actions / CI**
   ```
   GitHub Secrets (CLOUDFLARE_API_TOKEN)
   ↓ (overrides)
   wrangler.toml
   ```

3. **Production (Cloudflare Pages)**
   ```
   Cloudflare Dashboard Environment Variables
   ↓ (overrides)
   .env.production
   ```

## Adding New Files

### Adding Public Assets
```
public/images/diagram.png  → Tracked in git → Served directly
```

### Adding Source Code
```
src/utils/newModule.js     → Tracked in git → Built into bundle
```

### Adding Configuration
```
config/newSettings.json    → Tracked in git → Non-sensitive
```

### Adding Secrets (Local Only)
```
.env.local                 → NOT in git → Loaded locally only
```

## Security Checklist

- [ ] `.env.local` exists but not in git (check `.gitignore`)
- [ ] `secrets/` folder not in git
- [ ] GitHub Secrets set (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
- [ ] Production environment set in Cloudflare Dashboard
- [ ] API keys only in GitHub Secrets (not in code)
- [ ] Node version ≥22 required in `package.json` engines
- [ ] Deployment workflow auto-triggers on `main` push
- [ ] `/public` folder is final build output
- [ ] `/src` code is never directly exposed

## Troubleshooting

**Q: Why is my code not updating?**
A: Check if it's in `/src`. Changes to `/src` files need a rebuild to appear in `/public`.

**Q: Where do I put environment variables?**
A: Local dev → `.env.local` | Production → Cloudflare dashboard

**Q: Can I commit my API keys?**
A: No! Use GitHub Secrets instead (encrypted, never visible).

**Q: How do I test production settings locally?**
A: Copy values from Cloudflare dashboard into `.env.local` to simulate.

## References

- [Cloudflare Pages Guide](./DEPLOYMENT.md)
- [wrangler.toml Configuration](./wrangler.toml)
- [Environment Variables Template](./.env.example)
- [GitHub Actions Workflow](./.github/workflows/deploy.yml)
