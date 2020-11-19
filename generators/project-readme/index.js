const Generator = require('yeoman-generator');
const { existsSync, unlinkSync } = require('fs');

class ProjectREADME extends Generator {
  writing() {
    const {
      destinationPath = '.',
      generator,
      type,
    } = this.options;

    if (existsSync(`${this.destinationPath(destinationPath)}/README.md`)) {
      unlinkSync(`${this.destinationPath(destinationPath)}/README.md`);
    }

    switch (type) {
      case 'backend':
        this.fs.copyTpl(
          this.templatePath('backend/README.md'),
          this.destinationPath(`${destinationPath}/README.md`),
        );
        break;

      case 'frontend':
        this.fs.copyTpl(
          this.templatePath('frontend/README.md'),
          this.destinationPath(`${destinationPath}/README.md`),
          { generator },
        );
        break;
    }
  }
}

module.exports = ProjectREADME;
