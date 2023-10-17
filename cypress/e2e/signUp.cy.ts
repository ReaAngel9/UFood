describe('Validate signUp of users', () => {
    it('if its correct the user should be created ', () => {
      cy.visit('/signUp')
      cy.get('#nombre').type('Nombre');
      cy.get('#email').type('Email');
      cy.get('#pass').type('Contraseña');
      cy.get('#passconfirm').type('Contraseña confirmada');
      cy.get('#create').click();
      cy.contains('Crear')
    })
  })
  