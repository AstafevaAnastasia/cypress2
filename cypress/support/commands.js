Cypress.Commands.add('loginToAdmin', (username = 'qamid@qamid.ru', password = 'qamid') => {
  cy.visit('/admin')
  // В этом приложении админка доступна без логина
  cy.get('.page-header__subtitle').should('contain', 'Администраторррская')
})