'use-strict'

const { execSync } = require('child_process')
const Generator = require('yeoman-generator')

const handleError = function (err) {
  console.log(err.message)

  if (this.projectDestinationPath) {
    console.info(`Removing project directory: ${this.projectDestinationPath}...`)
    this.spawnCommandSync('rm', ['-rf', `./${this.projectDestinationPath}`])
    console.info('Done')
  }

  process.exit(0)
};

class Agonb extends Generator {
  set projectDestinationPath(projectDestinationPath) {
    this._projectDestinationPath = projectDestinationPath
  }

  set projectApplicationName(projectApplicationName) {
    this._projectApplicationName = projectApplicationName
  }

  get projectDestinationPath() {
    return this._projectDestinationPath
  }

  get projectApplicationName() {
    return this._projectApplicationName
  }

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
    const { project_technology, database_type, repository_url } = this.answers;

    try {
      [,,, projectDestinationPath] = repository_url.match(/^(https:\/\/github|git@github)\.com(:|\/).+\/(.+)$/)

      projectDestinationPath = projectDestinationPath.replace(/\.git$/, '');

      [, projectApplicationName] = projectDestinationPath.match(/^(.+)-backend-app$/)
    } catch (e) {
      throw new Error('Error during application directory/name parsing')
    }

    if (!projectDestinationPath) throw new Error('Unable to extract project name');
    if (!projectApplicationName) throw new Error('Unable to extract application name');
    if (project_technology === 'nodejs' && /_|[A-Z]/g.test(projectApplicationName)) throw new Error('Ensure that application name will contain only lower case letters and dashes!');

    this.projectDestinationPath = projectDestinationPath
    this.projectApplicationName = projectApplicationName

    this.composeWith(require.resolve(`../${this.answers.project_technology}`), { projectApplicationName, projectDestinationPath, handleError });
  }

  default() {
    const { repository_url } = this.answers

    // execSync(`mkdir ${this.projectDestinationPath}`)
    this.spawnCommandSync('git', ['clone', repository_url])
  }

  writing() {
    const { projectDestinationPath } = this;

    this.fs.copyTpl(
      this.templatePath('.env.custom')
      , this.destinationPath(`${projectDestinationPath}/.env.custom`)
    );
  }

  end() {
    console.info('Success')
  }
}

module.exports = Agonb
