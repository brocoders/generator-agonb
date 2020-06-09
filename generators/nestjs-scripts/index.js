const Generator = require('yeoman-generator');

class NestJSScripts extends Generator {
  writing() {
    const {
      databaseType,
      applicationName,
      useWorker,
    } = this.config.getAll();
    const {
      destinationPath = './',
    } = this.options;

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(destinationPath),
      {
        applicationName,
        databaseType,
        useWorker,
      }
    );

    this.composeWith(require.resolve('../project-readme'), { destinationPath });
    // rename 'getHello' to 'getHealthCheck'
    this.spawnCommandSync('find', [`./${destinationPath}/src`, '-type', 'f', '-exec', 'sed', '-i.bak', 's/getHello/getHealthCheck/g', '{}', '\;']); // eslint-disable-line no-useless-escape
    // rename 'AppController' to 'HealthCheckController'
    this.spawnCommandSync('find', [`./${destinationPath}/src`, '-type', 'f', '-exec', 'sed', '-i.bak', 's/AppController/HealthCheckController/g', '{}', '\;']); // eslint-disable-line no-useless-escape
    // move 'app.controller.ts' to 'health-check.controller.ts'
    this.spawnCommandSync('mv', [`./${destinationPath}/src/app.controller.ts`, `${destinationPath}/src/health-check.controller.ts`]);
    // move 'app.controller.spec.ts' to 'health-check.controller.spec.ts'
    this.spawnCommandSync('mv', [`./${destinationPath}/src/app.controller.spec.ts`, `${destinationPath}/src/health-check.controller.spec.ts`]);
    // remove bak (backup) files
    this.spawnCommandSync('find', [`./${destinationPath}/src`, '-name', '*.bak', '-type', 'f', '-delete']);
  }
}

module.exports = NestJSScripts;
