'use-strict';

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

class RailsScripts extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  writing() {
    const {
      applicationName,
      useWorker,
    } = this.config.getAll();
    const {
      destinationPath = '.',
    } = this.options;

    this.composeWith(require.resolve('../rails-modify-tpl'), { destinationPath });

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(destinationPath),
      { applicationName, useWorker },
    );

    this.composeWith(require.resolve('../project-readme'), {
      destinationPath,
      type: 'backend',
    });
  }
}

module.exports = RailsScripts;
