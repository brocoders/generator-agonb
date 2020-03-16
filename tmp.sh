#!/bin/bash

app_name='example'
app_region='us-west-2'

get_ssm_param() {
    param_name=$1
    value=$(aws ssm get-parameters --region ${app_region} --names ${app_name}-${param_name} --with-decryption --query Parameters[0].Value)
    echo $value | sed -e 's/^"//' -e 's/"$//'
}


worker_is_enable=$(get_ssm_param "CarierWaveS3BucketNameSSM")

if [[ $worker_is_enable = "true" ]]
then
 echo worker is enabled
fi
