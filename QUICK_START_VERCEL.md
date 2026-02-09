# 🚀 Quick Start: Deploy TalkON to Vercel

## The Absolute Fastest Way to Deploy

### Option 1: Vercel Dashboard (2 Minutes)

1. **Visit**: [vercel.com/new](https://vercel.com/new)
2. **Import**: Select your Git repository
3. **Auto-Configure**: Vercel detects everything automatically ✨
4. **Deploy**: Click the big blue button
5. **Done!** 🎉

That's it! Your app will be live at `your-project.vercel.app` in ~2 minutes.

---

### Option 2: Vercel CLI (3 Commands)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from repository root)
vercel
```

Follow the prompts, accept defaults. Done!

---

## Environment Variables (Optional)

If you need to set environment variables:

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add these (all optional for basic deployment):

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_WS_URL=wss://ws.your-domain.com
```

---

## What Gets Deployed?

Only `packages/web-app` is deployed to Vercel.

Everything else (mobile, desktop, backend) is automatically ignored.

---

## Troubleshooting

### Build Failed?

Check the build logs in Vercel Dashboard. Common issues:

- **Missing dependencies**: Rare, but run `npm install` locally to verify
- **TypeScript errors**: Run `npm run type-check` in `packages/web-app`
- **Import errors**: Check for typos in import paths

### Page Not Loading?

1. Check Vercel function logs in dashboard
2. Check browser console for errors
3. Verify deployment completed successfully

---

## What's Configured?

This repository is **already configured** for Vercel:

✅ `vercel.json` - Points to `packages/web-app`  
✅ `next.config.js` - Optimized for Vercel  
✅ `.vercelignore` - Excludes non-web packages  
✅ All dependencies are web-only

**You don't need to change anything!**

---

## Need More Details?

- **Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Build Checklist**: See [VERCEL_BUILD_CHECK.md](VERCEL_BUILD_CHECK.md)
- **Status Verification**: See [VERCEL_READY.md](VERCEL_READY.md)

---

## Custom Domain?

After deployment:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `talkon.com`)
3. Update DNS records as instructed
4. SSL certificate is automatic!

---

## That's It!

Your TalkON web app is production-ready and optimized for Vercel.

**Deploy now**: [vercel.com/new](https://vercel.com/new) 🚀

---

**Questions?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive guide.
