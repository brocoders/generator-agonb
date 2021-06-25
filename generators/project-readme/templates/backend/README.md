# README

This README would normally document whatever steps are necessary to get the
application up and running.

## Content

 - [Main language version](#main-lang-version)
 - [System dependencies](#system-dependencies)
 - [Configuration](#configuration)
 - [Database creation](#db-creation)
 - [Database initialization](#db-init)
 - [Run test suites](#run-tests)
 - [Services (job queues, cache servers, search engines, etc.)](#additional-services)
 - [Deployment](#deployment)
 - [Commit style](#vcs-commit-style)
 - [Describe entities relations](#description-entities-relations)
 - [Describe application](#description-application)

### <a id="main-lang-version"></a> Main language version

Node  
NVM version  

### <a id="system-dependencies"></a> System dependencies

### <a id="configuration"></a> Configuration

#### AWS SSM parameters  
 
 Every developer can CRUD access to AWS SSM parameters:
 
 **Developer must add to documentation how SSM parameter created.**  
 **Save in SSM parameters only important environment variables. Other data can be saved in application config**  

 `<env>` - can be `dev` | `release` | `prod`. By default is `dev`  

You can get current `<applicationName>` on server from file `~/.env-app-name`   

You can get current `<env>` on server from file `~/.env-stage`  


  - create
  
Create SSM parameter with simple value:
  ```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/<env>/example" --value "hello" --type String
```
  
If you want create parameter with `URL` value:
  ```bash
aws ssm put-parameter --region us-west-2 --cli-input-json '{ "Name": "/<applicationName>/<env>/param-name", "Value": "https://google.com/", "Type": "String" }'
```

If you want encrypt SSM parameter:
  ```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/<env>/param-name" --type SecureString --value "hello"
```
  
  - read
  
List SSM parameters:
  ```bash
aws ssm get-parameters-by-path --region us-west-2 --path "/<applicationName>/<env>/" --recursive
```
  You can change output with next output format `table`, `json` or `csv` with flag `--output=<format>`  

  
Get single SSM parameter:
  ```bash
aws ssm get-parameter --region us-west-2 --name "/<applicationName>/<env>/param-name"
```

Get value from encrypted SSM parameter:
```bash
aws ssm get-parameter --region us-west-2 --name "/<applicationName>/<env>/param-name" --with-decryption
```

Get only value from SSM parameter
```bash
aws ssm get-parameter --region us-west-2 --name "/<applicationName>/<env>/param-name" --query Parameter.Value --output text
```

  
  - update

Update SSM parameter:
```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/<env>/param-name" --type String --value "hello" --overwrite
```

Update secure SSM parameter:
```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/<env>/param-name" --type SecureString --value "hello" --overwrite
```
  
  - delete
  
  ```bash
aws ssm delete-parameter --region us-west-2 --name "/<applicationName>/<env>/example"
```

##### SSM parameters list  

Replace `<applicationName>/<env>` to you app name.  

| Parameter name  | Description | Example value |
| ------------- | ------------- | ------------- |
| `/<applicationName>/<env>/worker/enable`  | Default param. When worker instance created.  | true / false |
| `/<applicationName>/<env>/worker/ip`  | Default param. When worker enabled.  | IP |
| `/<applicationName>/<env>/s3/name`  | Default param. Bucket name  |  |
| `/<applicationName>/<env>/s3/domain`  | Default param. Bucket name  |  |
| `/<applicationName>/<env>/db/password`  | Default param  |  |
| `/<applicationName>/<env>/db/name`  | Default param  |  |
| `/<applicationName>/<env>/db/user`  | Default param  |  |
| `/<applicationName>/<env>/db/host`  | Default param  |  |

### <a id="db-creation"></a> Database creation

How database is running ....

### <a id="db-init"></a> Database initialization

How run database seeds ....

### <a id="run-tests"></a> How to run the test suite

How run tests.....

### <a id="additional-services"></a> Services (job queues, cache servers, search engines, etc.)

Describe what you use in project.... ( Redis / Mail services / Other.... )

### <a id="deployment"></a> Deployment instructions

Describe how run application in production

### <a id="vcs-commit-style"></a> Commit style

Describe commit style. For example [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)  

###  <a id="description-entities-relations"></a> Describe entities relations


###  <a id="description-application"></a> Describe application structure

Describe modules / files / services / other.  
