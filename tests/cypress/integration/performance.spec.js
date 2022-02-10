// <reference types="Cypress" />

describe('WordPress', () => {

	before(() => {
		cy.login(Cypress.env('wpUsername'), Cypress.env('wpPassword'));
	});

	it('measures page load', () => {

			cy.fixture('performance')
				.then(
					(entries) => {
						entries
							.forEach(
								({url, description, duration: loadTimeInMilliseconds }) => {

									cy.visit(
										url,
										{
											onBeforeLoad: (win) => {
												win.performance.mark('start-loading');
											},
											onLoad: (win) => {
												win.performance.mark('end-loading');
											}
										}
									)
										.its('performance')
										.then((performance) => {
											performance.measure('pageLoad', 'start-loading', 'end-loading');
											const measure = performance.getEntriesByName('pageLoad')[0];
											const duration = measure.duration;
											assert.isAtMost(duration, loadTimeInMilliseconds);

											cy.log(
												`[PERFORMANCE] Page load duration for ${ description }: ${ duration / 1000 } seconds`
											);
										});
								});

					}
				);
		}
	);

});
