const Generator = require('yeoman-generator');

class NextJSScripts extends Generator {
  writing() {
    const {
      applicationName,
    } = this.config.getAll();
    const {
      destinationPath = './',
    } = this.options;

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(destinationPath),
      {},
    );

    this.composeWith(require.resolve('../project-readme'), {
      type: 'nextjs',
      destinationPath,
    });
  }
}

module.exports = NextJSScripts;
