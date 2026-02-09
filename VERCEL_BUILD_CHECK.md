# Vercel Build Verification Checklist

This document helps verify that the repository is correctly configured for Vercel deployment.

## ✅ Pre-Deployment Checklist

### Root Configuration Files

- [x] `vercel.json` exists and points to `packages/web-app`
- [x] `.vercelignore` excludes all non-web packages
- [x] `package.json` has NO React Native dependencies
- [x] `package.json` has NO Electron dependencies
- [x] `package.json` has NO backend dependencies in root

### Web App Configuration

- [x] `packages/web-app/package.json` has ONLY web dependencies
- [x] `packages/web-app/next.config.js` configured for Vercel (no static export)
- [x] `packages/web-app/tsconfig.json` properly configured
- [x] `packages/web-app/tailwind.config.js` properly configured
- [x] `packages/web-app/postcss.config.js` exists
- [x] `packages/web-app/.npmrc` exists

### Source Files

- [x] `packages/web-app/src/app/layout.tsx` exists
- [x] `packages/web-app/src/app/page.tsx` exists
- [x] `packages/web-app/src/app/globals.css` exists
- [x] No React Native imports in web-app
- [x] No Electron imports in web-app

### Public Assets

- [x] `packages/web-app/public/` directory exists
- [x] `packages/web-app/public/favicon.svg` exists
- [x] Favicon referenced in layout.tsx

### Documentation

- [x] `DEPLOYMENT.md` exists with comprehensive guide
- [x] `packages/web-app/README.md` exists
- [x] `packages/web-app/.env.example` exists

## 🧪 Local Build Test

Test the build locally before deploying:

```bash
# From repository root
cd packages/web-app

# Install dependencies
npm install

# Run type check
npm run type-check

# Run build
npm run build

# Test production build
npm run start
```

### Expected Output

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                Size     First Load JS
┌ ○ /                      ~5kB     ~90kB
└ ○ /_not-found           ~1kB     ~85kB
```

## 🔍 Common Issues

### Issue: Build fails with "Cannot find module"

**Cause**: Missing dependencies or incorrect paths

**Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "React is not defined"

**Cause**: Missing React import (in older versions)

**Fix**: Next.js 13+ doesn't require React imports in JSX files

### Issue: Tailwind styles not loading

**Cause**: Missing PostCSS config or Tailwind directives

**Fix**: Ensure `postcss.config.js` exists and `globals.css` has Tailwind directives

### Issue: Images not loading

**Cause**: Using `output: 'export'` in next.config.js

**Fix**: Remove static export config (already done)

## 🚀 Deployment Steps

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to vercel.com/new
   - Import your repository
   - Vercel auto-detects configuration

3. **Verify Settings**
   - Framework: Next.js ✓
   - Root Directory: packages/web-app ✓
   - Build Command: npm run build ✓
   - Output Directory: .next ✓

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Visit your URL

## ✨ Post-Deployment Verification

After deployment, verify:

- [ ] Homepage loads without errors
- [ ] No console errors in browser DevTools
- [ ] Favicon displays correctly
- [ ] Tailwind styles are applied
- [ ] All images load
- [ ] Mobile responsive design works
- [ ] Page metadata is correct

## 📊 Build Analytics

Monitor your builds:

- **Build Time**: Should be 1-3 minutes
- **Bundle Size**: Should be ~90-100kB first load
- **Build Errors**: Should be zero
- **Type Errors**: Should be zero
- **Lint Warnings**: Should be minimal

## 🔐 Environment Variables

Set these in Vercel Dashboard if needed:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_WS_URL=wss://ws.your-domain.com
```

## 📝 Notes

- Vercel automatically handles:
  - SSL certificates
  - CDN distribution
  - Automatic scaling
  - Preview deployments for PRs
  - Rollback capabilities

- The monorepo structure is fully supported
- Backend services are NOT deployed to Vercel
- Mobile and desktop apps are NOT deployed to Vercel

## ✅ Final Verification

Before marking as complete:

```bash
# Run all checks
cd packages/web-app
npm run lint
npm run type-check
npm run build

# If all pass, you're ready to deploy!
```

## 🎉 Success Criteria

Your deployment is successful if:

- [x] Build completes without errors
- [x] Application loads in browser
- [x] No console errors
- [x] All styles render correctly
- [x] Favicon appears
- [x] Page is responsive
- [x] Vercel Analytics shows traffic

---

**Last Updated**: February 2026
**Repository**: TalkON Monorepo
**Target**: Vercel Deployment
