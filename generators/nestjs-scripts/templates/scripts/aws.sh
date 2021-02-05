#!/bin/bash

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

    # also you can export env variables over write to file and read from file
    export DATABASE_NAME=$db_name
    export DATABASE_USERNAME=$db_user
    export DATABASE_PASSWORD=$db_password
    export DATABASE_HOST=$db_host
    export ACCESS_KEY_ID=$user_access_key_id
    export SECRET_ACCESS_KEY=$user_secret_access_key
    export AWS_DEFAULT_S3_BUCKET=$s3_name
    export AWS_DEFAULT_S3_URL=$s3_base_url
    export AWS_S3_REGION=$app_region
}
