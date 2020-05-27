route "scope :api do resources :health_check, only: [:index] end"

environment 'config.logger = Logger.new(STDOUT)'

if ENV['ENABLE_WORKER'] == 'true'
    environment 'config.active_job.queue_adapter = :sidekiq'
    gem 'sidekiq'
end

initializer 'carrierwave.rb', <<-CODE
  require 'carrierwave/storage/fog'

  CarrierWave.configure do |config|
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
        provider: 'AWS',
        aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
        region: ENV['AWS_S3_REGION']
    }
    config.fog_public = true
    config.fog_directory = ENV['AWS_DEFAULT_S3_BUCKET']
  end
CODE

#git_source(:github) do |repo_name|
#  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
#  "https://github.com/#{repo_name}.git"
#end

gem 'pg'
gem 'active_model_serializers'
gem 'dotenv-rails'
gem 'carrierwave'
gem 'mini_magick'
gem 'fog-aws'

gem_group :test do
  gem 'rspec-rails'
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'email_spec'
end

gem_group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
end

gem_group :development, :test do
  gem 'letter_opener'
end
