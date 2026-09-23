@echo off
setlocal
cd /d %~dp0
if not exist node_modules (
  echo Installing Capacitor packages...
  npm install
  if errorlevel 1 exit /b 1
)
if not exist android (
  call npm run cap:add:android
  if errorlevel 1 exit /b 1
)
call npm run cap:sync:android
if errorlevel 1 exit /b 1
cd android
call gradlew.bat assembleDebug
if errorlevel 1 exit /b 1
echo.
echo APK: android\app\build\outputs\apk\debug\app-debug.apk
endlocal
