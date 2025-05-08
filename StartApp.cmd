@echo off
setlocal enabledelayedexpansion

:: YOU SHOULD HAVE THE JAVA HOME VARIABLE ALREADY SET TO USE THIS

:: Build backend
echo Building backend...
cd back-end
call mvnw.cmd clean package -DskipTests
cd ..

:: Find the latest .jar file dynamically in the backend target directory
for /f "delims=" %%i in ('dir /b /a-d "back-end\target\*.jar"') do (
    set JAR_FILE=%%i
)

:: Check if a .jar file was found
if not defined JAR_FILE (
    echo No .jar file found in the backend directory.
    exit /b 1
)

:: Start frontend
echo Starting frontend...
start "Frontend" cmd /k "cd front-end && npm run dev"

:: Start backend
echo Starting backend with !JAR_FILE!...
start "Backend" cmd /k "cd back-end && java -jar target\!JAR_FILE!"

endlocal