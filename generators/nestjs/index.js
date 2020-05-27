'use-strict'

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

class NestJS extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list'
        , name: 'databaseType'
        , message: 'Your database type'
        , choices: [{ value: 'postgres', name: 'PostgreSQL' }]
      }
    ])
  }

  configuring() {
    this.config.set('databaseType', this.answers.databaseType);
  }

  default() {
    const projectDestinationPath = this.config.get('projectDestinationPath');

    this.spawnCommandSync('npx', ['@nestjs/cli', 'new', projectDestinationPath]);
    this.spawnCommandSync('nox', ['@nestjs/cli', 'g', 'co', 'healthcheck' ]);
  }

  writing() {
    const destinationPath = this.config.get('projectDestinationPath');
    this.composeWith(require.resolve('../nestjs-scripts'), {
      destinationPath,
    });
  }

  end() {
    this.log('NodeJs app been successfully generated');
  }
}

module.exports = NestJS;
