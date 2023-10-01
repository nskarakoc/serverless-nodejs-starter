#!/bin/bash
set -e

if [ $# -ne 1 ]; then
  echo "Usage: ./deploy.sh <environment_name>"
  exit 1
fi

env_name=$1

if [ -f ".env.$env_name" ]; then
  echo "Detected .env.$env_name file, moving to .env.temp file"
  # Move .env file to temp env file to avoid overriding
  mv .env.$env_name .env.temp
fi

# Deploy
npx serverless deploy --stage $env_name

if [ -f ".env.temp" ]; then
  echo "Detected .env.temp file, moving to .env.$env_name file"
  # Move .env file to temp env file to avoid overriding
  mv .env.temp .env.$env_name
fi
