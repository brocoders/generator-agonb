const Generator = require('yeoman-generator');

class FrontendScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;
    const { enablePullRequest } = this.config.getAll();
    this.composeWith(require.resolve('../frontend-deploy-scripts'), { destinationPath });
    if (enablePullRequest) {
      this.composeWith(require.resolve('../frontend-pr-scripts'), { destinationPath });
    }
  }
}

module.exports = FrontendScripts;
