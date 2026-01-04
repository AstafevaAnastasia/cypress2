describe('Админка', () => {
  it('Проверка доступности админки - ТЕСТ ПАДАЕТ (issue: не удается взаимодействовать с элементами админки)', () => {
    cy.visit('/admin')
    
    // Проверяем, что заголовок админки виден
    cy.get('.page-header__title').should('be.visible')
    cy.get('.page-header__title').should('contain', 'Идёмвкино')
    cy.get('.page-header__subtitle').should('be.visible')
    cy.get('.page-header__subtitle').should('contain', 'Администраторррская')
    
    // Попытка проверить наличие основного контейнера
    cy.get('main').should('be.visible')
    
    // Попытка проверить существование секций
    cy.get('#hall-control').should('exist')
    cy.get('#hall-configuration').should('exist')
    cy.get('#price-configuration').should('exist')
    cy.get('#grid-session').should('exist')
    cy.get('#start-sales').should('exist')
  })
})