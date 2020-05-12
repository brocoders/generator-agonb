'use-strict';

const { execSync } = require('child_process');
const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

const RUBY_MAJOR = 2;
const RUBY_MINOR = 6;
const RUBY_PATCH = 6;
const RUBY_VERSION = `${RUBY_MAJOR}.${RUBY_MINOR}.${RUBY_PATCH}`;
const RUBY_INSTALL_CMD = `rvm install ruby-${RUBY_VERSION}`;

class RubyOnRails extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));

    const currentInstalledRuby = execSync('rvm current');
    const [ major, minor, patch ] = currentInstalledRuby
      .toString()
      .split('-')[1]
      .split('.')
      .map(str => parseInt(str, 10));
    const isRequiredVersion = RUBY_MAJOR === major
      && RUBY_MINOR === minor
      && RUBY_PATCH === patch;

    if (isRequiredVersion === false) {
      throw new Error(`Generator require only ${RUBY_VERSION}.
      Install ruby ${RUBY_INSTALL_CMD}`);
    }
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list'
        , name: 'database_type'
        , message: 'Your database type'
        , choices: [{ value: 'postgresql', name: 'PostregSQL' }]
      }
    ]);
  }

  configuring() {
    const { database_type } = this.answers;

    this.config.set('database_type', database_type);
  }

  default() {
    const {
      project_destination_path,
      database_type,
      use_worker = false,
    } = this.config.getAll();
    const templateEnv = `ENABLE_WORKER=${use_worker}`;

    execSync('/bin/bash --login');
    execSync(`rvm use ruby-${RUBY_VERSION}`);

    execSync(`${templateEnv} rails new ${project_destination_path} \
    --database=${database_type} \
    --api \
    --skip-yarn \
    --skip-coffee \
    --skip-javascript \
    --skip-bundle \
    --skip-turbolinks \
    --skip-test \
    --skip \
    --template=${this.templatePath('template.rb')}`);
  }

  async writing() {
    const {
      application_name,
      project_destination_path,
      use_worker = false,
    } = this.config.getAll();

    if (use_worker) {
      this.fs.copyTpl(
        this.templatePath('config/sidekiq.yml')
        , this.destinationPath(`${project_destination_path}/config/sidekiq.yml`)
      );
    }

    this.fs.copyTpl(
      this.templatePath('config/database.yml')
      , this.destinationPath(`${project_destination_path}/config/database.yml`)
    );

    this.fs.copyTpl(
      this.templatePath('config/puma_production.rb')
      , this.destinationPath(`${project_destination_path}/config/puma_production.rb`)
    );

    this.fs.copyTpl(
      this.templatePath('.ruby-gemset')
      , this.destinationPath(`${project_destination_path}/.ruby-gemset`)
      , { application_name }
    );

    this.fs.copyTpl(
      this.templatePath('.env.example')
      , this.destinationPath(`${project_destination_path}/.env.example`)
      , { application_name }
    );

    this.fs.copyTpl(
      this.templatePath('.env.example')
      , this.destinationPath(`${project_destination_path}/.env`)
      , { application_name }
    );

    this.fs.copyTpl(
      this.templatePath('app/controllers/health_check_controller.rb')
      , this.destinationPath(`${project_destination_path}/app/controllers/health_check_controller.rb`)
    );
  }

  end() {
    this.log('Ruby On Rails app been successfully generated');
  }
}

module.exports = RubyOnRails;
