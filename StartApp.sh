#!/bin/bash

# YOU SHOULD HAVE JAVA_HOME SET TO USE THIS

# Build backend
echo "Building backend..."
cd back-end || exit
./mvnw clean package -DskipTests
cd ..

# Find the latest .jar file dynamically in the backend target directory
JAR_FILE=$(ls back-end/target/*.jar | sort -V | tail -n 1)

# Check if a .jar file was found
if [ -z "$JAR_FILE" ]; then
  echo "No .jar file found in the backend directory."
  exit 1
fi

# Start frontend
echo "Starting frontend..."
gnome-terminal -- bash -c "cd front-end && npm run dev; exec bash"

# Start backend with the .jar file
echo "Starting backend with $JAR_FILE..."
gnome-terminal -- bash -c "cd back-end && java -jar $JAR_FILE; exec bash"

echo "Done."