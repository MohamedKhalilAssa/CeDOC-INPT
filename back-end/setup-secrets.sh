#!/bin/bash

SECRETS_FILE="src/main/resources/application-secrets.properties"
EXAMPLE_FILE="src/main/resources/application-secrets.properties.example"

if [ ! -f "$SECRETS_FILE" ]; then
  echo "Creating $SECRETS_FILE from template..."
  cp "$EXAMPLE_FILE" "$SECRETS_FILE"
  echo "Done. Please update secrets inside $SECRETS_FILE."
else
  echo "$SECRETS_FILE already exists. Skipping."
fi
