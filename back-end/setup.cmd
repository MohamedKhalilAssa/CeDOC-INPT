@echo off
setlocal

set "SECRETS_FILE=src\main\resources\application-secrets.properties"
set "EXAMPLE_FILE=src\main\resources\application-secrets.properties.example"

if not exist "%SECRETS_FILE%" (
    echo Creating %SECRETS_FILE% from template...
    copy "%EXAMPLE_FILE%" "%SECRETS_FILE%" > nul
    echo Done. Please update secrets inside %SECRETS_FILE%.
) else (
    echo %SECRETS_FILE% already exists. Skipping.
)

endlocal

::this script should be executed the first time you clone this project to ensure the secrets file
::gets duplicated into the right name, unless you want to do it alone