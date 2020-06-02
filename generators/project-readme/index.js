const Generator = require('yeoman-generator');
const { existsSync, unlinkSync } = require('fs');

// TODO: add using in frontend, e2e generators
class ProjectREADME extends Generator {
  writing() {
    const {
      destinationPath = '.',
    } = this.options;

    if (existsSync(`${this.destinationPath(destinationPath)}/README.md`)) {
      unlinkSync(`${this.destinationPath(destinationPath)}/README.md`);
    }

    this.fs.copyTpl(
      this.templatePath('backend/README.md'),
      this.destinationPath(`${destinationPath}/README.md`),
    );
  }
}

module.exports = ProjectREADME;
