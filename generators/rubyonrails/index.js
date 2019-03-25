'use-strict';

const { execSync } = require('child_process');
const Generator = require('yeoman-generator');

const { handleError } = require('../../helpers');

class RubyOnRails extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
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
    const projectDestinationPath = this.config.get('project_destination_path');
    const database_type = this.config.get('database_type');

    execSync('/bin/bash --login');
    execSync('rvm use ruby-2.5.3');

    this.spawnCommandSync(
      'rails'
      , [
        'new'
        , projectDestinationPath
        , `--database=${database_type}`
        , '--api'
        , '--skip-git'
        , '--skip-yarn'
        , '--skip-coffee'
        , '--skip-javascript'
        , '--skip-bundle'
        , '--skip-turbolinks'
        , '--skip-test'
        , '--skip'
        , `--template=${this.templatePath('template.rb')}`
      ]
    );
  }

  writing() {
    const { application_name, project_destination_path } = this.config.getAll();

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
      this.templatePath('.gitignore.example')
      , this.destinationPath(`${project_destination_path}/.gitignore`)
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
