const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://opensource-demo.orangehrmlive.com',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
})