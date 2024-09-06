/// <reference types='cypress' />

describe('Bank app', () => {
  const now = new Date(2024, 0, 1).getTime();

  before(() => {
    cy.visit('/');
  });

  it('should provide the ability to Open Account and Verify Details', () => {
    cy.clock(now);
    const alertShown = cy.stub().as('alertShown');
    cy.on('window:alert', alertShown);

    cy.get(`button[ng-click='manager()']`)
      .click();

    cy.get(`button[ng-click='addCust()']`)
      .click();

    cy.get(`input[ng-model='fName']`)
      .type('Jhon');
    cy.get(`input[ng-model='lName']`)
      .type('Doe');
    cy.get(`input[ng-model='postCd']`)
      .type('12345');
    cy.get(`button[type='submit']`)
      .click();
    cy.get('@alertShown')
      .should('have.been.calledWith', 'Customer added successfully with cu' +
            'stomer id :6');

    cy.get(`button[ng-click='openAccount()']`)
      .click();
    cy.get(`select[name='userSelect']`)
      .select('Jhon Doe');
    cy.get(`select[name='currency']`)
      .select('Dollar');
    cy.get(`button[type='submit']`)
      .click();
    cy.get('@alertShown')
      .should('have.been.calledWith', 'Account created successfully with a' +
          'ccount Number :1016');

    cy.get(`button[ng-click='showCust()']`)
      .click();
    cy.get(`input[ng-model='searchCustomer']`)
      .type('Jhon');
    cy.get(`table`)
      .within(() => {
        cy.get('td').eq(5).should('contain.text', 'Jhon');
        cy.get('td').eq(6).should('contain.text', 'Doe');
        cy.get('td').eq(7).should('contain.text', '12345');
        cy.get('td').eq(8).should('contain.text', '1016');
      });

    cy.get(`button[ng-click='home()']`)
      .click();
    cy.get(`button[class='btn btn-primary btn-lg']`)
      .contains('Customer Login')
      .click();
    cy.get(`select[name='userSelect']`)
      .select('Jhon Doe');
    cy.get(`button[type='submit']`)
      .click();
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .should('have.text', 'Account Number : 1016 , \n\tBalance : 0 , ' +
        '\n\ttCurrency : Dollar');

    cy.get(`button[ng-click='byebye()']`)
      .click();
    cy.get(`select[name='userSelect']`)
      .should('be.visible');
  });
});
