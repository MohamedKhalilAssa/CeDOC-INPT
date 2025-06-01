#!/bin/bash

# run setup script in backend
cd back-end
./setup-secrets.sh
cd ..

# install dependencies in frontend
cd front-end
npm install
cd ..
