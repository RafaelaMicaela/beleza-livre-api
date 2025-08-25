# 🚀 Deployment Guide - Beleza Livre API

## Overview
This guide details the deployment process for the Beleza Livre API to Vercel platform, following the comprehensive deployment plan for our vegan cosmetics e-commerce platform.

## 🎯 Deployment Objectives
- ✅ Secure and scalable deployment on Vercel
- ✅ Integration with production PostgreSQL database
- ✅ Environment variable security
- ✅ Continuous monitoring and maintenance

## 📋 Pre-Deployment Checklist

### ✅ Local Validation (COMPLETED)
- [x] Dependencies installed (`npm install`)
- [x] Prisma client generated (`npx prisma generate`)
- [x] Local server tested (`npm run dev`)
- [x] Health check endpoint verified (`GET /`)

### ✅ Build Optimization (COMPLETED)
- [x] Production scripts added to package.json
- [x] Node.js version specified (>=18.0.0)
- [x] Vercel build script configured

### ✅ Configuration Files (COMPLETED)
- [x] vercel.json created for serverless deployment
- [x] Environment template (.env.example) created
- [x] Enhanced database configuration with graceful shutdown
- [x] Updated .gitignore for security

## 🗄️ Database Setup (Next Steps)

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create new project → "Provision PostgreSQL"
3. Copy the connection string from "Connect" tab
4. Format: `postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway`

### Option 2: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create new project with PostgreSQL
3. Copy connection string from dashboard
4. Format: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb`

### Option 3: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection string
4. Format: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`

## 🔧 Vercel Deployment Steps

### 1. Repository Setup
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Vercel Project Creation
1. Visit [vercel.com](https://vercel.com) and login
2. Click "New Project"
3. Import your GitHub repository (`beleza-livre-api`)
4. Framework Preset: "Other"
5. Build Command: `npm run vercel-build`
6. Output Directory: Leave empty
7. Install Command: `npm install`

### 3. Environment Variables Configuration
In Vercel Dashboard → Settings → Environment Variables, add:

```
NODE_ENV=production
DATABASE_URL=your_production_database_url_here
JWT_SECRET=your_super_secure_jwt_secret
PORT=3000
```

### 4. Deploy
Click "Deploy" and monitor the build process.

## 🧪 Post-Deployment Testing

### Health Check
```bash
curl https://your-app-name.vercel.app/
# Expected: {"message":"API de E-commerce de Cosméticos Veganos"}
```

### Database Migration (if needed)
```bash
# In your local environment, connected to production DB
npx prisma migrate deploy
```

## 📊 Monitoring Setup

### 1. Vercel Analytics
- Enable in Vercel Dashboard → Analytics
- Monitor function invocations, errors, and performance

### 2. Database Monitoring
- Railway: Built-in metrics in dashboard
- Neon: Monitor through Neon console
- Set up alerts for connection limits

### 3. Error Tracking
- Monitor Vercel function logs
- Set up error alerting via email/Slack

## 🔄 Maintenance Procedures

### Regular Updates
```bash
# Weekly/Bi-weekly updates
npm update
npx prisma migrate deploy  # if schema changes
git commit -am "Update dependencies"
git push  # Triggers auto-deployment
```

### Rollback Procedure
1. In Vercel Dashboard → Deployments
2. Find previous stable deployment
3. Click "Promote to Production"
4. Or revert Git commit and push

### Database Backup
```bash
# Create backup (adjust for your database provider)
pg_dump your_database_url > backup_$(date +%Y%m%d).sql
```

## 🚨 Emergency Contacts & Resources

### Vercel Support
- Documentation: https://vercel.com/docs
- Status: https://vercel-status.com
- Support: Via dashboard

### Database Providers
- Railway: https://docs.railway.app
- Neon: https://neon.tech/docs
- Supabase: https://supabase.com/docs

## 📈 Performance Optimization

### Vercel Function Optimization
- Current timeout: 30 seconds (configured in vercel.json)
- Monitor cold starts in Analytics
- Consider upgrading to Pro for better performance

### Database Optimization
- Enable connection pooling
- Monitor query performance
- Set up read replicas if needed

## 🔒 Security Checklist
- [x] Environment variables secured
- [x] CORS configured
- [x] Helmet security headers enabled
- [x] Database credentials not in code
- [x] HTTPS enforced by Vercel
- [ ] Rate limiting (future enhancement)
- [ ] API authentication (future enhancement)

## 📝 Next Steps After Deployment
1. Test all endpoints with production database
2. Update Swagger documentation with production URL
3. Integrate with frontend application
4. Set up monitoring dashboards
5. Plan API versioning strategy
6. Implement authentication system
7. Add comprehensive error handling
8. Set up automated testing pipeline

---

**Estimated Total Deployment Time:** 2-3 hours for first deployment
**Maintenance Schedule:** Bi-weekly updates and monitoring