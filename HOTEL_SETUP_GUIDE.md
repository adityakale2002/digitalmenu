# 🏨 Hotel Shivmal - Digital Menu Setup Guide

## 📱 How to Use Your Digital Menu System

### **For Customers:**
1. **Visit:** `https://hotelshivmal.icu`
2. **Select your table number** (1-10)
3. **Browse menu and place orders**
4. **Request bill when done**

### **For Hotel Staff:**

#### **Admin Login:**
- **URL:** `https://hotelshivmal.icu/admin/login`
- **Username:** `admin`
- **Password:** `admin123`

#### **Management Dashboard:**
- **URL:** `https://hotelshivmal.icu/management`
- **Features:**
  - View all orders
  - Accept/reject orders
  - Generate bills
  - View feedback
  - Download reports

## 🎯 Table Links for QR Codes

**Create QR codes for each table:**

- **Table 1:** `https://hotelshivmal.icu?table=1`
- **Table 2:** `https://hotelshivmal.icu?table=2`
- **Table 3:** `https://hotelshivmal.icu?table=3`
- **Table 4:** `https://hotelshivmal.icu?table=4`
- **Table 5:** `https://hotelshivmal.icu?table=5`
- **Table 6:** `https://hotelshivmal.icu?table=6`
- **Table 7:** `https://hotelshivmal.icu?table=7`
- **Table 8:** `https://hotelshivmal.icu?table=8`
- **Table 9:** `https://hotelshivmal.icu?table=9`
- **Table 10:** `https://hotelshivmal.icu?table=10`

## 📋 Staff Instructions

### **For Waiters:**
1. **Help customers scan QR codes**
2. **Monitor orders in management dashboard**
3. **Serve food when orders are ready**
4. **Generate bills when requested**

### **For Kitchen Staff:**
1. **Check management dashboard for new orders**
2. **Update order status when cooking**
3. **Mark orders as ready when done**

### **For Management:**
1. **Monitor all operations**
2. **Generate reports**
3. **View customer feedback**
4. **Manage menu items**

## 🔧 Technical Setup

### **Upload to Hostinger:**
1. **Login to Hostinger dashboard**
2. **Go to File Manager**
3. **Navigate to `public_html`**
4. **Upload all files from `dist` folder**
5. **Create `.htaccess` file with:**
   ```
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### **Backend Setup:**
- **Use free backend service** (Railway/Render)
- **Set environment variables**
- **Connect to MongoDB**

## 📞 Support

**If you need help:**
- Check the management dashboard for system status
- Contact your IT support for technical issues
- Use the feedback system for customer complaints

## 💰 Cost Breakdown

- **Domain:** Your existing `hotelshivmal.icu`
- **Hosting:** Hostinger (your existing plan)
- **Backend:** Free (Railway/Render)
- **Total Cost:** $0/month (using free services)

---

**Your digital menu system is ready! 🎉** 