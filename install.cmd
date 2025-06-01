@echo off
setlocal

:: Navigate to the back-end directory and run setup script
echo Running setup script in back-end...
cd back-end
call setup.cmd
if errorlevel 1 (
    echo Failed to run setup script in back-end.
    exit /b 1
)

:: Navigate to the front-end directory and run npm install
echo Running npm install in front-end...
cd ../front-end
npm install
if errorlevel 1 (
    echo Failed to run npm install in front-end.
    exit /b 1
)

echo Setup completed successfully.
endlocal

