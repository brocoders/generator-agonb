// https://dev.to/bushraalam/using-mochawesome-reporter-with-cypress-54pf
// https://docs.cypress.io/guides/tooling/reporters.html#Examples
// https://medium.com/cypress-io-thailand/generate-a-beautiful-test-report-from-running-tests-on-cypress-io-371c00d7865a
// https://medium.com/egnyte-engineering/3-steps-to-awesome-test-reports-with-cypress-f4fe915bc246

const { merge } = require('mochawesome-merge');
const fs = require('fs');
 
merge( {
  files: [
    './report/mochawesome-report/*.json',
  ],
}).then(report => {
  fs.writeFileSync('./report/mochawesome-report/report.json', JSON.stringify(report, null, 4));
});
