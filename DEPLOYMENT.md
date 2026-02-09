# TalkON Web App - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

This guide covers deploying the TalkON web application to Vercel.

---

## Prerequisites

Before deploying, ensure you have:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code pushed to GitHub, GitLab, or Bitbucket
3. **Node.js**: Version 18.x or higher (managed by Vercel automatically)

---

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Your Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git provider and repository

2. **Configure Project**
   - Vercel will auto-detect Next.js
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `packages/web-app` (auto-configured via vercel.json)
   - **Build Command**: `npm run build` (auto-configured)
   - **Install Command**: Auto-configured for monorepo

3. **Set Environment Variables** (Optional)
   ```
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_API_URL=https://your-api.example.com
   NEXT_PUBLIC_WS_URL=wss://your-ws.example.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Root Directory**
   ```bash
   cd /path/to/talkon-monorepo
   vercel
   ```

4. **Follow CLI Prompts**
   - Accept default settings (configured via vercel.json)
   - Vercel will automatically use the monorepo configuration

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Environment Variables

### Required Variables

None required for basic deployment. The app will work with default settings.

### Optional Variables

Configure these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Public URL of your app | `https://talkon.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `https://api.talkon.com` |
| `NEXT_PUBLIC_WS_URL` | WebSocket server URL | `wss://ws.talkon.com` |

**Note**: All variables starting with `NEXT_PUBLIC_` are exposed to the browser.

---

## Monorepo Configuration

The TalkON repository is a monorepo containing multiple packages:

```
talkon-monorepo/
├── packages/
│   ├── web-app/          ← Deployed to Vercel ✅
│   ├── mobile-app/       ← Ignored (React Native) ❌
│   ├── desktop-app/      ← Ignored (Electron) ❌
│   ├── backend-*/        ← Ignored (Backend services) ❌
│   └── shared/           ← Ignored ❌
└── vercel.json           ← Monorepo configuration
```

### How It Works

1. **vercel.json** specifies `rootDirectory: "packages/web-app"`
2. **.vercelignore** excludes all non-web packages
3. Only the web-app is built and deployed
4. Backend services run separately (not on Vercel)

---

## Build Process

### What Happens During Build

1. **Install Dependencies**: `npm install` runs in monorepo root
2. **Navigate to web-app**: Build context switches to `packages/web-app`
3. **Build Next.js App**: `next build` creates optimized production build
4. **Deploy**: `.next` directory is deployed to Vercel Edge Network

### Build Time

- **First build**: ~2-3 minutes
- **Subsequent builds**: ~1-2 minutes (with caching)

### Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         90.3 kB
├ ○ /_not-found                          871 B          85.9 kB
└ ○ /favicon.ico                         0 B                0 B
```

---

## Post-Deployment

### Verify Deployment

1. **Check Homepage**: Visit your Vercel URL
2. **Test Features**: Ensure all pages load correctly
3. **Check Browser Console**: Verify no errors

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate (automatic)

### Monitoring

- **Analytics**: Built-in Vercel Analytics (optional)
- **Logs**: Real-time function logs in dashboard
- **Performance**: Web Vitals tracking

---

## Troubleshooting

### Build Fails

**Issue**: Build fails with dependency errors

**Solution**:
```bash
# Clear local cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Test build locally
cd packages/web-app
npm run build
```

**Issue**: "Cannot find module" errors

**Solution**: Check `tsconfig.json` paths are correct
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Runtime Errors

**Issue**: API calls fail

**Solution**: Verify `NEXT_PUBLIC_API_URL` environment variable is set

**Issue**: Images not loading

**Solution**: Add image domains to `next.config.js`:
```javascript
images: {
  domains: ['your-cdn.com'],
}
```

### Build Time Too Long

**Solution**:
1. Enable SWC minification (already enabled)
2. Review and optimize dependencies
3. Use Vercel's build cache (automatic)

### Memory Issues

**Issue**: Build fails with "JavaScript heap out of memory"

**Solution**: This shouldn't happen with our current setup, but if it does:
- Contact Vercel support to increase build memory
- Optimize bundle size by removing unused dependencies

---

## Best Practices

### 1. Use Environment Variables

Never hardcode API URLs or secrets. Use environment variables:

```typescript
// ❌ Bad
const API_URL = 'https://api.example.com';

// ✅ Good
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

### 2. Optimize Images

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={200}
  priority // for above-the-fold images
/>
```

### 3. Enable Preview Deployments

- Every PR gets a unique preview URL
- Test changes before merging
- Automatic deployment on merge to main

### 4. Set Up Domains Early

- Production: `talkon.com` → main branch
- Staging: `staging.talkon.com` → staging branch
- Preview: `*.vercel.app` → PR branches

### 5. Monitor Performance

- Use Vercel Analytics
- Check Web Vitals regularly
- Optimize based on real user data

---

## CI/CD Integration

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches

### Disable Auto Deploy

In Project Settings → Git:
- Toggle "Production Branch" deployments
- Toggle "Preview Deployments" for PRs

### Deploy Hooks

Create webhook for manual/API deployments:
1. Project Settings → Git → Deploy Hooks
2. Create hook with branch name
3. Trigger via HTTP POST request

---

## Advanced Configuration

### Custom Build Command

If needed, modify in `vercel.json`:

```json
{
  "buildCommand": "npm run build && npm run post-build"
}
```

### Edge Functions

Next.js API routes automatically become Edge Functions:

```typescript
// packages/web-app/src/app/api/hello/route.ts
export const runtime = 'edge'; // Optional: force edge runtime

export async function GET() {
  return Response.json({ hello: 'world' });
}
```

### Caching Strategy

Vercel automatically caches:
- Static assets: Cache-Control headers
- API responses: Use `revalidate` in data fetching
- Image optimization: Automatic caching

---

## Rollback

### Via Dashboard

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Via CLI

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## Security

### Automatic HTTPS

- Free SSL certificate
- Automatic renewal
- HTTPS enforced by default

### Environment Variables

- Never commit secrets to Git
- Use Vercel's encrypted environment variables
- Separate variables per environment (Production, Preview, Development)

### Headers

Add security headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    },
  ];
}
```

---

## Support

### Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TalkON GitHub Issues](https://github.com/yourusername/talkon/issues)

### Get Help

1. Check this guide first
2. Review Vercel deployment logs
3. Check browser console for errors
4. Open GitHub issue with deployment logs

---

## Deployment Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Custom domain added and verified
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors on homepage
- [ ] Images load correctly
- [ ] API connections work (if applicable)
- [ ] Mobile responsive design verified
- [ ] Performance metrics acceptable
- [ ] Analytics/monitoring set up
- [ ] Team access configured

---

## Success! 🎉

Your TalkON web app is now live on Vercel!

- **Production URL**: `https://your-project.vercel.app`
- **Dashboard**: `https://vercel.com/dashboard`
- **Analytics**: Enable in Project Settings

For backend services, databases, and other infrastructure, refer to the main README.md and infrastructure documentation.
