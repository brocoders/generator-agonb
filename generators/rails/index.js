'use-strict';

const { execSync } = require('child_process');
const Generator = require('yeoman-generator');

const { handleError } = require('../helpers');

const RUBY_MAJOR = 2;
const RUBY_MINOR = 6;
const RUBY_PATCH = 6;
const RUBY_VERSION = `${RUBY_MAJOR}.${RUBY_MINOR}.${RUBY_PATCH}`;
const RUBY_INSTALL_CMD = `rvm install ruby-${RUBY_VERSION}`;

class RubyOnRails extends Generator {
  initializing() {
    this.on('error', handleError.bind(this));

    const currentInstalledRuby = this.spawnCommandSync('rvm', ['install', RUBY_VERSION], { shell: true });
    // const [ major, minor, patch ] = currentInstalledRuby
    //   .toString()
    //   .split('-')[1]
    //   .split('.')
    //   .map(str => parseInt(str, 10));
    // const isRequiredVersion = RUBY_MAJOR === major
    //   && RUBY_MINOR === minor
    //   && RUBY_PATCH === patch;
    // if (currentInstalledRuby.toString().includes(RUBY_VERSION) === false) {
    //   throw new Error(`Generator require only ${RUBY_VERSION}.
    //   Install ruby ${RUBY_INSTALL_CMD}`);
    // }
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list'
        , name: 'databaseType'
        , message: 'Your database type'
        , choices: [{ value: 'postgresql', name: 'PostregSQL' }]
      }
    ]);
  }

  configuring() {
    const { databaseType } = this.answers;

    this.config.set('databaseType', databaseType);
  }

  default() {
    const {
      projectDestinationPath,
      databaseType,
      useWorker = false,
    } = this.config.getAll();
    const templateEnv = `ENABLE_WORKER=${useWorker}`;

    execSync('/bin/bash --login');
    this.spawnCommandSync('rvm', ['use', `ruby-${RUBY_VERSION}`], { shell: true });

    this.spawnCommandSync(
      `${templateEnv} rails`
      , [
        'new'
        , projectDestinationPath
        , `--database=${databaseType}`
        , '--api'
        , '--skip-yarn'
        , '--skip-coffee'
        , '--skip-javascript'
        , '--skip-bundle'
        , '--skip-turbolinks'
        , '--skip-test'
        , '--skip'
        , `--template=${this.templatePath('template.rb')}`
      ],
      { shell: true },
    );
  }

  writing() {
    const destinationPath = this.config.get('projectDestinationPath');

    this.composeWith(require.resolve('../rails-scripts'), { destinationPath });
  }

  end() {
    this.log('Ruby On Rails app been successfully generated');
  }
}

module.exports = RubyOnRails;
