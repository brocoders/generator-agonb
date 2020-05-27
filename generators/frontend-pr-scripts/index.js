const Generator = require('yeoman-generator');

class UpdateScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;

    this.fs.copy(
      this.templatePath(),
      this.destinationPath(destinationPath),
    );
  }
}

module.exports = UpdateScripts;
