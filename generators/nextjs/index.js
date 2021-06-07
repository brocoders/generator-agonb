'use-strict'

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

class NextJS extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
  }

  configuring() {
  }

  default() {
    const projectDestinationPath = this.config.get('projectDestinationPath');

    this.spawnCommandSync('npx', [
      'create-next-app',
      '--typescript',
      projectDestinationPath,
    ], { shell: true });
  }

  writing() {
    const destinationPath = this.config.get('projectDestinationPath');
    this.composeWith(require.resolve('../nextjs-scripts'), {
      destinationPath,
    });
  }

  end() {
    this.log('NextJS app been successfully generated');
  }
}

module.exports = NextJS;
