# Generator agonb

Yeoman generator for generating AWS deployment configs for back/front-end application

# Content
 - [Common Prerequisites](#common-prerequisites)
 - [Installation from git repository](#installation)
    - [NPM](#install-yo-npm)
    - [YARN](#install-yo-yarn)
 - [Description](#description)
 - [Usage](#run-generator)
    - [Backend](#usage-backend)
    - [NextJS SSR](#usage-nextjs-ssr)
    - [Frontend](#usage-frontend)
    - [E2E](#usage-e2e)
 - [Applying to existing repo without clonning](#apply-generator-exists)
   - [Frontend Deployment example](#frontend-deployment-exists)
   - [Backend Deployment example](#backend-deployment-exists)
   - [NextJS SSR Deployment example](#nextjs-ssr-deployment-exists)
   - [Applying to existing Cypress project](#e2e-cypress-exists)


### <a id="common-prerequisites"></a> Common Prerequisites
* Nodejs >= 12.x - required
* npm - required
* yo - required
* npx - required
* yarn - optional

### <a id="installation"></a> Installation
#### <a id="install-yo-npm"></a> NPM
install with `HTTPS`
```bash
npm i -g git+https://git@github.com/brocoders/generator-agonb.git
```
or SSH
```bash
npm i -g git+ssh://git@github.com:brocoders/generator-agonb.git
```
#### <a id="install-yo-yarn"></a> YARN
install with `HTTPS`
```bash
yarn global add git+https://git@github.com/brocoders/generator-agonb.git
```
or `SSH`
```bash
yarn global add git+ssh://git@github.com:brocoders/generator-agonb.git
```

### <a id="description"></a> Description
Generator will initialize basic application ready for deployment to AWS. 
It performs next steps:
* Initialize project in folder been created by **git**
* Copy deployment related files
* Set up health check route for Elastic Load Balancer ( Backend )
* git init
* git remote add origin ....

### <a id="requirements"></a> Requirements
Backend git repository should have `-backend-app` suffix.  
Frontend git repository should have `-frontend-app` suffix.  
**Other repositories naming return error.**  

## Usage
### <a id="run-generator"></a> Run generator

It's interactive and will ask for few questions:
* Project technology (NodeJs, Frontend, E2E)
* Project repository URL (SSH)

Generator can be run at any directory with command:
```
yo agonb
```



### <a id="usage-backend"></a> Backend ( NestJS )

It's interactive and will ask for few questions:
* Worker instance for background tasks
* DataBase client (Default is `postgres`)

### <a id="usage-nextjs-ssr"></a> NextJS SSR

### <a id="usage-frontend"></a> Frontend

It's interactive and will ask for few questions:
* Project type generator:
    - create react app
    - gatsby
    - empty project
* Backend domain ( can be skipped and ignore if you don't need API )
* Frontend domain ( can be skipped first time but must be filled before deploy )


### <a id="usage-e2e"></a> E2E

It's interactive and will ask for few questions:
* E2E framework (Default is `cypress`)


## <a id="apply-generator-exists"></a> Applying to existing repo without cloning
The purpose of this sub generator is to put aws deployment related scripts to project.

Working directory must be directory of a project and contain `.yo-rc.json`
```
yo agonb:put-scripts
```
`.yo-rc.json` will contain information about:
- which type of scripts to put (NodeJs...)
- which values to put in template

Normally `.yo-rc.json` is crated on project initialization:
```
yo agonb
```

### <a id="frontend-deployment-exists"></a> Frontend Deployment example
Create file `.yo-rc.json`  

```
{
  "generator-agonb": {
    "repositoryUrl": "git@github.com:brocoders/<appname>-frontend-app.git",
    "projectDestinationPath": "<appname>-frontend-app",
    "domain": "<subdomain>.brocoders.xyz",
    "projectTechnology": "frontend",
    "apiUrl": "https://<appname>.brocoders.xyz",
    "enablePullRequest": false,
    "projectGenerator": "cra|gatsby|none"
  }
}
```

 - `domain` - Frontend domain: ask in DevOps team. **Must be filled**


### <a id="backend-deployment-exists"></a> Backend Deployment example
Create file `.yo-rc.json`  

```
{
  "generator-agonb": {
    "repositoryUrl": "git@github.com:brocoders/<appname>-backend-app.git",
    "projectDestinationPath": "<appname>-backend-app",
    "applicationName": "<appname>",
    "projectTechnology": "nestjs",
    "databaseType": "postgresql",
    "useWorker": true
  }
}
```

### <a id="nextjs-ssr-deployment-exists"></a> Backend Deployment example
Create file `.yo-rc.json`  

```
{
  "generator-agonb": {
    "repositoryUrl": "git@github.com:brocoders/<appname>-backend-app.git",
    "projectDestinationPath": "<appname>-backend-app",
    "applicationName": "<appname>",
    "projectTechnology": "nextjs",
    "databaseType": "false",
    "useWorker": false
  }
}
```

### <a id="e2e-cypress-exists"></a> Applying to existing Cypress project
Create file `.yo-rc.json`  

```
{
  "generator-agonb": {
    "repositoryUrl": "https://github.com/brocoders/<appname>-e2e-cypress-app.git",
    "projectDestinationPath": "<appname>-e2e-cypress-app",
    "applicationName": "<appname>-e2e-cypress-app",
    "projectTechnology": "e2e",
    "useWorker": false,
    "e2eType": "cypress"
  }
}
```

Run command:  
```bash
yo agonb:e2e-report
```
