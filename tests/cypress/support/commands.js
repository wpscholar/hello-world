/**
 * Cypress commands.
 *
 * @link https://on.cypress.io/custom-commands
 */

import 'cypress-audit/commands';

Cypress.Commands.add('login', (username, password) => {
	cy
		.getCookies()
		.then(cookies => {
			let hasMatch = false;
			cookies.forEach((cookie) => {
				if (cookie.name.substr(0, 20) === 'wordpress_logged_in_') {
					hasMatch = true;
				}
			});
			if (!hasMatch) {
				cy.visit('/wp-login.php').wait(1000);
				cy.get('#user_login').type(username);
				cy.get('#user_pass').type(`${ password }{enter}`);
			}
		});
});

Cypress.Commands.add('logout', () => {
	cy
		.getCookies()
		.then(
			cookies => {
				cookies.forEach(
					cookie => {
						cy.clearCookie(cookie.name);
					}
				)
			}
		);
});
