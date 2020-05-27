'use-strict';

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

class RubyOnRails extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  writing() {
    const {
      applicationName,
      projectDestinationPath,
      useWorker = false,
    } = this.config.getAll();

    this.fs.copyTpl(
      [
        `${this.templatePath()}/**`,
        '!config/sidekiq.yml',
      ],
      this.destinationPath(projectDestinationPath),
      { applicationName },
      {},
      {
        globOptions: {
          dot: true,
        },
      },
    );

    if (useWorker) {
      this.fs.copyTpl(
        this.templatePath('config/sidekiq.yml')
        , this.destinationPath(`${projectDestinationPath}/config/sidekiq.yml`),
        { applicationName },
      );
    }
  }
}

module.exports = RubyOnRails;
