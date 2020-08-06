# README

This README would normally document whatever steps are necessary to get the
application up and running.

## Content

 - [Main language version](#main-lang-version)
 - [Configuration](#configuration)
 - [Run test suites](#run-tests)
 - [Deployment](#deployment)
 - [Commit style](#vcs-commit-style)
 - [Describe application](#description-application)

### <a id="main-lang-version"></a> Main language version

Node  

### <a id="configuration"></a> Configuration

#### Environment   
  
Application default have 2 env:
 - `dev` - development environment. Env file name `.env.dev`.  
 - `prod` - production environment. Env file name `.env.prod`.  

Additional env is release candidate.

 - `release` - release candidate for testing. Env file name `.env.release`.  
    Release candidate not created by default. You need ask you manager for this moment.  

##### env list  

| Parameter name  | Description | Example value |
| ------------- | ------------- | ------------- |
| `REACT_APP_API_URL`  | Default param. Backend API URL.  | URL |
| `PORT`  | Default param. Local serve port  |  |
| `NODE_ENV`  | Default param.  |  |
| `NODE_PATH`  | Default param  |  |
| `PUBLIC_URL`  | Default param. App domain with scheme  |   |

### <a id="run-tests"></a> How to run the test suite

How run tests.....

### <a id="deployment"></a> Deployment instructions

Describe how run application in production

### <a id="vcs-commit-style"></a> Commit style

Describe commit style. For example [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)  

###  <a id="description-application"></a> Describe application structure

Describe modules / files / services / other.  
