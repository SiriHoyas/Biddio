describe("Change user profile image", () => {
  it("Can go to profile and change user avatar", () => {
    cy.visit("http://127.0.0.1:5500/login.html");
    cy.wait(2000);
    cy.get('[data-cy="login-email-input"]').type("sirihoyas@stud.noroff.no");
    cy.get('[data-cy="login-password-input"]').type("PepsiErDigg123");
    cy.get('[data-cy="login-submit"]').click();
    cy.wait(2000);
    cy.visit("http://127.0.0.1:5500/profile.html");
    cy.get('[data-cy="edit-avatar"]').click();
    cy.get('[data-cy="avatar-url"]').type(
      "https://assetblast.b-cdn.net/wp-content/uploads/2022/01/FGBVqE6XMAIdqUi-scaled.jpg"
    );
    cy.get('[data-cy="submit-profile-avatar"]').click();
    cy.wait(2000);
    cy.get('[data-cy="profile-image"')
      .should("have.attr", "src")
      .should("include", "https://assetblast.b-cdn.net/wp-content/uploads/2022/01/FGBVqE6XMAIdqUi-scaled.jpg");
  });
});
