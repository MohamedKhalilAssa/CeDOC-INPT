#!/bin/bash

# run setup script in backend
cd backend
./setup-secrets.sh
cd ..

# install dependencies in frontend
cd frontend
npm install
cd ..
