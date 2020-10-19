const Generator = require('yeoman-generator');

const {
  CRA_GENERATOR,
} = require('./../frontend/generator-types');

const envs = ['release', 'prod', 'dev'];

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
        break;

      default:
        this._copyExampleMultiEnv(destinationPath, projectGenerator);
        break;
    }

    this.composeWith(require.resolve('../frontend-deploy-scripts'), { destinationPath });
    this.composeWith(require.resolve('../project-readme'), {
      type: 'frontend',
      generator: projectGenerator,
      destinationPath,
    });
    if (enablePullRequest) {
      this.composeWith(require.resolve('../frontend-pr-scripts'), { destinationPath });
    }
  }

  _copyExampleMultiEnv(destinationPath, projectGenerator) {
    for (const env of envs) {
      this.fs.copyTpl(
        this.templatePath(`${projectGenerator}/.env.example`),
        this.destinationPath(`${destinationPath}/.env.${env}`),
        {},
      );
    }
  }

  _craCopyExampleMultiEnv(destinationPath) {
    const {
      apiUrl,
      domain,
    } = this.config.getAll();
    let payload = {};
    for (const env of envs) {
      if (env === 'dev') {
        payload = { apiUrl, domain };
      } else {
        payload = { apiUrl: '', domain: '' };
      }
      this.fs.copyTpl(
        this.templatePath(`${CRA_GENERATOR}/.env.example`),
        this.destinationPath(`${destinationPath}/.env.${env}`),
        payload,
      );
    }
  }
}

module.exports = FrontendScripts;
