@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo    Restaurant Management Software Installation
echo ===================================================
echo.
echo This installer will:
echo 1. Check system requirements
echo 2. Install required dependencies
echo 3. Configure the software
echo 4. Create desktop shortcuts
echo.
echo Press any key to continue...
pause >nul

REM Check Windows version
ver | find "10.0." >nul
if errorlevel 1 (
    echo [ERROR] This software requires Windows 10 or later.
    echo Please upgrade your Windows version.
    pause
    exit /b 1
)

REM Check system architecture
if not "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
    echo [ERROR] This software requires a 64-bit system.
    pause
    exit /b 1
)

REM Check available disk space (need at least 1GB)
for /f "tokens=3" %%a in ('dir /-c 2^>nul ^| find "bytes free"') do set "freespace=%%a"
if %freespace% LSS 1073741824 (
    echo [ERROR] Not enough disk space. Please free up at least 1GB of space.
    pause
    exit /b 1
)

echo.
echo [1/5] Checking system requirements...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed.
    echo.
    echo Please follow these steps:
    echo 1. Download Node.js from https://nodejs.org/
    echo 2. Run the installer
    echo 3. Restart your computer
    echo 4. Run this installer again
    echo.
    echo Press any key to open Node.js download page...
    pause >nul
    start https://nodejs.org/
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1" %%a in ('node --version') do set "nodeversion=%%a"
echo [OK] Node.js version !nodeversion! detected

REM Check if MongoDB is installed
mongod --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] MongoDB is not installed.
    echo.
    echo Please follow these steps:
    echo 1. Download MongoDB from https://www.mongodb.com/try/download/community
    echo 2. Run the installer
    echo 3. Choose "Complete" installation
    echo 4. Install MongoDB Compass when prompted
    echo 5. Restart your computer
    echo 6. Run this installer again
    echo.
    echo Press any key to open MongoDB download page...
    pause >nul
    start https://www.mongodb.com/try/download/community
    exit /b 1
)

echo [OK] MongoDB detected

echo.
echo [2/5] Creating necessary directories...
echo.

REM Create data directory for MongoDB
if not exist "%LOCALAPPDATA%\RestaurantManagement" (
    mkdir "%LOCALAPPDATA%\RestaurantManagement"
    mkdir "%LOCALAPPDATA%\RestaurantManagement\data"
    mkdir "%LOCALAPPDATA%\RestaurantManagement\logs"
)

echo [OK] Directories created

echo.
echo [3/5] Installing dependencies...
echo.

REM Install backend dependencies
cd backend
echo Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

REM Install frontend dependencies
cd ../frontend
echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed successfully

echo.
echo [4/5] Creating configuration files...
echo.

REM Create backend .env file
cd ../backend
echo PORT=4000 > .env
echo MONGODB_URI=mongodb://localhost:27017/restaurant >> .env
echo JWT_SECRET=restaurant_management_secret >> .env

echo [OK] Configuration files created

echo.
echo [5/5] Creating shortcuts and startup scripts...
echo.

REM Create start script
cd ..
echo @echo off > start.bat
echo echo Starting Restaurant Management Software... >> start.bat
echo echo Please wait while the services start... >> start.bat
echo. >> start.bat
echo REM Start MongoDB service >> start.bat
echo net start MongoDB >> start.bat
echo if errorlevel 1 ( >> start.bat
echo     echo [ERROR] Failed to start MongoDB service >> start.bat
echo     echo Please make sure MongoDB is installed correctly >> start.bat
echo     pause >> start.bat
echo     exit /b 1 >> start.bat
echo ) >> start.bat
echo. >> start.bat
echo REM Start backend server >> start.bat
echo start cmd /k "cd %%~dp0backend ^&^& npm start" >> start.bat
echo timeout /t 5 >> start.bat
echo. >> start.bat
echo REM Start frontend >> start.bat
echo start cmd /k "cd %%~dp0frontend ^&^& npm start" >> start.bat
echo timeout /t 2 >> start.bat
echo. >> start.bat
echo REM Open browser >> start.bat
echo start http://localhost:3000 >> start.bat

REM Create desktop shortcut
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\Restaurant Management.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "%~dp0start.bat" >> CreateShortcut.vbs
echo oLink.WorkingDirectory = "%~dp0" >> CreateShortcut.vbs
echo oLink.Description = "Restaurant Management Software" >> CreateShortcut.vbs
echo oLink.IconLocation = "%~dp0frontend\public\favicon.ico" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript //nologo CreateShortcut.vbs
del CreateShortcut.vbs

echo [OK] Shortcuts created

echo.
echo ===================================================
echo    Installation Complete!
echo ===================================================
echo.
echo To start the software:
echo 1. Double-click the "Restaurant Management" shortcut on your desktop
echo 2. Wait for the browser to open automatically
echo.
echo For support or troubleshooting, please refer to README.txt
echo.
echo Press any key to exit...
pause >nul 