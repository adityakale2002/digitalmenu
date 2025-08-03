# 🏨 Hotel Shivmal Domain Setup Guide

## 🌐 Domain: hotelshivmal.icu

### **Step 1: GitHub Pages Setup (Already Done ✅)**
- ✅ Repository: https://github.com/adityakale2002/digitalmenu
- ✅ GitHub Actions workflow created
- ✅ CNAME file added for custom domain
- ✅ Automatic deployment enabled

### **Step 2: Domain DNS Configuration**

You need to configure your domain's DNS settings. Go to your domain registrar (where you bought hotelshivmal.icu) and add these DNS records:

#### **Option A: CNAME Record (Recommended)**
```
Type: CNAME
Name: @ (or leave empty)
Value: adityakale2002.github.io
TTL: 3600 (or default)
```

#### **Option B: A Records**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### **Step 3: Enable Custom Domain in GitHub**

1. Go to your repository: https://github.com/adityakale2002/digitalmenu
2. Go to **Settings** → **Pages**
3. Under **Custom domain**, enter: `hotelshivmal.icu`
4. Check **"Enforce HTTPS"**
5. Click **Save**

### **Step 4: Wait for DNS Propagation**
- DNS changes can take 24-48 hours
- You can check propagation at: https://www.whatsmydns.net/
- Enter: `hotelshivmal.icu`

### **Step 5: Test Your Domain**
Once DNS is propagated, your app will be available at:
**https://hotelshivmal.icu**

### **Step 6: Generate QR Codes**
Create QR codes for each table pointing to:
**https://hotelshivmal.icu**

### **Step 7: Backend Deployment (Optional)**
For full functionality, deploy the backend to:
- Railway: https://railway.app
- Render: https://render.com
- Heroku: https://heroku.com

## 🎯 **Expected Timeline:**
- **Immediate:** GitHub Pages deployment
- **1-2 hours:** DNS propagation
- **24-48 hours:** Full domain availability

## 📱 **Customer Experience:**
1. Customer sits at table
2. Scans QR code
3. Menu opens at https://hotelshivmal.icu
4. Orders food directly
5. Kitchen receives order instantly

## 🔧 **Troubleshooting:**
- If domain doesn't work: Check DNS settings
- If app doesn't load: Check GitHub Actions
- If SSL error: Wait for HTTPS certificate (automatic)

## 📞 **Support:**
- GitHub Issues: https://github.com/adityakale2002/digitalmenu/issues
- Domain Registrar: Contact your domain provider 