'use-strict'

const Generator = require('yeoman-generator');
const { execSync } = require('child_process');

const handleError = function (err) {
  this.log(err.message);
  const projectDestinationPath = this.config.get('project_destination_path');

  if (projectDestinationPath) {
    this.log(`Removing project directory: ${projectDestinationPath}...`);
    this.spawnCommandSync('rm', ['-rf', `./${projectDestinationPath}`]);
    this.log('Done');
  }

  process.exit(0);
};

class Agonb extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list'
        , name: 'project_technology'
        , message: 'Your project technology'
        , choices: [{ name: 'NodeJs', value: 'nodejs' }, { value: 'rubyonrails', name: "Ruby On Rails" }]
      }
      , {
        type: 'input'
        , name: 'repository_url'
        , message: 'Your project repository url'
      }
    ]);
  }

  configuring() {
    let projectDestinationPath, projectApplicationName;
    const { project_technology, repository_url } = this.answers;

    try {
      [,,, projectDestinationPath] = repository_url.match(/^(https:\/\/github|git@github)\.com(:|\/).+\/(.+)$/);

      projectDestinationPath = projectDestinationPath.replace(/\.git$/, '');

      [, projectApplicationName] = projectDestinationPath.match(/^(.+)-backend-app$/);
    } catch (e) {
      throw new Error('Error during application directory/name parsing');
    }

    if (!projectDestinationPath) throw new Error('Unable to extract project name');
    if (!projectApplicationName) throw new Error('Unable to extract application name');
    if (project_technology === 'nodejs' && /_|[A-Z]/g.test(projectApplicationName)) throw new Error('Ensure that application name will contain only lower case letters and dashes!');

    this.composeWith(require.resolve('../update-scripts'), { handleError });
    this.composeWith(require.resolve(`../${this.answers.project_technology}`), { handleError });

    this.config.set('repository_url', repository_url);
    this.config.set('project_destination_path', projectDestinationPath);
    this.config.set('application_name', projectApplicationName);
    this.config.set('project_technology', project_technology);
  }

  default() {
    this.spawnCommandSync('git', ['clone', this.config.get('repository_url')]);
  }

  async writing() {
    this.fs.copyTpl(
      this.templatePath('.env.custom')
      , this.destinationPath(`${this.config.get('project_destination_path')}/.env.custom`)
    );
  }

  end() {
    execSync(`mv .yo-rc.json ${this.config.get('project_destination_path')}/.yo-rc.json`);
    this.log('Success');
  }
}

module.exports = Agonb;
