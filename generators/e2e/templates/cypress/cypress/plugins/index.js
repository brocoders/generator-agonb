/// <reference types="cypress" />

module.exports = (on, config) => {
  require('cypress-terminal-report').installPlugin(on);
};
