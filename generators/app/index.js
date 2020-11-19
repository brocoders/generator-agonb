'use-strict'

const Generator = require('yeoman-generator');
const { execSync } = require('child_process');

const { handleError } = require('../helpers');

class Agonb extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'projectTechnology',
        message: 'Your project technology',
        choices: [
          { value: 'nestjs', name: 'NestJS' },
          { value: 'frontend', name: 'Frontend Deployment' },
          { value: 'e2e', name: 'E2E project' },
        ],
      },
      {
        type: 'input',
        name: 'repositoryUrl',
        message: 'Your project repository url',
      }, {
        type: 'list',
        name: 'useWorker',
        message: 'Do you need worker instance?',
        when: ({ projectTechnology }) => ['nestjs'].includes(projectTechnology),
        choices: [
          {
            name: 'Yes', value: true,
          },
          {
            name: 'No', value: false,
          },
        ],
      },
    ]);
  }

  configuring() {
    let projectDestinationPath;
    let projectApplicationName;
    const {
      projectTechnology,
      repositoryUrl,
      useWorker = false,
    } = this.answers;

    try {
      [,,, projectDestinationPath] = repositoryUrl.match(/^(https:\/\/github|git@github)\.com(:|\/).+\/(.+)$/);

      projectDestinationPath = projectDestinationPath.replace(/\.git$/, '');

      if (projectTechnology === 'e2e') {
        projectApplicationName = projectDestinationPath;
      } else {
        [, projectApplicationName] = projectDestinationPath.match(/^(.+)-(back|front)end-app$/);
      }
    } catch (e) {
      throw new Error('Error during application directory/name parsing. Must be a <projectName>-(back|front)end-app');
    }

    if (!projectDestinationPath) throw new Error('Unable to extract project name');
    if (!projectApplicationName) throw new Error('Unable to extract application name');
    if (projectTechnology === 'nodejs' && /_|[A-Z]/g.test(projectApplicationName)) throw new Error('Ensure that application name will contain only lower case letters and dashes!');

    this.config.set('repositoryUrl', repositoryUrl);
    this.config.set('projectDestinationPath', projectDestinationPath);
    this.config.set('applicationName', projectApplicationName);
    this.config.set('projectTechnology', projectTechnology);
    this.config.set('useWorker', useWorker);
  }

  async writing() {
    const { projectTechnology } = this.answers;
    this.composeWith(require.resolve(`../${projectTechnology}`), { });
  }

  end() {
    const destinationPath = this.config.get('projectDestinationPath');
    const repositoryUrl = this.config.get('repositoryUrl');
    execSync(`mv .yo-rc.json ${destinationPath}/.yo-rc.json`);
    this.spawnCommandSync('cd', [
      destinationPath,
      '&& git init',
      `&& git remote add origin ${repositoryUrl}`,
    ], {
      shell: true,
    });
    this.log(`Added git origin - ${repositoryUrl}.
    You must configure '.gitignore', add files to git: 'git add .' and push`);
  }
}

module.exports = Agonb;
