/* eslint-disable */
describe("Log user in", () => {
  it("should give user feedback on wrong credetials, and redirect to index when logged in", () => {
    cy.visit("http://127.0.0.1:5500/login.html");
    cy.wait(2000);
    cy.get('[data-cy="login-email-input"]').type("sirihoyas@noroff.no");
    cy.get('[data-cy="login-password-input"]').type("PepsiErDigg123");
    cy.get('[data-cy="login-submit"]').click();
    cy.wait(2000);
    cy.get('[data-cy="login-error"]').should("be.visible");
    cy.wait(2000);
    cy.get('[data-cy="login-email-input"]').clear();
    cy.get('[data-cy="login-email-input"]').type("sirihoyas@stud.noroff.no");
    cy.get('[data-cy="login-submit"]').click();
    cy.wait(2000);
    cy.url().should("be.equals", "http://127.0.0.1:5500/index.html");
  });
});
