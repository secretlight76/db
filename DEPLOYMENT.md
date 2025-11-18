# Deployment Guide

## Overview

This project uses **Cloudflare Pages** for hosting with a consistent production environment. All deployments to the `main` branch automatically deploy to the same production environment.

## Project Structure

```
audio-level-converter/
├── public/                    # 🌐 Static assets served to users
│   └── index.html            # Main application
├── src/                       # 🔒 Protected source code
│   └── config.js             # Configuration management
├── config/                    # ⚙️ Configuration files
├── scripts/                   # 🛠️ Build and verification scripts
│   └── verify-env.js         # Environment checker
├── .github/workflows/         # 🚀 CI/CD automation
│   └── deploy.yml            # GitHub Actions workflow
├── wrangler.toml             # Cloudflare Pages config
├── .env.example              # Environment template
├── .env.local                # Development env (git ignored)
├── .env.production           # Production settings
└── package.json              # Dependencies and scripts
```

## Environment Configuration

### Three Environments

1. **Development** (`.env.local`)
   - Runs locally: `npm run dev`
   - Debug mode enabled
   - Analytics disabled

2. **Staging** (pull requests)
   - Deployed to staging.pages.dev
   - Can be tested before production
   - Limited resources

3. **Production** (main branch)
   - Deployed to audio-level-converter.pages.dev
   - **Always the same environment** (consistent across deployments)
   - Full analytics enabled
   - Protected by GitHub environment secrets

## Setup Instructions

### 1. Verify Environment

```bash
# Check Node version (must be 22+) and npm version
npm run env:check

# Comprehensive environment verification
npm run verify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development

```bash
# Start development server on http://localhost:8080
npm run dev

# Or use npm start
npm start
```

### 4. Configuration

#### Local Development
Copy `.env.example` to `.env.local` and customize:
```bash
cp .env.example .env.local
```

**Note:** `.env.local` is **never** committed to git (see `.gitignore`)

#### Production
Set these secrets in GitHub > Settings > Secrets and Variables > Actions:
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

Production environment variables are set in Cloudflare Pages dashboard:
- `ENVIRONMENT=production`
- `ENABLE_ANALYTICS=true`
- `APP_VERSION=1.0.0`

## Deployment

### Automatic Deployment (Recommended)

**Pushes to `main` automatically deploy to production:**

```bash
git push origin main
```

This triggers `.github/workflows/deploy.yml` which:
1. ✓ Verifies Node 22+ is installed
2. ✓ Installs dependencies
3. ✓ Builds the project
4. ✓ Deploys `public/` folder to Cloudflare Pages production
5. ✓ Sends Slack notification (if configured)

**Deployment URL:** https://audio-level-converter.pages.dev

### Manual Deployment (Advanced)

**Deploy to staging:**
```bash
npm run deploy:staging
```

**Deploy to production:**
```bash
npm run deploy:production
```

(Requires `wrangler` CLI installed and authenticated)

## Ensuring Consistent Production Environment

### Key Features

1. **Same Deployment URL Always**
   - Production URL: `https://audio-level-converter.pages.dev`
   - Never changes, always points to latest production deployment

2. **Protected Environment**
   - GitHub secret-based authentication
   - Only `main` branch pushes trigger production deployment
   - Pull requests deploy to ephemeral preview URLs

3. **Consistent Node/npm Versions**
   - Enforced in `package.json` (`engines: { node: ">=22.0.0" }`)
   - Verified in GitHub Actions workflow
   - CI/CD fails if versions don't match

4. **Environment Variable Management**
   - Production variables set in Cloudflare dashboard
   - Never leaked in commits (`.env.local` is ignored)
   - Easy to update without redeploying

### Preventing Multiple Environments

❌ **Don't do this:**
- Don't deploy manually to different projects
- Don't push to multiple branches expecting production
- Don't create new Cloudflare Pages projects per deployment

✅ **Do this:**
- Push to `main` for production deployment
- Use pull requests for staging preview URLs
- Update Cloudflare environment variables in dashboard
- All deployments use the same `audio-level-converter` project

## Troubleshooting

### Issue: Different environment each deployment

**Solution:**
1. Verify you're pushing to `main`: `git branch -v`
2. Check GitHub Actions: Settings > Actions > All workflows > Deploy to Cloudflare Pages
3. Confirm Cloudflare project: Settings > Cloudflare Pages > Production branch = `main`

### Issue: Node version mismatch

```bash
# Verify your local Node matches requirement
node --version  # Should be v22.x.x

# Install correct version with nvm
nvm install 22
nvm use 22
```

### Issue: Environment variables not loading

1. Check `.env.local` exists (development)
2. Check Cloudflare dashboard for production variables
3. Run `npm run env:check` to verify configuration

### Issue: Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run verification
npm run verify

# Build again
npm run build
```

## Security Best Practices

1. **Never commit `.env.local`** - Contains development secrets
2. **Use GitHub Secrets** for production credentials
3. **Keep `public/` immutable** - Only production builds here
4. **Protect main branch** - Require reviews before merging
5. **Use strong Cloudflare API token** - Rotate periodically

## Monitoring Deployments

### GitHub Actions

View deployment status:
```
GitHub > Actions > Deploy to Cloudflare Pages
```

Each push to `main` creates a new workflow run. Green checkmark = successful deployment.

### Cloudflare Dashboard

Monitor deployments:
```
Cloudflare > Pages > audio-level-converter > Deployments
```

### Health Check

Test production deployment:
```bash
curl https://audio-level-converter.pages.dev
```

Should return HTML with "Le Convertisseur de Niveaux Audio"

## FAQ

**Q: How do I know my code is in production?**
A: Check the deployment timestamp at https://audio-level-converter.pages.dev and compare with GitHub's last successful workflow run.

**Q: Can I deploy without pushing to main?**
A: Not recommended (breaks consistency), but you can use `npm run deploy:production` if authenticated locally.

**Q: What if I need to rollback?**
A: Use Cloudflare dashboard > Pages > Deployments > Click previous deployment > Rollback. Or push fix to `main`.

**Q: How do I update production variables?**
A: Cloudflare dashboard > Pages > audio-level-converter > Settings > Environment Variables (production)

**Q: Why does my feature work locally but not in production?**
A: Check environment variables in Cloudflare dashboard match `.env.production`.

## Support

For issues or questions:
- Check `.github/workflows/deploy.yml` for CI/CD config
- Review `wrangler.toml` for Cloudflare settings
- Run `npm run verify` to diagnose issues
- Check GitHub Actions logs for deployment errors
