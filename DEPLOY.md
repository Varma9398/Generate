# 🚀 Vercel Deployment Guide - Cloud AI Image Generator

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Varma9398/Ge)

## **Environment Variables Required**

Before deploying, you need these API keys:

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini AI API key | [Get it here](https://aistudio.google.com/app/apikey) |
| `SUPABASE_URL` | ✅ Yes | Your Supabase project URL | [Supabase Dashboard](https://supabase.com/dashboard) |
| `SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous key | [Supabase Dashboard](https://supabase.com/dashboard) |
| `ALLOWED_ORIGINS` | ⚠️ Recommended | Comma-separated allowed domains | Your deployed domain |
| `PORT` | ❌ Optional | Server port (default: 3000) | Usually auto-set |

## **🎯 Vercel Deployment (FREE)**

### **Why Vercel?**
- ✅ **Zero configuration** - Just works!
- ✅ **Global CDN** for fast image loading
- ✅ **Auto SSL**
- ✅ **Serverless functions**
- ✅ **GitHub integration**
- ✅ **Automatic deployments**

### **Quick Deploy Steps:**

1. **One-Click Deploy**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Varma9398/Ge)

2. **Connect GitHub Account**
   - Click the deploy button above
   - Sign in to Vercel with GitHub
   - Authorize Vercel to access your repositories

3. **Import Repository**
   - Vercel will automatically detect the repository
   - Click "Import" to proceed
   - Choose a project name (or keep default)

4. **Configure Environment Variables**
   
   In the Vercel deployment screen, add these environment variables:
   
   ```
   GEMINI_API_KEY = your_actual_gemini_api_key_here
   SUPABASE_URL = https://your-project.supabase.co
   SUPABASE_ANON_KEY = your_actual_supabase_anon_key_here
   ALLOWED_ORIGINS = https://your-app.vercel.app
   ```

5. **Deploy!**
   - Click "Deploy" button
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

## **🔧 Post-Deployment Configuration**

### **Update ALLOWED_ORIGINS**
After deployment, update your environment variables:
1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Update `ALLOWED_ORIGINS` with your actual domain:
   ```
   ALLOWED_ORIGINS = https://your-actual-domain.vercel.app
   ```
4. Redeploy the application

### **Custom Domain (Optional)**
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS settings as instructed
4. Update `ALLOWED_ORIGINS` to include your custom domain

## **🔒 Security Checklist**

- ✅ API keys stored as environment variables in Vercel
- ✅ CORS configured for your domain
- ✅ Rate limiting enabled
- ✅ Input validation implemented
- ✅ Helmet security headers
- ✅ File upload restrictions
- ✅ No sensitive data in frontend code

## **📊 Monitoring & Maintenance**

### **Health Check**
- URL: `https://your-domain.vercel.app/health`
- Should return: `{"status": "OK", "timestamp": "..."}`

### **Vercel Analytics**
- Enable Vercel Analytics in project settings
- Monitor performance and usage
- Track API response times

### **Logs**
- View function logs in Vercel dashboard
- Monitor for errors and performance issues
- Set up alerts for critical errors

## **🐛 Troubleshooting**

### **Common Issues**

| Issue | Solution |
|-------|----------|
| Images not loading | Ensure images are in `public/` folder or use absolute URLs |
| API key errors | Verify keys in Vercel environment variables |
| CORS errors | Add your Vercel domain to `ALLOWED_ORIGINS` |
| Function timeout | Optimize API calls or increase timeout in `vercel.json` |
| Build failures | Check Node.js version compatibility |

### **Debug Commands**
```bash
# Check deployment logs
vercel logs your-project-url

# Local development
vercel dev

# Redeploy
vercel --prod
```

## **🔄 Automatic Deployments**

Vercel automatically deploys when you push to your GitHub repository:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin master
   ```
3. Vercel automatically builds and deploys
4. Check deployment status in Vercel dashboard

## **💰 Cost Information**

### **Vercel Free Tier:**
- 100GB bandwidth/month
- 1000 serverless function invocations/day
- Unlimited static deployments
- Custom domains included

### **API Costs:**
- **Gemini AI**: Pay per request (check Google AI Studio pricing)
- **Supabase**: 50k database rows free, 500MB storage
- **Pollinations AI**: Free image generation

## **📈 Performance Optimization**

### **Vercel-Specific Optimizations**
- Images automatically optimized by Vercel
- Static assets served from global CDN
- Serverless functions cached globally
- Auto-scaling based on traffic

### **Best Practices**
- Use Vercel Image Optimization for gallery images
- Enable Edge Functions for better performance
- Configure proper caching headers
- Monitor Core Web Vitals in Vercel Analytics

---

**🎉 Your Cloud AI Image Generator is now live on Vercel!**

**Repository:** https://github.com/Varma9398/Ge.git  
**Deploy:** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Varma9398/Ge)

For support, create an issue at: https://github.com/Varma9398/Ge/issues