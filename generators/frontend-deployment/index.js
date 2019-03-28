'use-strict';

const Generator = require('yeoman-generator');

const { handleError } = require('../../helpers');

class FrontEndDeployment extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input'
        , name: 'api_url'
        , message: 'Your API url'
      }
    ]);
  }

  configuring() {
    const { api_url } = this.answers;

    this.config.set('api_url', api_url);
    this.config.set('application_name', `${this.config.get('application_name')}FrontEnd`);
  }

  async writing() {
    this.fs.copyTpl(
      this.templatePath('.env.example')
      , this.destinationPath(`${this.config.get('project_destination_path')}/.env.example`)
      , {
        api_url: this.config.get('api_url')
      }
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore.example')
      , this.destinationPath(`${this.config.get('project_destination_path')}/.gitignore`)
    );
  }

  end() {
    this.log('Front end deployment been successfully generated');
  }
}

module.exports = FrontEndDeployment;
