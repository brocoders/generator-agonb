const Generator = require('yeoman-generator');
const fs = require('fs');

const {
  CRA_GENERATOR,
} = require('./../frontend/generator-types');

class FrontendScripts extends Generator {
  writing() {
    const { destinationPath } = this.options;
    const {
      enablePullRequest,
      projectGenerator,
    } = this.config.getAll();

    switch (projectGenerator) {
      case CRA_GENERATOR:
        this._craCopyExampleMultiEnv(destinationPath);
        this._craAddBuildMultiEnv(destinationPath);
        break;

      default:
        break;
    }

    this.composeWith(require.resolve('../frontend-deploy-scripts'), { destinationPath });
    this.composeWith(require.resolve('../project-readme'), {
      type: 'frontend',
      generator: CRA_GENERATOR,
      destinationPath,
    });
    if (enablePullRequest) {
      this.composeWith(require.resolve('../frontend-pr-scripts'), { destinationPath });
    }
  }

  _craCopyExampleMultiEnv(destinationPath) {
    const {
      apiUrl,
      domain,
    } = this.config.getAll();
    const envs = ['release', 'prod', 'dev'];
    for (const env of envs) {
      this.fs.copyTpl(
        this.templatePath('.env.example'),
        this.destinationPath(`${destinationPath}/.env.${env}`),
        { apiUrl, domain },
      );
    }
  }

  _craAddBuildMultiEnv(destinationPath) {
    this.spawnCommandSync('cd', [
      this.destinationPath(destinationPath),
      '&& npm i --save env-cmd',
    ], {
      shell: true,
    });

    const packageJsonRaw = fs.readFileSync(`${this.destinationPath(destinationPath)}/package.json`);
    const packageJson = JSON.parse(packageJsonRaw);
    packageJson.scripts = { ...packageJson.scripts };
    packageJson.scripts.build = 'env-cmd -f .env.${APP_ENV} react-scripts build';
    fs.writeFileSync(`${this.destinationPath(destinationPath)}/package.json`, JSON.stringify(packageJson, null, 2));
  }
}

module.exports = FrontendScripts;
