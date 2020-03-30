'use-strict'

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

class NodeJs extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list'
        , name: 'database_type'
        , message: 'Your database type'
        , choices: [{ value: 'postgres', name: 'PostgreSQL' }]
      }
    ])
  }

  configuring() {
    this.config.set('database_type', this.answers.database_type);
  }

  default() {
    const projectDestinationPath = this.config.get('project_destination_path');

    this.spawnCommandSync('nest', ['new', projectDestinationPath]);
  }

  writing() {
    const projectDestinationPath = this.config.get('project_destination_path');

    this.fs.copyTpl(
      this.templatePath('.gitignore.example')
      , this.destinationPath(`${projectDestinationPath}/.gitignore`)
    );

    this.spawnCommandSync('find', [`./${projectDestinationPath}/src`, '-type', 'f', '-exec', 'sed', '-i.bak', 's/getHello/getHealthCheck/g', '{}', '\;']); // eslint-disable-line no-useless-escape
    this.spawnCommandSync('find', [`./${projectDestinationPath}/src`, '-name', '*.bak', '-type', 'f', '-delete']);
  }

  end() {
    this.log('NodeJs app been successfully generated');
  }
}

module.exports = NodeJs;
