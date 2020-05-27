const Generator = require('yeoman-generator');
const {
  execSync,
} = require('child_process');

class E2EProjectInitializer extends Generator {
  initializing() {
    this.log('This generator create e2e project in current directory');
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list'
        , name: 'e2eType'
        , message: 'E2E type'
        , choices: [
          { value: 'cypress', name: 'Cypress' },
          // { value: 'robot_framework', name: 'Robot Framework' },
        ]
      },
    ]);
  }

  configuring() {
    const { e2eType } = this.answers;

    this.config.set('e2eType', e2eType);
  }

  async writing() {
    const { e2eType, projectDestinationPath } = this.config.getAll();

    execSync(`mkdir ${projectDestinationPath}`);
    this.fs.copy(
      this.templatePath(e2eType),
      this.destinationPath(projectDestinationPath),
    );

    this.composeWith(require.resolve('../e2e-scripts'), { e2eType, projectDestinationPath });
  }

  end() {
    const { e2eType } = this.answers;
    this.log(`Project generated with default ${e2eType} tests
    You need install deps with npm or yarn`);
  }
}

module.exports = E2EProjectInitializer;
