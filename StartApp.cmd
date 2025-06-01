@echo off
setlocal enabledelayedexpansion


:: Build backend
echo Building backend...
cd back-end
call mvnw.cmd clean package -DskipTests
cd ..



:: Start frontend
echo Starting frontend...
start "Frontend" cmd /k "cd front-end && npm run dev"

:: Start backend
echo Starting backend with !JAR_FILE!...
start "Backend" cmd /k "cd back-end && mvnw.cmd spring-boot:run"

endlocal