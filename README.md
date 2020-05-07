# Generator agonb

Yeoman generator for generating AWS deployment configs for back/front-end application

# Content
 - [Common Prerequisites](#common-prerequisites)
    - [Nest.js Prerequisites](#nestjs-prerequisites)
    - [Rails Prerequisites](#rails-prerequisites)
 - [Installation](#installation)
 - [Description](#description)
 - [Usage](#run-generator)
 - [Applying to existing repo without clonning](#apply-generator-exists)
   - [Frontend Deployment example](#frontend-deployment-exists)
   - [Backend Deployment example](#backend-deployment-exists)
 - [E2E create project](#e2e-project-template)
   - [Applying to existing Cypress project](#e2e-apply-exists-cypress)


### <a id="common-prerequisites"></a> Common Prerequisites
* Nodejs >= 12.x
* npm
* yarn
* yo

### <a id="nestjs-prerequisites"></a> Nest.js Prerequisites
* @nestjs/cli ()
```
npm i -g yo @nestjs/cli
```

### <a id="rails-prerequisites"></a> Rails Prerequisites
* Desirable Ruby version is 2.5.3
* Gem Bundler version less the 2.0 (It breaks CodeDeploy agent)


### <a id="installation"></a> Installation
```
npm i -g git+ssh://git@github.com:brocoders/generator-agonb.git
```
or 
```
yarn global add git+ssh://git@github.com:brocoders/generator-agonb.git
```

### <a id="description"></a> Description
Generator will initialize basic NestJS application ready for deployment to AWS. 
It performs next steps:
* Clone provided repository
* Initialize project in folder been created by **git**
* Copy deployment related files
* Set up health check route for Elastic Load Balancer

### <a id="requirements"></a> Requirements
Git project should have `-backend-app` suffix

## Usage
### <a id="run-generator"></a> Run generator
Generator can be run at any directory with command:
```
yo agonb
```

It's interactive and will ask for few questions:
* Project technology (Ruby On Rails, NodeJs)
* Project repository URL (SSH)
* DataBase client (Default is `postgres`)

### <a id="apply-generator-exists"></a> Applying to existing repo without cloning
The purpose of this sub generator is to put aws deployment related scripts to project.

Working directory must be directory of a project and contain `.yo-rc.json`
```
yo agonb:put-scripts
```
`.yo-rc.json` will contain information about:
- which type of scripts to put (NodeJs, RubyOnRails...)
- which values to put in template

Normally `.yo-rc.json` is crated on project initialization:
```
yo agonb
```

### <a id="frontend-deployment-exists"></a> Frontend Deployment example
.yo-rc.json
```
{
  "generator-agonb": {
    "repository_url": "git@github.com:brocoders/geniepad-frontend-app.git",
    "project_destination_path": "geniepad-frontend-app",
    "application_name": "geniepadFrontEnd",
    "project_technology": "frontend-deployment",
    "api_url": " https://geniepad.brocoders.xyz"
  }
}

```


### <a id="backend-deployment-exists"></a> Backend Deployment example
.yo-rc.json
```
{
  "generator-agonb": {
    "repository_url": "git@github.com:brocoders/appname-backend-app.git",
    "project_destination_path": "appname-backend-app",
    "application_name": "appname",
    "project_technology": "rubyonrails",
    "database_type": "postgresql",
    "use_worker": true
  }
}
```


### <a id="e2e-project-template"></a> E2E create project
Generator can be run at any directory with command:
```
yo agonb:e2e
```

It's interactive and will ask for few questions:
* Directory name
* Project E2E technology (Cypress)


### <a id="e2e-apply-exists-cypress"></a> Applying to existing Cypress project
.yo-rc.json
```
{
  "generator-agonb": {
    "e2eType": "cypress"
  }
}
```
