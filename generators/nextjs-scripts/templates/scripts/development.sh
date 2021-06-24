#!/bin/bash

. ~/.nvm/nvm.sh

app_name=$(cat ~/.env-app-name)
env_type=$(cat ~/.env-type)

# include aws functions
source ./scripts/aws.sh

# also you can export env variables over write to file and read from file
export NODE_ENV=production

if [[ $env_type = "WebApp" ]]
then
    npm run build

    pm2 start npm --no-automation --name ${app_name} -- run start:prod
fi
