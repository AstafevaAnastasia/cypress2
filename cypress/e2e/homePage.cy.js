describe('Главная страница', () => {
  beforeEach(() => {
    cy.visit('/')  // будет посещать http://qamid.tmweb.ru/
  })

  it('Корректно отображается главная страница', () => {
    cy.fixture('selectors.json').then((selectors) => {
      cy.get(selectors.homePage.header).should('be.visible')
      cy.get(selectors.homePage.header).should('contain', 'Идёмвкино')
      cy.get(selectors.homePage.navDays).should('have.length.greaterThan', 0)
      cy.get(selectors.homePage.movies).should('have.length.greaterThan', 0)
      
      cy.get(selectors.homePage.movieTitle).each(($movie) => {
        cy.wrap($movie).should('be.visible')
      })
    })
  })
})