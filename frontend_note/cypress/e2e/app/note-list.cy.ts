describe('test liste des notes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('password{enter}');
    cy.url().should('include', '/notes');
  });

  it('affiche la liste des notes', () => {
    cy.contains('Liste des notes').should('be.visible');
    cy.get('app-note').should('have.length.greaterThan', 0);
  });

  it('chaque note affiche un titre et un contenu', () => {
    cy.get('app-note').first().within(() => {
      cy.get('h2').should('be.visible');
      cy.get('p').should('be.visible');
    });
  });

});
