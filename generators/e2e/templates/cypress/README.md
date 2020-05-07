# cypress-ci-template
Template for cypress with AWS CodeBuild and S3 integration

### Prerequisites

1. Node.js v12+

### About setting base url to environment variables:

1. For development: by default base url (`CYPRESS_BASE_URL`) takes from `cypres.json` file. (`yarn cy:dev` or `yarn cy:dev:debug`)
2. For CI: `example-run.sh` script is used, that override `CYPRESS_BASE_URL` from `cypres.json` file. (`yarn cy:ci`)
3. If you need to override base url you can use `Cypress.config("baseUrl", cyEnv.baseUrl)`.

Docs: https://docs.cypress.io/guides/guides/environment-variables.html#Option-2-cypress-env-json

### !!! Important: don't add to name of test cases `""`, coz it break adding images to html report


### Example run cypress and generate report:

1. Change `--browser chrome` in `example-run.sh` file to another flag value, that available here: https://docs.cypress.io/guides/guides/launching-browsers.html#Firefox-Browsers-beta
2. As the result you will have `report` folder in the root of project, with: 1) html report 2) video records 3) screenshots


### About linter:

1. Added and configured eslint / .eslintrc.json with cypress-related plugins
2. Added husky to run auto-fix on pre-commit hooks
