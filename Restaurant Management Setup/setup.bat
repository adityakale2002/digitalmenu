@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo    Restaurant Management Software Setup
echo ===================================================
echo.
echo This setup will help you install the Restaurant Management Software.
echo.
echo Press any key to continue...
pause >nul

REM Check if running as administrator
net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] This setup requires administrator privileges.
    echo Please right-click on setup.bat and select "Run as administrator"
    pause
    exit /b 1
)

REM Create installation directory
set "INSTALL_DIR=%ProgramFiles%\Restaurant Management"
echo Creating installation directory...
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

REM Copy files
echo Copying files...
xcopy /E /I /Y "%~dp0*" "%INSTALL_DIR%"

REM Create desktop shortcut
echo Creating desktop shortcut...
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateShortcut.vbs"
echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\Restaurant Management.lnk" >> "%TEMP%\CreateShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateShortcut.vbs"
echo oLink.TargetPath = "%INSTALL_DIR%\start.bat" >> "%TEMP%\CreateShortcut.vbs"
echo oLink.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\CreateShortcut.vbs"
echo oLink.Description = "Restaurant Management Software" >> "%TEMP%\CreateShortcut.vbs"
echo oLink.IconLocation = "%INSTALL_DIR%\frontend\public\favicon.ico" >> "%TEMP%\CreateShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateShortcut.vbs"
cscript //nologo "%TEMP%\CreateShortcut.vbs"
del "%TEMP%\CreateShortcut.vbs"

REM Create start menu shortcut
echo Creating start menu shortcut...
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateStartMenuShortcut.vbs"
echo sLinkFile = oWS.SpecialFolders("StartMenu") ^& "\Programs\Restaurant Management.lnk" >> "%TEMP%\CreateStartMenuShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateStartMenuShortcut.vbs"
echo oLink.TargetPath = "%INSTALL_DIR%\start.bat" >> "%TEMP%\CreateStartMenuShortcut.vbs"
echo oLink.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\CreateStartMenuShortcut.vbs"
echo oLink.Description = "Restaurant Management Software" >> "%TEMP%\CreateStartMenuShortcut.vbs"
echo oLink.IconLocation = "%INSTALL_DIR%\frontend\public\favicon.ico" >> "%TEMP%\CreateStartMenuShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateStartMenuShortcut.vbs"
cscript //nologo "%TEMP%\CreateStartMenuShortcut.vbs"
del "%TEMP%\CreateStartMenuShortcut.vbs"

REM Create uninstaller
echo Creating uninstaller...
echo @echo off > "%INSTALL_DIR%\uninstall.bat"
echo echo Uninstalling Restaurant Management Software... >> "%INSTALL_DIR%\uninstall.bat"
echo echo Please wait... >> "%INSTALL_DIR%\uninstall.bat"
echo timeout /t 2 >> "%INSTALL_DIR%\uninstall.bat"
echo del /F /Q "%INSTALL_DIR%\*.*" >> "%INSTALL_DIR%\uninstall.bat"
echo rd /S /Q "%INSTALL_DIR%" >> "%INSTALL_DIR%\uninstall.bat"
echo del "%%USERPROFILE%%\Desktop\Restaurant Management.lnk" >> "%INSTALL_DIR%\uninstall.bat"
echo del "%%APPDATA%%\Microsoft\Windows\Start Menu\Programs\Restaurant Management.lnk" >> "%INSTALL_DIR%\uninstall.bat"
echo echo Uninstallation complete. >> "%INSTALL_DIR%\uninstall.bat"
echo pause >> "%INSTALL_DIR%\uninstall.bat"

REM Create uninstall shortcut
echo Creating uninstall shortcut...
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateUninstallShortcut.vbs"
echo sLinkFile = oWS.SpecialFolders("StartMenu") ^& "\Programs\Uninstall Restaurant Management.lnk" >> "%TEMP%\CreateUninstallShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateUninstallShortcut.vbs"
echo oLink.TargetPath = "%INSTALL_DIR%\uninstall.bat" >> "%TEMP%\CreateUninstallShortcut.vbs"
echo oLink.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\CreateUninstallShortcut.vbs"
echo oLink.Description = "Uninstall Restaurant Management Software" >> "%TEMP%\CreateUninstallShortcut.vbs"
echo oLink.IconLocation = "%INSTALL_DIR%\frontend\public\favicon.ico" >> "%TEMP%\CreateUninstallShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateUninstallShortcut.vbs"
cscript //nologo "%TEMP%\CreateUninstallShortcut.vbs"
del "%TEMP%\CreateUninstallShortcut.vbs"

echo.
echo ===================================================
echo    Setup Complete!
echo ===================================================
echo.
echo The software has been installed to:
echo %INSTALL_DIR%
echo.
echo You can start the software by:
echo 1. Double-clicking the desktop shortcut
echo 2. Using the Start Menu
echo.
echo To uninstall the software:
echo 1. Use the Uninstall shortcut in the Start Menu
echo 2. Or run uninstall.bat from the installation directory
echo.
echo Press any key to exit...
pause >nul 