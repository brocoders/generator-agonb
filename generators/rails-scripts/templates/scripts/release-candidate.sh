#!/bin/bash

env_file_name='.env'
app_region=$1
app_name=$2
worker_is_enabled=<%= useWorker %>

# echo Copy project specific variables to .env
# cat .env.development >> .env

gem install bundler -v 1.17.0
bundle install --without development test

export SECRET_KEY_BASE="$(bundle exec rake secret)"

if [[ $DEPLOYMENT_GROUP_NAME = *"-WebApp"* ]] && [[ $worker_is_enabled = true ]]
then
    if [[ $worker_is_enabled = true ]]; then
      worker_ip=$(get_ssm_param "worker/ip")
      echo WORKER_HOST=redis://$worker_ip:6379/1 >> ${env_file_name}
    fi

    # you can create custom config if config different
    bundle exec puma -C config/puma_production.rb
fi

if [[ $DEPLOYMENT_GROUP_NAME = *"WorkerApp"* ]]
then
    echo REDIS_URL=redis://127.0.0.1:6379/1 >> .env

    # you can create custom config if config different
    # start sidekiq -t 60 - time pause for stop process
    bundle exec sidekiq -d -L log/sidekiq.log -C config/sidekiq.yml -P tmp/sidekiq.pid -e production -t 60
fi
