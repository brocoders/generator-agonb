const Generator = require('yeoman-generator');

class PutScripts extends Generator {
  writing() {
    const { projectTechnology } = this.config.getAll();
    this.composeWith(require.resolve(`../${projectTechnology}-scripts`), {
      destinationPath: '.',
    });
  }
}

module.exports = PutScripts;
