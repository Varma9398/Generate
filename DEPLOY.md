# Vercel Deployment Guide

This guide covers deploying your Cloud AI Image Generator to Vercel from GitHub.

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account with your repository: https://github.com/Varma9398/Clo.git
- Vercel account (free tier available)
- API keys ready (Gemini AI, Supabase)

### Step 1: Import from GitHub to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in or create account

2. **Import Repository**
   - Click "New Project"
   - Select "Import Git Repository"
   - Enter: `https://github.com/Varma9398/Clo.git`
   - Click "Import"

3. **Configure Project**
   - Project Name: `clo` (or your preferred name)
   - Framework Preset: `Other` (auto-detected)
   - Root Directory: `./` (default)
   - Click "Deploy"

### Step 2: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```env
GEMINI_API_KEY=your_actual_gemini_api_key
SUPABASE_URL=your_actual_supabase_url
SUPABASE_ANON_KEY=your_actual_supabase_anon_key
NODE_ENV=production
```

### Step 3: Redeploy

After adding environment variables:
- Go to Deployments tab
- Click "..." on latest deployment
- Select "Redeploy"

## 🔧 Architecture

```
Frontend (Vercel Static) → Serverless Functions (/api/*) → External APIs
                                ↓
                          Environment Variables (Secure)
```

### Vercel Serverless Functions

- `/api/signin.js` - User authentication
- `/api/signup.js` - User registration  
- `/api/analyze-image.js` - Image analysis via Gemini AI
- `/api/generate-image.js` - Image generation

### Static Assets

- Frontend files served from root
- Images served from `/public/images/`
- Optimized routing via `vercel.json`

## 🔒 Security Features

✅ **API Keys Protected** - Stored as Vercel environment variables  
✅ **CORS Enabled** - Cross-origin requests allowed  
✅ **Serverless Functions** - Auto-scaling backend  
✅ **HTTPS by Default** - Secure connections  
✅ **Edge Network** - Global CDN distribution  

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Missing**
   - Verify all required env vars are set in Vercel dashboard
   - Redeploy after adding variables

2. **API Function Errors**
   - Check function logs in Vercel dashboard
   - Verify API keys are valid and have quota

3. **CORS Issues**
   - Functions include CORS headers by default
   - Check browser console for specific errors

4. **Build Failures**
   - Ensure `package.json` includes all dependencies
   - Check Node.js version compatibility

### Logs and Monitoring

- **Function Logs**: Vercel Dashboard → Functions tab
- **Real-time Logs**: `vercel logs --follow`
- **Analytics**: Vercel Dashboard → Analytics

## 📈 Performance

- **Global CDN**: Assets served from edge locations
- **Serverless Auto-scaling**: Functions scale automatically
- **Optimized Images**: Static assets cached efficiently
- **Fast Cold Starts**: Minimal function initialization time

## 🔄 Updates

To deploy updates:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. **Auto-deploy**
   - Vercel automatically deploys on push
   - Monitor progress in Vercel dashboard

## 📊 Monitoring

- **Usage**: Monitor API calls and bandwidth
- **Performance**: Track function execution times
- **Errors**: Real-time error tracking
- **Analytics**: User engagement metrics

Your app will be live at: `https://your-project-name.vercel.app`