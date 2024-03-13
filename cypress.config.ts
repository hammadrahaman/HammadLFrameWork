const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  baseUrl: 'https://qa.loadops.com/',
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  responseTimeout: 10000,
  hideXHRInCommandLog:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    specPattern: 'cypress/*/*.cy.{js,jsx,ts,tsx}'
  },
});
