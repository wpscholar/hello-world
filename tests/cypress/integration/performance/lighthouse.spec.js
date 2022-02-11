// <reference types="Cypress" />

describe('Page', () => {

	it('passes lighthouse audit', () => {

		cy.fixture('lighthouse')
			.then(
				(entries) => {
					entries
						.forEach(
							({url, config = {performance: 95}}) => {

								cy.visit(url);
								cy.lighthouse(config);

							}
						)
				}
			);

	});

});
