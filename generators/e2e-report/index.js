const Generator = require('yeoman-generator');

class E2EReportConfigInject extends Generator {
  async writing() {
    const {
      directoryName = '.'
    } = this.options;
    const { e2eType } = this.config.getAll();
    this.fs.copy(
      this.templatePath(e2eType),
      this.destinationPath(directoryName),
    );
  }

  end() {
    this.log('Configuration files for report added successfully');
  }
}

module.exports = E2EReportConfigInject;
