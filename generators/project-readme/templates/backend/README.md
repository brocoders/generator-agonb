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

Node / Ruby version  
RVM / NVM version  

### <a id="system-dependencies"></a> System dependencies

### <a id="configuration"></a> Configuration

#### AWS SSM parameters  
 
 Every developer can CRUD access to AWS SSM parameters:
 
 **Developer must add to documentation how SSM parameter created.**  
 **Save in SSM parameters only important environment variables. Other data can be saved in application config**  
 
  - create
  
Create SSM parameter with simple value:
  ```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/example" --value "hello"
```
  
If you want create parameter with `URL` value:
  ```bash
aws ssm put-parameter --region us-west-2 --cli-input-json '{ "Name": "/<applicationName>/param-name", "Value": "https://google.com/", "Type": "String" }'
```

If you want encrypt SSM parameter:
  ```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/param-name" --type SecureString --value "hello"
```
  
  - read
  
List SSM parameters:
  ```bash
aws ssm get-parameters-by-path --region us-west-2 --path "/<applicationName>/" --recursive
```
  You can change output with next output format `table`, `json` or `csv` with flag `--output=<format>`  

  
Get single SSM parameter:
  ```bash
aws ssm get-parameter --region us-west-2 --name "/<applicationName>/param-name"
```

Get value from encrypted SSM parameter:
```bash
aws ssm get-parameter --region us-west-2 --name "/<applicationName>/param-name" --with-decryption
```

Get only value from SSM parameter
```bash
aws ssm get-parameter --region us-west-2 --name "/<applicationName>/param-name" --query Parameter.Value --output text
```

  
  - update

Update SSM parameter:
```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/param-name" --type String --value "hello" --overwrite
```

Update secure SSM parameter:
```bash
aws ssm put-parameter --region us-west-2 --name "/<applicationName>/param-name" --type SecureString --value "hello" --overwrite
```
  
  - delete
  
  ```bash
aws ssm delete-parameter --region us-west-2 --name "/<applicationName>/example"
```


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
