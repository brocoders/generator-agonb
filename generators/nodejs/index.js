'use-strict'

const Generator = require('yeoman-generator');

class NodeJs extends Generator {
  initializing() {
    const { handleError, projectDestinationPath } = this.options;
    this.projectDestinationPath = projectDestinationPath;

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

  default() {
    const { projectDestinationPath } = this.options;

    this.spawnCommandSync('nest', ['new', projectDestinationPath]);
  }

  writing() {
    const { projectApplicationName: application_name } = this.options;
    const { database_type } = this.answers;

    this.fs.copyTpl(
      this.templatePath('scripts/install_dependencies')
      , this.destinationPath(`${this.projectDestinationPath}/scripts/install_dependencies`)
      , {
        application_name: this.projectApplicationName
        , database_type
      }
    );

    this.fs.copyTpl(
      this.templatePath('scripts/stop_server')
      , this.destinationPath(`${this.projectDestinationPath}/scripts/stop_server`)
      , { application_name }
    );

    this.fs.copyTpl(
      this.templatePath('appspec.yml')
      , this.destinationPath(`${this.projectDestinationPath}/appspec.yml`)
    );

    this.fs.copyTpl(
      this.templatePath('run.tests.buildspec.yml')
      , this.destinationPath(`${this.projectDestinationPath}/run.tests.buildspec.yml`)
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore')
      , this.destinationPath(`${this.projectDestinationPath}/.gitignore`)
    );

    this.spawnCommandSync('find', [`./${this.projectDestinationPath}/src`, '-type', 'f', '-exec', 'sed', '-i.bak', 's/getHello/getHealthCheck/g', '{}', '\;']) // eslint-disable-line no-useless-escape
    this.spawnCommandSync('find', [`./${this.projectDestinationPath}/src`, '-name', '*.bak', '-type', 'f', '-delete'])
  }
}

module.exports = NodeJs;
