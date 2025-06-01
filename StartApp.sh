#!/bin/bash

# Check Java
if ! command -v java &> /dev/null; then
  echo "Java not found. Please install Java and set JAVA_HOME if needed."
  exit 1
fi

# Check Maven or mvnw
if [ -f "back-end/mvnw" ]; then
  MVN_CMD="./mvnw"
elif command -v mvn &> /dev/null; then
  MVN_CMD="mvn"
else
  echo " Maven not found and no mvnw wrapper in back-end."
  exit 1
fi

# Clean backend build
echo "Cleaning backend build..."
cd back-end || exit 1
$MVN_CMD clean

# Start backend with spring-boot:run (supports DevTools)
echo " Starting backend with DevTools..."
gnome-terminal -- bash -c "$MVN_CMD spring-boot:run; exec bash"
cd ..

# Start frontend
echo "Starting frontend..."
gnome-terminal -- bash -c "cd front-end && npm run dev; exec bash"

echo "Dev environment launched successfully."
