// <reference types="cypress" />

/**
 * Cypress plugins.
 *
 * @link https://on.cypress.io/plugins-guide
 */

const fs = require('fs');
const {lighthouse, pa11y, prepareAudit} = require('cypress-audit');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {

	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config

	on('before:browser:launch', (browser = {}, launchOptions) => {
		prepareAudit(launchOptions);
	});

	on('task', {
		lighthouse: lighthouse(), // calling the function is important
		pa11y: pa11y(), // calling the function is important
	});

	require('cypress-terminal-report/src/installLogsPrinter')(
		on,
		{
			printLogsToFile: 'always',
			printLogsToConsole: 'always',
			outputRoot: `${ config.projectRoot }/tests/cypress/logs/`,
			outputTarget: {
				'cypress.log': 'txt'
			}
		}
	);

	// Set base URL from environmental variable, if set
	if (process.env.CYPRESS_BASE_URL) {
		config.env.BASE_URL = process.env.CYPRESS_BASE_URL;
	}

	// Allow a base URL set as an environmental variable to override the core option
	if (config.env && config.env.BASE_URL) {
		config.baseUrl = config.env.BASE_URL;
	}

	return config;

}
