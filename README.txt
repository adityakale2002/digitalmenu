===================================================
    Restaurant Management Software
===================================================

SYSTEM REQUIREMENTS
------------------
- Windows 10 or later (64-bit)
- 4GB RAM minimum (8GB recommended)
- 1GB free disk space
- Internet connection for initial setup
- Display resolution: 1366x768 or higher

PREREQUISITES
-------------
1. Node.js (v18.0.0 or later)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Run the installer as Administrator
   - Important: Check "Automatically install necessary tools" during installation

2. MongoDB Community Edition
   - Download from: https://www.mongodb.com/try/download/community
   - Choose "Complete" installation type
   - Install MongoDB Compass when prompted
   - Important: Install MongoDB as a service

INSTALLATION STEPS
-----------------
1. Download and Install Prerequisites
   a. Install Node.js first
   b. Restart your computer
   c. Install MongoDB
   d. Restart your computer again

2. Install the Software
   a. Extract the downloaded ZIP file to a location of your choice
      (e.g., C:\RestaurantManagement)
   b. Double-click install.bat
   c. Follow the on-screen instructions
   d. Wait for the installation to complete

3. First-Time Setup
   a. A desktop shortcut will be created automatically
   b. Double-click the "Restaurant Management" shortcut
   c. Wait for the browser to open automatically
   d. Log in with the default credentials:
      - Username: admin
      - Password: admin123
      (Change these immediately after first login)

RUNNING THE SOFTWARE
-------------------
1. Normal Start
   - Double-click the desktop shortcut
   - Wait for the browser to open automatically
   - The software will be available at http://localhost:3000

2. Manual Start (if shortcut doesn't work)
   - Navigate to the installation folder
   - Double-click start.bat
   - Open your browser and go to http://localhost:3000

TROUBLESHOOTING
--------------
1. Software Won't Start
   a. Check if MongoDB service is running:
      - Press Win + R
      - Type "services.msc"
      - Look for "MongoDB" service
      - If not running, right-click and select "Start"
   
   b. Check if ports are available:
      - Port 3000 (Frontend)
      - Port 4000 (Backend)
      - Port 27017 (MongoDB)
   
   c. Check firewall settings:
      - Allow Node.js and MongoDB through Windows Firewall
      - Add exceptions for ports 3000, 4000, and 27017

2. Database Connection Issues
   a. Verify MongoDB installation:
      - Open Command Prompt
      - Type "mongod --version"
      - Should show MongoDB version information
   
   b. Check MongoDB service:
      - Open Command Prompt as Administrator
      - Type "net start MongoDB"
      - Should show "The MongoDB service is starting"

3. Node.js Issues
   a. Verify Node.js installation:
      - Open Command Prompt
      - Type "node --version"
      - Should show version 18.0.0 or higher
   
   b. Clear npm cache:
      - Open Command Prompt as Administrator
      - Type "npm cache clean --force"

4. Common Error Messages
   a. "Cannot find module"
      - Run install.bat again
      - If persists, delete node_modules folder and run install.bat
   
   b. "Port already in use"
      - Close other applications using the ports
      - Restart your computer
   
   c. "MongoDB connection failed"
      - Check if MongoDB service is running
      - Verify MongoDB installation
      - Check firewall settings

MAINTENANCE
-----------
1. Regular Backups
   - Data is stored in MongoDB
   - Use MongoDB Compass to export data
   - Keep backups in a secure location

2. Updates
   - Check for software updates regularly
   - Back up data before updating
   - Follow update instructions provided

3. Performance
   - Clear browser cache regularly
   - Keep the software folder clean
   - Monitor disk space

SUPPORT
-------
For technical support, please contact:
[Your Support Contact Information]

===================================================
    End of Documentation
=================================================== 