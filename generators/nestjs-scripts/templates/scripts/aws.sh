#!/bin/bash

env_file_name='production.env'
database_type='<%= databaseType %>'

get_ssm_param() {
    param_name=$1
    echo $(aws ssm get-parameter \
        --region ${app_region} \
        --name /${app_name}/${prefix}/${param_name} \
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
    user_access_key_id=$(get_ssm_param "iam/access-key-id")
    user_secret_access_key=$(get_ssm_param "iam/secret-access-key")

    [[ -f ${env_file_name} ]] && rm ${env_file_name} || echo ${env_file_name} is not exists yet

    # also you can export env variables over write to file and read from file
    echo DATABASE_NAME=$db_name >> $env_file_name
    echo DATABASE_USERNAME=$db_user >> $env_file_name
    echo DATABASE_PASSWORD=$db_password >> $env_file_name
    echo DATABASE_HOST=$db_host >> $env_file_name
    echo ACCESS_KEY_ID=$user_access_key_id >> $env_file_name
    echo SECRET_ACCESS_KEY=$user_secret_access_key >> $env_file_name
    echo AWS_DEFAULT_S3_BUCKET=$s3_name >> $env_file_name
    echo AWS_DEFAULT_S3_URL=$s3_base_url >> $env_file_name
    echo AWS_S3_REGION=$app_region >> $env_file_name
}
