# Generator agonb

Yeoman generator for generating AWS deployment configs for back-end application

# Prerequisites
* Nodejs >= 8.10
* npm
* yo
* @nestjs/cli
* Desirable Ruby version is 2.5.3
* Gem Bundler version less the 2.0 (It breaks CodeDeploy agent)

```
npm i -g yo @nestjs/cli
```

# Installation
```
npm i -g git+ssh://git@github.com:dirtyRuby/generator-agonb.git
```

# Description
Generator will initialize basic NestJS application ready for deployment to AWS. 
It performs next steps:
* Clone provided repository
* Initialize project in folder been created by **git**
* Copy deployment related files
* Set up health check route for Elastic Load Balancer

# Requirements
Git project should have `-backend-app` suffix

# Usage
## Run generator
Generator can be run at any directory with command:
```
yo agonb
```

It's interactive and will ask for few questions:
* Project technology (Ruby On Rails, NodeJs)
* Project repository URL (SSH)
* DataBase client (Default is `postgres`)

### Put Scripts
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

#### Front End Deployment example
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
