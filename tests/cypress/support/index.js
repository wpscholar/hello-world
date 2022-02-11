/**
 * Cypress configuration
 *
 * @link https://on.cypress.io/configuration
 */

import './commands';

require('cypress-terminal-report/src/installLogsCollector')({collectTypes: ['cy:log']});

Cypress.Cookies.defaults({
	preserve: /wp|wordpress/,
});
