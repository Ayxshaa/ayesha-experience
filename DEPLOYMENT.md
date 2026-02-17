# Deployment Guide

## Deploying to Vercel

### Prerequisites
- [Vercel Account](https://vercel.com) (free tier works great)
- GitHub repository connected to Vercel
- Gemini API Key

### Environment Variables
Before deploying, you'll need to set up environment variables in Vercel:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key (get it from [ai.google.dev](https://ai.google.dev/))
   - **Environments**: Production, Preview, Development (select all)

### Deployment Steps

#### Option 1: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to link your project and set environment variables
```

#### Option 2: Using GitHub Integration (Easiest)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Vite and configure build settings
4. Add environment variables in the project settings
5. Click **Deploy**

### Post-Deployment
Once deployed, Vercel will:
- ✅ Build your project using `npm run build`
- ✅ Serve the `dist` folder
- ✅ Handle all routing through `index.html` (SPA configuration)
- ✅ Provide automatic HTTPS
- ✅ Enable automatic deployments on every push to main

### Security Best Practices (Already Implemented)
✓ `.env` files are in `.gitignore` - **never pushed to GitHub**
✓ `.env.local` is in `.gitignore` - **never pushed to GitHub**
✓ Only `VITE_` prefixed variables are exposed to the client
✓ API keys are only stored in Vercel's secure environment variables
✓ `vercel.json` shows the structure but never contains actual secrets

### Verify No Sensitive Data is Committed
```bash
# Check if any .env files were accidentally committed
git log --all --full-history --source -- ".env*"

# View what's actually in your git index
git ls-files | grep -E "\.env|\.local|secret|key|password"
```

### Monitoring & Logs
- View deployment logs: Vercel Dashboard → Project → Deployments
- Real-time logs: `vercel logs [project-name]`
- Analytics: Vercel Dashboard → Analytics tab

### Troubleshooting

**Build fails with "API key not found"**
- Verify environment variable name is exactly `VITE_GEMINI_API_KEY`
- Ensure it's set in all environments (Production, Preview, Development)
- Rebuild after adding env variables: Click "Redeploy" on Vercel

**Page shows blank after deployment**
- Check browser console for errors
- Verify all API calls are using correct environment variables
- Ensure 3D models in `/public/models/` exist and are accessible

**CORS or API issues**
- Gemini API should handle CORS from any domain
- Check your API key permissions in Google AI Console

### Rolling Back
If deployment has issues:
1. Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click the "..." menu → Promote to Production

### Custom Domain
1. Go to project Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel will provide instructions)
