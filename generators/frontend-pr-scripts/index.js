const Generator = require('yeoman-generator');

class FrontendPRScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;

    this.fs.copy(
      this.templatePath(),
      this.destinationPath(destinationPath),
    );
  }
}

module.exports = FrontendPRScripts;
