'use-strict';

const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');
const {
  CRA_GENERATOR,
  EMPTY_GENERATOR,
  GATSBY_GENERATOR,
} = require('./generator-types');

class FrontEndDeployment extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input'
        , name: 'apiUrl'
        , message: 'Backend API url. For example https://<appName>.domain.com . Ask in DevOps team or backend project backend developers or ignore'
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
      },
      {
        type: 'input'
        , name: 'domain'
        , message: 'Frontend domain ( without scheme ), ask in DevOps team or skip and fill later'
      }
    ]);
  }

  configuring() {
    const {
      apiUrl,
      projectGenerator,
      enablePullRequest,
      domain,
    } = this.answers;

    this.config.set('apiUrl', apiUrl);
    this.config.set('projectGenerator', projectGenerator);
    this.config.set('enablePullRequest', enablePullRequest);
    this.config.set('domain', domain);
  }

  default() {
    const {
      projectDestinationPath,
      projectGenerator,
    } = this.config.getAll();

    switch (projectGenerator) {
      case CRA_GENERATOR:
        this.spawnCommandSync('npx', ['create-react-app', projectDestinationPath]);
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
