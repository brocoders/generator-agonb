const Generator = require('yeoman-generator');

class FrontendGeneratorBuildspec extends Generator {
  writing() {
    const projectGenerator = this.config.get('projectGenerator');
    const { destinationPath } = this.options;

    this.fs.copyTpl(
      this.templatePath(`${projectGenerator}/buildspec.yml`),
      this.destinationPath(`${destinationPath}/buildspec.yml`),
    );
  }
}

module.exports = FrontendGeneratorBuildspec;
