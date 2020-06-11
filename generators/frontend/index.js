'use-strict';

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

const CRA_GENERATOR = 'cra';
const GATSBY_GENERATOR = 'gatsby';
const EMPTY_GENERATOR = 'none';

class FrontEndDeployment extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input'
        , name: 'apiUrl'
        , message: 'Your API url. For example https://<appName>.domain.com'
      },
      {
        type: 'list'
        , name: 'enablePullRequest'
        , message: 'Enable pull request deploy scripts ?'
        , choices: [
          { value: true, name: 'Yes' },
          { value: false, name: 'No' },
        ]
      }
      , {
        type: 'list'
        , name: 'projectGenerator'
        , message: 'Select frontend project generator'
        , choices: [
          { value: GATSBY_GENERATOR, name: 'Gatsby.' },
          { value: CRA_GENERATOR, name: 'Create react app' },
          { value: EMPTY_GENERATOR, name: 'Empty project. You must configure buildspec.yml manually' }
        ]
      }
    ]);
  }

  configuring() {
    const {
      apiUrl,
      projectGenerator,
      enablePullRequest,
    } = this.answers;

    this.config.set('apiUrl', apiUrl);
    this.config.set('applicationName', `${this.config.get('applicationName')}FrontEnd`);
    this.config.set('projectGenerator', projectGenerator);
    this.config.set('enablePullRequest', enablePullRequest);
  }

  default() {
    const {
      projectDestinationPath,
      projectGenerator,
      apiUrl,
    } = this.config.getAll();

    switch (projectGenerator) {
      case CRA_GENERATOR:
        this.spawnCommandSync('npx', ['create-react-app', projectDestinationPath]);
        this.fs.copyTpl(
          this.templatePath('.env.example'),
          this.destinationPath(`${projectDestinationPath}/.env`),
          { apiUrl },
        );
        break;

      case GATSBY_GENERATOR:
        this.spawnCommandSync('npx', ['gatsby-cli', 'new', projectDestinationPath]);
        break;

      default:
        break;
    }
  }

  async writing() {
    const destinationPath = this.config.get('projectDestinationPath');
    this.composeWith(require.resolve('../frontend-scripts'), {
      destinationPath,
    });
  }

  end() {
    this.log('Front end deployment been successfully generated');
  }
}

module.exports = FrontEndDeployment;
