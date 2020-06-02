'use-strict';

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

class RailsModifyTemplate extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  writing() {
    const {
      applicationName,
      useWorker = false,
    } = this.config.getAll();
    const {
      destinationPath = '.',
    } = this.options;

    this.fs.copyTpl(
      [
        `${this.templatePath()}/**`,
        '!config/sidekiq.yml',
      ],
      this.destinationPath(destinationPath),
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
        , this.destinationPath(`${destinationPath}/config/sidekiq.yml`),
        { applicationName },
      );
    }
  }
}

module.exports = RailsModifyTemplate;
