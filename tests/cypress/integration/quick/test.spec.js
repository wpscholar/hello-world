// <reference types="Cypress" />

describe('Page', () => {

	beforeEach(() => {

		cy.login()

	})

	it('Is running the correct WP and PHP versions', () => {

		cy.visit('/wp-admin/site-health.php?tab=debug');

		cy.get('#health-check-accordion-block-wp-core').prev().click();
		cy.get('#health-check-accordion-block-wp-core').find('tr').first().find('td').last().contain(new RegExp(`^${Cypress.env('wpVersion')}`));

		cy.get('#health-check-accordion-block-wp-server').prev().clik();
		cy.get('#health-check-accordion-block-wp-server').find('tr').eq(2).find('td').last().contains(Cypress.env('phpVersion'));

	})

})
