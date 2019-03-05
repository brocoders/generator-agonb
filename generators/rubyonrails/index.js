'use-strict';

const { execSync } = require('child_process')
const Generator = require('yeoman-generator')

const extraCommandsByOs = {
  mac() {
    this.spawnCommandSync()
  }
  , linux() {

  }
};

class RubyOnRails extends Generator {
  initializing() {
    const { handleError } = this.options;

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

  default() {
    const { projectDestinationPath } = this.options;
    const { ruby_version, database_type } = this.answers;

    execSync('/bin/bash --login');
    execSync(`rvm use ruby-${ruby_version}`);

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
    const { projectApplicationName: application_name, projectDestinationPath } = this.options;

    this.fs.copyTpl(
      this.templatePath('config/database.yml')
      , this.destinationPath(`${projectDestinationPath}/config/database.yml`)
    );

    this.fs.copyTpl(
      this.templatePath('config/puma_production.rb')
      , this.destinationPath(`${projectDestinationPath}/config/puma_production.rb`)
    );

    this.fs.copyTpl(
      this.templatePath('scripts/install_dependencies')
      , this.destinationPath(`${projectDestinationPath}/scripts/install_dependencies`)
      , { application_name }
    );

    this.fs.copyTpl(
      this.templatePath('scripts/stop_server')
      , this.destinationPath(`${projectDestinationPath}/scripts/stop_server`)
    );

    this.fs.copyTpl(
      this.templatePath('appspec.yml')
      , this.destinationPath(`${projectDestinationPath}/appspec.yml`)
    );

    this.fs.copyTpl(
      this.templatePath('run.tests.buildspec.yml')
      , this.destinationPath(`${projectDestinationPath}/run.tests.buildspec.yml`)
    );

    this.fs.copyTpl(
      this.templatePath('.ruby-gemset')
      , this.destinationPath(`${projectDestinationPath}/.ruby-gemset`)
      , { application_name }
    );

    this.fs.copyTpl(
      this.templatePath('.env.example')
      , this.destinationPath(`${projectDestinationPath}/.env.example`)
      , { db_name: application_name }
    );

    this.fs.copyTpl(
      this.templatePath('.env.example')
      , this.destinationPath(`${projectDestinationPath}/.env`)
      , { db_name: application_name }
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore')
      , this.destinationPath(`${projectDestinationPath}/.gitignore`)
    );

    this.fs.copyTpl(
      this.templatePath('app/controllers/health_check_controller.rb')
      , this.destinationPath(`${projectDestinationPath}/app/controllers/health_check_controller.rb`)
    );
  }
}

module.exports = RubyOnRails;
