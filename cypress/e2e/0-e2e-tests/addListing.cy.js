describe("Can post an item to the API", () => {
  it("Posts an item successfully to the API", () => {
    cy.visit("http://127.0.0.1:5500/login.html");
    cy.wait(2000);
    cy.get('[data-cy="login-email-input"]').type("sirihoyas@stud.noroff.no");
    cy.get('[data-cy="login-password-input"]').type("PepsiErDigg123");
    cy.get('[data-cy="login-submit"]').click();
    cy.wait(2000);
    cy.visit("http://127.0.0.1:5500/profile.html");
    cy.get('[data-cy="new-listing-btn"]').click();
    cy.get('[data-cy="listing-title"]').type("iPhone 13 Pro");
    cy.get('[data-cy="listing-description"]').type("No scratches or chips. Works as new");
    cy.get('[data-cy="add-photos-btn"]').click();
    cy.wait(2000);
    cy.get('[data-cy="url-input"]').type(
      "https://shared.cdn.smp.schibsted.com/v2/images/898f18ff-0941-480f-a24b-7c3adc54711b?fit=crop&format=auto&h=2250&w=4000&s=264b2e8c4c4a184abc4ecd778dbc174392a67e83"
    );
    cy.get('[data-cy="add-btn"]').click();
    cy.get('[data-cy="url-input"]').type(
      "https://www.digitaltrends.com/wp-content/uploads/2021/09/iphone-13-pro-review-dan-baker-35.jpg?p=1"
    );
    cy.get('[data-cy="add-btn"]').click();
    cy.wait(2000);
    cy.get('[data-cy="done-btn"]').click();
    cy.get('[data-cy="10-days"]').click();
    cy.get('[data-cy="new-listing-submit"]').click();
    cy.get('[data-cy="new-listing-submit"]').should("be.visible");
  });
});
