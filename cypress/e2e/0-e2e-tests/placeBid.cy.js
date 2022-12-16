describe("Quick bid on item", () => {
  it("should place quick bid on item", () => {
    cy.visit("http://127.0.0.1:5500/login.html");
    cy.wait(2000);
    cy.get('[data-cy="login-email-input"]').type("sirihoyas@stud.noroff.no");
    cy.get('[data-cy="login-password-input"]').type("PepsiErDigg123");
    cy.get('[data-cy="login-submit"]').click();
    cy.wait(2000);
    cy.get('[data-cy="listing-card"]').eq(0).click();
    cy.wait(2000);
    cy.get('[data-cy="make-bid"]').click();
    cy.wait(2000);
    cy.get('[data-cy="bidder-name"]').eq(0).contains("sirihoyas");
  });
});
