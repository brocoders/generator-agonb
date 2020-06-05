const Generator = require('yeoman-generator');

class FrontendDeployScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;
    this.composeWith(require.resolve('../frontend-buildspec'), { destinationPath });
    this.fs.copy(
      this.templatePath(),
      this.destinationPath(destinationPath),
    );
  }
}

module.exports = FrontendDeployScripts;
