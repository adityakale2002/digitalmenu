# Free Deployment Guide - Fix Authentication Issues

## 🚀 Free Deployment Options

### Option 1: Vercel + Railway (Recommended)
- **Frontend**: Vercel (Free)
- **Backend**: Railway (Free tier - 500 hours/month)
- **Cost**: $0/month

### Option 2: Netlify + Render
- **Frontend**: Netlify (Free)
- **Backend**: Render (Free tier - 750 hours/month)
- **Cost**: $0/month

## 🔧 Authentication Issues Fixed

### 1. API URL Configuration
- ✅ Updated to use environment variables
- ✅ Works both locally and in production
- ✅ No more hardcoded IP addresses

### 2. CORS Configuration
- ✅ Secure CORS settings for production
- ✅ Allows your domain only
- ✅ Proper credentials handling

### 3. Environment Variables
- ✅ Frontend: `VITE_API_URL`
- ✅ Backend: `FRONTEND_URL`, `NODE_ENV`

## 📋 Deployment Steps

### Step 1: Deploy Backend to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Connect your GitHub repo
5. Set environment variables:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-domain.vercel.app
   MONGODB_URI=your_mongodb_uri
   ```
6. Deploy

### Step 2: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set environment variable:
   ```
   VITE_API_URL=https://your-railway-app.railway.app/api
   ```
4. Deploy

### Step 3: Connect Your Domain
1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add your hotel domain
4. Update DNS records

## 🔐 Admin Authentication
- Username: `admin`
- Password: `admin123`
- This is client-side only (for demo)

## 🛠️ Troubleshooting

### If authentication still fails:
1. Check browser console for CORS errors
2. Verify environment variables are set
3. Ensure backend URL is correct
4. Check Railway logs for errors

### Common Issues:
- **CORS Error**: Check FRONTEND_URL in Railway
- **API Not Found**: Verify VITE_API_URL in Vercel
- **Domain Issues**: Wait 24-48 hours for DNS propagation

## 💰 Cost Breakdown
- **Vercel**: Free (unlimited)
- **Railway**: Free (500 hours/month)
- **Domain**: Your existing domain
- **Total**: $0/month

## 🚀 Ready to Deploy?
Run these commands to test locally first:

```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
npm install
npm run dev
```

Then follow the deployment steps above! 