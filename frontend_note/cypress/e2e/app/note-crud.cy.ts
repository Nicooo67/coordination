describe('test create et delete note', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type('password{enter}');
    cy.url().should('include', '/notes');
  });

  it('créer une note et la voir dans la liste', () => {
    cy.intercept('GET', '**/notes/', [
      { id: 1, title: 'Note existante', content: 'contenu existant' },
      { id: 99, title: 'Note Cypress', content: 'Contenu test Cypress' },
    ]).as('getNotesWithNew');

    cy.reload();
    cy.wait('@getNotesWithNew');

    cy.contains('Note Cypress').should('be.visible');
    cy.contains('Contenu test Cypress').should('be.visible');
  });

  it('supprimer une note retire la note de la liste', () => {
    cy.intercept('DELETE', '**/notes/*', { statusCode: 200, body: {} }).as('deleteNote');

    cy.get('app-note').then(($notes) => {
      const count = $notes.length;

      cy.get('app-note').first().within(() => {
        cy.contains('Supprimer').click();
      });

      cy.wait('@deleteNote');
      cy.get('app-note').should('have.length', count - 1);
    });
  });
});
