describe('Бронирование фильма', () => {
  beforeEach(() => {
    cy.visit('/')  // заходим на главную
  })

  it('Проверка перехода на страницу бронирования', () => {
    cy.fixture('selectors.json').then((selectors) => {
      // Проверяем, что на главной странице есть сеансы
      cy.get(selectors.homePage.seanceTime).should('have.length.greaterThan', 0);
      
      // Проверяем, что есть хотя бы один доступный сеанс (не disabled)
      cy.get(selectors.homePage.seanceTimeNotDisabled).first().click();
      
      // Проверяем, что произошло перенаправление на страницу бронирования
      cy.url().should('include', '/client/hall.php');
      
      // Проверяем элементы страницы бронирования
      cy.get(selectors.bookingPage.header).should('be.visible');
      cy.get(selectors.bookingPage.filmTitle).should('be.visible');
      cy.get(selectors.bookingPage.seanceTime).should('be.visible');
      cy.get(selectors.bookingPage.hallName).should('be.visible');
      cy.get(selectors.bookingPage.schemeWrapper).should('be.visible');
      cy.get(selectors.bookingPage.chair).should('have.length.greaterThan', 0);
      cy.get(selectors.bookingPage.acceptButton).should('be.visible');
      
      // Кнопка бронирования должна быть disabled, пока не выбраны места
      cy.get(selectors.bookingPage.acceptButtonDisabled).should('exist');
    })
  })
  
  it('Выбор места и активация кнопки бронирования', () => {
    // Заходим на главную и переходим на страницу бронирования через сеанс
    cy.visit('/')
    
    cy.fixture('selectors.json').then((selectors) => {
      // Кликаем по первому доступному сеансу
      cy.get(selectors.homePage.seanceTimeNotDisabled).first().click();
      
      // Ждем загрузки схемы зала
      cy.get(selectors.bookingPage.schemeWrapper, { timeout: 15000 }).should('be.visible');
      
      // Выбираем свободное место (обычное кресло)
      cy.get(selectors.bookingPage.chairStandart).not(selectors.bookingPage.chairTaken).first().click();
      
      // Проверяем, что появилось хотя бы одно выбранное место
      cy.get(selectors.bookingPage.chairSelected).should('have.length.greaterThan', 0);
      
      // Кнопка бронирования должна стать активной
      cy.get(selectors.bookingPage.acceptButton).should('not.be.disabled');
    })
  })
})