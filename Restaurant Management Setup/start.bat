@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo    Restaurant Management Software
echo ===================================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB service...
net start MongoDB >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Starting MongoDB service...
    net start MongoDB
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to start MongoDB service
        echo Please make sure MongoDB is installed correctly
        pause
        exit /b 1
    )
)
echo [OK] MongoDB is running
echo.

REM Store the current directory
set "CURRENT_DIR=%~dp0"

REM Start backend server
echo Starting backend server...
cd "%CURRENT_DIR%backend"
start "Backend Server" cmd /k "echo Backend Server Running... && npm start"
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to start backend server
    pause
    exit /b 1
)
echo [OK] Backend server started
echo.

REM Start frontend server
echo Starting frontend server...
cd "%CURRENT_DIR%frontend"
start "Frontend Server" cmd /k "echo Frontend Server Running... && npm run dev"
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to start frontend server
    pause
    exit /b 1
)
echo [OK] Frontend server started
echo.

REM Wait for servers to start
echo Waiting for servers to initialize...
timeout /t 10 /nobreak >nul

REM Open browser
echo Opening application in browser...
start http://localhost:3000

echo.
echo ===================================================
echo    Software Started Successfully!
echo ===================================================
echo.
echo The application should open in your default browser.
echo If it doesn't, please visit: http://localhost:3000
echo.
echo Keep this window open while using the software.
echo To stop the software, close all command prompt windows.
echo.
echo Press any key to close this window...
pause >nul 