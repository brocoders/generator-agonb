const Generator = require('yeoman-generator');

class UpdateScripts extends Generator {
  writing() {
    const { projectTechnology } = this.config.getAll();
    this.composeWith(require.resolve(`../${projectTechnology}-scripts`) ,{
      destinationPath: '.',
    });
  }
}

module.exports = UpdateScripts;
