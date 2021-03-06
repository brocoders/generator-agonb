#!/bin/bash

env_region=$(cat ~/.env-region)
app_name=$(cat ~/.env-app-name)
env_stage=$(cat ~/.env-stage)

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
    db_name=$(get_ssm_param "db/name")
    db_user=$(get_ssm_param "db/user")
    db_password=$(get_ssm_param "db/password")
    db_host=$(get_ssm_param "db/host")
    s3_name=$(get_ssm_param "s3/name")
    s3_base_url=$(get_ssm_param "s3/domain")

    # also you can export env variables over write to file and read from file
    export DATABASE_NAME=$db_name
    export DATABASE_USERNAME=$db_user
    export DATABASE_PASSWORD=$db_password
    export DATABASE_HOST=$db_host
    export AWS_DEFAULT_S3_BUCKET=$s3_name
    export AWS_DEFAULT_S3_URL=$s3_base_url
    export AWS_S3_REGION=$env_region
}
