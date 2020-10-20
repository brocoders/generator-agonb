#!/bin/bash

. ~/.nvm/nvm.sh

env_file_name='production.env'
database_type='<%= databaseType %>'
worker_is_enabled=<%= useWorker %>
app_region=$1
app_name=$2
prefix=$3

# include aws functions
source ./scripts/aws.sh

# also you can export env variables over write to file and read from file
echo NODE_ENV=production >> $env_file_name
echo TOKEN_EXPIRATION_HOUR=24 >> $env_file_name
echo DATABASE_SYNCHRONIZE=false >> $env_file_name
echo AUTH_JWT_SECRET=8db1b8d5158b97eb7b54bf002765323c04a5c1be86d34b44548637f6e7a358e160a078390957e5481b069761e8b8c1dcd0489cb0fa2ab302071d878634878161 >> $env_file_name
echo API_PREFIX=api/v1 >> $env_file_name
echo AUTH_JWT_TOKEN_EXPIRES_IN=3600 >> $env_file_name
echo DATABASE_PORT=5432 >> $env_file_name
echo DATABASE_TYPE=$database_type >> $env_file_name
echo AWS_S3_REGION=$app_region >> $env_file_name

if [[ $DEPLOYMENT_GROUP_NAME = *"WebApp"* ]]
then
    if [[ $worker_is_enabled = true ]]; then
      worker_ip=$(get_ssm_param "worker/ip")
      echo WORKER_HOST=redis://$worker_ip:6379/1 >> ${env_file_name}
    fi

    # if worker need build - move to parent scope after env
    npm run build

    pm2 start npm --no-automation --name ${app_name} -- run start:prod
fi

if [[ $DEPLOYMENT_GROUP_NAME = *"WorkerApp"* ]]
then
    echo TODO:implementStartCommandWorker
#    pm2 start npm --no-automation --name $app_name-worker -- run start:worker:prod
fi
