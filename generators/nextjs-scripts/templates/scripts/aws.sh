#!/bin/bash

env_region=$(cat /root/.env-region)
app_name=$(cat /root/.env-app-name)
env_stage=$(cat /root/.env-stage)

get_ssm_param() {
    param_name=$1
    echo $(aws ssm get-parameter \
        --region ${env_region} \
        --name /${app_name}/${env_stage}/${param_name} \
        --with-decryption \
        --query Parameter.Value \
        --output text
    )
}

# load base
init_aws_env() {
    
}
