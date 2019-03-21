'use-strict';

const handleError = function (err) {
  this.log(err.message);
  const projectDestinationPath = this.config.get('project_destination_path');

  if (projectDestinationPath) {
    this.log(`Removing project directory: ${projectDestinationPath}...`);
    this.spawnCommandSync('rm', ['-rf', `./${projectDestinationPath}`]);
    this.log('Project directory been removed');
  }

  process.exit(0);
};


module.exports = {
  handleError
};
