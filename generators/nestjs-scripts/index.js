const Generator = require('yeoman-generator');

class UpdateScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;
    const {
      databaseType,
      applicationName,
      useWorker,
      projectDestinationPath,
    } = this.config.getAll();

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(destinationPath),
      {
        applicationName,
        databaseType,
        useWorker,
      }
    );

    this.spawnCommandSync('find', [`./${projectDestinationPath}/src`, '-type', 'f', '-exec', 'sed', '-i.bak', 's/getHello/getHealthCheck/g', '{}', '\;']); // eslint-disable-line no-useless-escape
    this.spawnCommandSync('find', [`./${projectDestinationPath}/src`, '-name', '*.bak', '-type', 'f', '-delete']);
  }
}

module.exports = UpdateScripts;
