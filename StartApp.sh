#!/bin/bash


# Check Java
if ! command -v java &> /dev/null; then
  echo "Java not found. Please make sure JAVA_HOME is set and Java is installed."
  exit 1
fi

# Build backend
echo "Building backend..."
cd back-end || exit
./mvnw clean package -DskipTests
cd ..

# Find the latest .jar file dynamically (absolute path)
JAR_FILE=$(realpath back-end/target/*.jar | sort -V | tail -n 1)

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
gnome-terminal -- bash -c "java -jar $JAR_FILE; exec bash"

echo "Done."
