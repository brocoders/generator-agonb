const Generator = require('yeoman-generator');
const fs = require('fs');

class UpdateScripts extends Generator {
  writing() {
    const { project_technology } = this.config.getAll();
    let { project_destination_path } = this.config.getAll();

    if (this._initOptions.env.namespace === 'agonb:update-scripts') project_destination_path = '.';

    const scripts = fs.readdirSync(this.templatePath(project_technology));

    this.log(this.config.getAll());

    scripts.forEach((templateFile) => {
      const [dirname, file] = templateFile.split('#');

      const destinationPath = dirname !== templateFile
        ? `${project_destination_path}/${dirname.replace('.', '/')}/${file}`
        : `${project_destination_path}/${templateFile}`;

      this.fs.copyTpl(
        this.templatePath(`${project_technology}/${templateFile}`)
        , this.destinationPath(destinationPath)
        , this.config.getAll()
      );
    });
  }
}

module.exports = UpdateScripts;
