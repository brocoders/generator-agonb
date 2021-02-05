#!/bin/bash

. ~/.nvm/nvm.sh

database_type='<%= databaseType %>'
worker_is_enabled=<%= useWorker %>

env_stage=$(cat /root/.env-stage)
env_region=$(cat /root/.env-region)
app_name=$(cat /root/.env-app-name)
env_type=$(cat /root/.env-type)

# include aws functions
source ./scripts/aws.sh

# also you can export env variables over write to file and read from file
export NODE_ENV=production
export TOKEN_EXPIRATION_HOUR=24
export DATABASE_SYNCHRONIZE=false
export AUTH_JWT_SECRET=8db1b8d5158b97eb7b54bf002765323c04a5c1be86d34b44548637f6e7a358e160a078390957e5481b069761e8b8c1dcd0489cb0fa2ab302071d878634878161
export API_PREFIX=api/v1
export AUTH_JWT_TOKEN_EXPIRES_IN=3600
export DATABASE_PORT=5432
export DATABASE_TYPE=$database_type
export AWS_S3_REGION=$env_region

if [[ $env_type = "WebApp" ]]
then
    if [[ $worker_is_enabled = true ]]; then
      worker_ip=$(get_ssm_param "worker/ip")
      export WORKER_HOST=redis://$worker_ip:6379/1
    fi

    # if worker need build - move to parent scope after env
    npm run build

    pm2 start npm --no-automation --name ${app_name} -- run start:prod
fi

if [[ $env_type = "WorkerApp" ]]
then
    echo TODO:implementStartCommandWorker
#    pm2 start npm --no-automation --name $app_name-worker -- run start:worker:prod
fi
