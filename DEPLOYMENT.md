# Deployment Guide

## Quick Start - Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory:**
   ```bash
   cd portfolio
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```

5. **Follow the interactive prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? (Press Enter for default)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

6. **Your site will be live!** Vercel will provide you with a URL.

### Method 2: GitHub + Vercel (Best for Continuous Deployment)

1. **Initialize Git repository:**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   ```

2. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., `portfolio`)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your `portfolio` repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

5. **Automatic deployments:**
   - Every push to `main` branch will trigger a new deployment
   - Preview deployments for pull requests

### Method 3: Vercel Dashboard (No CLI)

1. **Prepare your project:**
   ```bash
   cd portfolio
   npm install
   npm run build  # Test build locally
   ```

2. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in or create account
   - Click "Add New Project"

3. **Import project:**
   - Option A: Connect GitHub/GitLab/Bitbucket account
   - Option B: Upload project folder directly

4. **Configure:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

## Environment Variables

If you need environment variables (e.g., for contact form API):

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Environment Variables
   - Add variables (e.g., `NEXT_PUBLIC_API_KEY`)

2. **Redeploy** after adding variables

## Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Domains
   - Add your domain (e.g., `rohit.dev`)

2. **Configure DNS:**
   - Follow Vercel's DNS instructions
   - Add the provided records to your domain registrar

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - HTTPS enabled by default

## Build Optimization

The project is already optimized for production:

- ✅ Next.js automatic code splitting
- ✅ Image optimization (when using Next.js Image component)
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Static generation where possible

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Test locally:**
   ```bash
   npm run build
   ```
3. **Common issues:**
   - Missing dependencies → Check `package.json`
   - TypeScript errors → Run `npm run lint`
   - Environment variables → Add in Vercel dashboard

### Performance Issues

1. **Check Vercel Analytics** (if enabled)
2. **Optimize images** (use Next.js Image component)
3. **Reduce bundle size** (check for large dependencies)

### Contact Form Not Working

1. **Update form handler** in `components/sections/Contact.tsx`
2. **Add API route** in `app/api/contact/route.ts`
3. **Set environment variables** in Vercel dashboard

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify responsive design on mobile/tablet
- [ ] Check contact form functionality
- [ ] Update social media links
- [ ] Add resume PDF to `public` folder
- [ ] Update personal information in components
- [ ] Test page load speed
- [ ] Verify SEO meta tags
- [ ] Check all external links

## Continuous Deployment

Once connected to GitHub:

- **Automatic deployments** on every push to `main`
- **Preview deployments** for pull requests
- **Rollback** to previous deployments if needed

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

For Next.js issues:
- [Next.js Documentation](https://nextjs.org/docs)

---

Happy deploying! 🚀



