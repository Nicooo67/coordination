describe('test detail d\'une note', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('password{enter}');
    cy.url().should('include', '/notes');
  });

  it('cliquer sur une note affiche son détail', () => {
    cy.get('app-note').first().click();
    cy.url().should('match', /\/notes\/\d+/);
  });

  it('le détail affiche le titre, le contenu et l\'id', () => {
    cy.get('app-note').first().click();
    cy.url().should('match', /\/notes\/\d+/);

    cy.get('h2').should('be.visible');
    cy.get('p').should('be.visible');
    cy.get('span').contains('#').should('be.visible');
  });

  it('le lien retour redirige vers la liste', () => {
    cy.get('app-note').first().click();
    cy.url().should('match', /\/notes\/\d+/);

    cy.contains('Retour à la liste des notes').click();
    cy.url().should('match', /\/notes$/);
  });
});