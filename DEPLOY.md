# 🚀 Deployment Guide - Cloud AI Image Generator

## **Environment Variables Required**

Before deploying, you need these API keys:

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini AI API key | [Get it here](https://aistudio.google.com/app/apikey) |
| `SUPABASE_URL` | ✅ Yes | Your Supabase project URL | [Supabase Dashboard](https://supabase.com/dashboard) |
| `SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous key | [Supabase Dashboard](https://supabase.com/dashboard) |
| `ALLOWED_ORIGINS` | ⚠️ Recommended | Comma-separated allowed domains | Your deployed domain |
| `PORT` | ❌ Optional | Server port (default: 3000) | Usually auto-set |

## **🎯 One-Click Deployment Options**

### **1. Vercel (Recommended - FREE)**
- ✅ **Zero configuration** - Just works!
- ✅ **Global CDN** 
- ✅ **Auto SSL**
- ✅ **Serverless functions**

**Steps:**
1. [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Varma9398/Ge)
2. Connect GitHub account
3. Add environment variables
4. Deploy!

### **2. Netlify (FREE)**
- ✅ **Easy deployment**
- ✅ **Form handling**
- ✅ **Edge functions**

**Steps:**
1. [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Varma9398/Ge)
2. Connect repository
3. Add environment variables
4. Deploy!

### **3. Railway (FREE tier available)**
- ✅ **Database included**
- ✅ **Easy scaling**
- ✅ **Auto deploys**

**Steps:**
1. [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Varma9398/Ge)
2. Add environment variables
3. Deploy!

### **4. Render (FREE)**
- ✅ **Free SSL**
- ✅ **Auto deploys**
- ✅ **Health checks**

**Steps:**
1. [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Varma9398/Ge)
2. Configure environment variables
3. Deploy!

## **🐳 Docker Deployment**

### **Quick Start with Docker**
```bash
# Clone repository
git clone https://github.com/Varma9398/Ge.git
cd Ge

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Build and run
docker-compose up -d

# Your app is now running at http://localhost:3000
```

### **Docker Commands**
```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# View logs
docker logs cloud-ai-generator

# Stop container
docker stop cloud-ai-generator
```

## **☁️ Cloud Provider Setup**

### **AWS Deployment**
```bash
# Using AWS App Runner
# 1. Push to GitHub
# 2. Create App Runner service
# 3. Connect to repository
# 4. Add environment variables
# 5. Deploy!
```

### **Google Cloud Run**
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/cloud-ai
gcloud run deploy --image gcr.io/PROJECT-ID/cloud-ai --platform managed
```

### **Azure Container Instances**
```bash
# Create resource group
az group create --name cloud-ai-rg --location eastus

# Deploy container
az container create \
  --resource-group cloud-ai-rg \
  --name cloud-ai-app \
  --image your-registry/cloud-ai \
  --dns-name-label cloud-ai-unique \
  --ports 3000
```

## **🔧 Configuration Guide**

### **Environment Variables Setup**

#### **For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable:
   ```
   GEMINI_API_KEY = your_key_here
   SUPABASE_URL = https://your-project.supabase.co
   SUPABASE_ANON_KEY = your_anon_key
   ALLOWED_ORIGINS = https://your-app.vercel.app
   ```

#### **For Netlify:**
1. Site Settings → Environment Variables
2. Add variables as key-value pairs

#### **For Railway:**
1. Project → Variables tab
2. Add environment variables

## **🔒 Security Checklist**

- ✅ API keys stored as environment variables
- ✅ CORS configured for your domain
- ✅ Rate limiting enabled
- ✅ Input validation implemented
- ✅ Helmet security headers
- ✅ File upload restrictions

## **📊 Monitoring & Maintenance**

### **Health Check Endpoint**
- URL: `https://your-domain.com/health`
- Should return: `{"status": "OK", "timestamp": "..."}`

### **Logs Monitoring**
- Check application logs for errors
- Monitor API usage and costs
- Watch for rate limit hits

## **🐛 Troubleshooting**

### **Common Issues**

| Issue | Solution |
|-------|----------|
| API key errors | Verify keys in environment variables |
| CORS errors | Add your domain to `ALLOWED_ORIGINS` |
| File upload fails | Check file size (max 10MB) |
| Server not starting | Check all required env vars are set |

### **Debug Commands**
```bash
# Check environment variables
node -e "console.log(process.env)"

# Test API endpoints
curl https://your-domain.com/health
curl https://your-domain.com/api/health

# Check logs
# Vercel: vercel logs
# Netlify: netlify logs
# Railway: railway logs
```

## **💰 Cost Estimation**

### **Free Tiers:**
- **Vercel**: 100GB bandwidth/month
- **Netlify**: 100GB bandwidth/month  
- **Railway**: $5/month credit
- **Render**: 750 hours/month

### **API Costs:**
- **Gemini AI**: Pay per request
- **Supabase**: 50k DB rows free
- **Pollinations AI**: Free image generation

## **🔄 Updates & Maintenance**

### **Auto-Deploy Setup**
Most platforms support auto-deploy from GitHub:
1. Push changes to your repository
2. Platform automatically deploys
3. No manual intervention needed

### **Manual Deploy**
```bash
# Update your repository
git add .
git commit -m "Update deployment"
git push origin master

# Platform will auto-deploy
```

## **📈 Scaling**

### **Performance Optimization**
- Enable caching headers
- Use CDN for static assets
- Implement Redis for sessions
- Add database connection pooling

### **Load Balancing**
- Configure multiple instances
- Use platform auto-scaling
- Monitor response times
- Set up health checks

---

**🎉 Your Cloud AI Image Generator is now ready for production!**

For support, create an issue at: https://github.com/Varma9398/Ge/issues