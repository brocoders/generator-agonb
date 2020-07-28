#!/bin/bash

. ~/.nvm/nvm.sh

env_file_name='production.env'
app_region=$1
app_name=$2
prefix=$3
worker_is_enabled=<%= useWorker %>

npm i -g @nestjs/cli typescript ts-node
npm i

# include aws functions
source ./aws.sh

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
