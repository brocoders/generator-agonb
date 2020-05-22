import './commands';
require('cypress-terminal-report').installSupport();
const addContext = require('mochawesome/addContext');

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let item = runnable;
    const nameParts = [runnable.title];

    // Iterate through all parents and grab the titles
    while (item.parent) {
      nameParts.unshift(item.parent.title);
      item = item.parent;
    }

    // this is how cypress joins the test title fragments
    const fullTestName = nameParts
      .filter(Boolean)
      .join(' -- ');

    const imageUrl = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`;
    const videoUrl = `videos/${Cypress.spec.name}.mp4`;

    addContext({ test }, imageUrl);
    addContext({ test }, videoUrl);
  }
});
