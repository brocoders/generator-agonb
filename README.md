# Generator agonb

Yeoman generator for generating AWS deployment configs for back-end application

# Prerequisites
* Nodejs >= 8.10
* npm
* yo
* @nestjs/cli

```
npm i -g yo @nestjs/cli
```

# Installation
```
npm i -g git+ssh://git@github.com:dirtyRuby/generator-agonb.git
```

#Description
Generator will initialize basic NestJS application ready for deployment to AWS. 
It performs next steps:
* Clone provided repository
* Initialize NestJS project in folder been created by **git**
* Copy deployment related files
* Set up health check route (/) for Elastic Load Balancer

#Requirements
Git project should be named <application-name>-back-end-app

# Usage
## Run generator
Generator can be run at any directory with command:
```
yo agonb
```

It's interactive and will ask for few questions: 
* Project repository URL (SSH)
* DataBase client (Default is `postgres`)
