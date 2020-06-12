const Generator = require('yeoman-generator');

const {
  CRA_GENERATOR,
} = require('./../frontend/generator-types');

class FrontendScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;
    const { enablePullRequest, apiUrl, projectGenerator } = this.config.getAll();
    switch (projectGenerator) {
      case CRA_GENERATOR:
        this.fs.copyTpl(
          this.templatePath('.env.example'),
          this.destinationPath(`${destinationPath}/.env`),
          { apiUrl },
        );
        break;

      default:
        break;
    }

    this.composeWith(require.resolve('../frontend-deploy-scripts'), { destinationPath });
    if (enablePullRequest) {
      this.composeWith(require.resolve('../frontend-pr-scripts'), { destinationPath });
    }
  }
}

module.exports = FrontendScripts;
