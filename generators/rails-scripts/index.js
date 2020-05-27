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
      useWorker,
    } = this.config.getAll();

    this.composeWith(require.resolve('../rails-modify-tpl'), {});

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(projectDestinationPath),
      { applicationName, useWorker },
    );
  }
}

module.exports = RubyOnRails;
