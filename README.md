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
