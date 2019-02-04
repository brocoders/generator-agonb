'use-strict'

const Generator = require('yeoman-generator')

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

  async prompting() {
    this.answers = await this.prompt([{
      type: 'input'
      , name: 'repository_url'
      , message: 'Your project repository url (ssh)'
    }
    , {
      type: 'input'
      , name: 'database_type'
      , message: 'Your database type'
      , default: 'postgres'
    }]);

    const [, projectDestinationPath] = this.answers.repository_url.match(/^git@github\.com:.+\/(!?.+)\.git$/)
    const [, projectApplicationName] = projectDestinationPath.match(/^(!?.+)-back-end-app$/)

    if (!projectDestinationPath) throw new Error('Unable to extract project name')
    if (!projectApplicationName) throw new Error('Unable to extract application name')

    this.projectDestinationPath = projectDestinationPath
    this.projectApplicationName = projectApplicationName
  }

  default() {
    const { repository_url } = this.answers

    this.spawnCommandSync('git', ['clone', repository_url])
    this.spawnCommandSync('nest', ['new', this.projectDestinationPath])
  }

  writing() {
    const {
      projectApplicationName: application_name
      , projectDestinationPath
      , answers: { database_type }
    } = this

    this.fs.copyTpl(
      this.templatePath('scripts/install_dependencies')
      , this.destinationPath(`${projectDestinationPath}/scripts/install_dependencies`)
      , {
        application_name: this.projectApplicationName
        , database_type
      }
    )

    this.fs.copyTpl(
      this.templatePath('scripts/stop_server')
      , this.destinationPath(`${projectDestinationPath}/scripts/stop_server`)
      , { application_name }
    )

    this.fs.copyTpl(
      this.templatePath('appspec.yml')
      , this.destinationPath(`${projectDestinationPath}/appspec.yml`)
    )

    this.fs.copyTpl(
      this.templatePath('.env.custom')
      , this.destinationPath(`${projectDestinationPath}/.env.custom`)
    )

    this.spawnCommandSync('find', [`./${projectDestinationPath}/src`, '-type', 'f', '-exec', 'sed', '-i', '-e', 's/getHello/getHealthCheck/g', '{}', '\;']) // eslint-disable-line no-useless-escape
  }

  end() {
    console.info('Success')
  }
}

module.exports = Agonb
