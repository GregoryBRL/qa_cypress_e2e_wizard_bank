/// <reference types='cypress' />

describe('Bank app', () => {
  const now = new Date(2024, 0, 1).getTime();

  before(() => {
    cy.visit('/');
  });

  it('should fail on withdrawal with insufficient funds', () => {
    cy.clock(now);

    cy.get(`button[class='btn btn-primary btn-lg']`)
      .contains('Customer Login')
      .click();
    cy.get(`select[name='userSelect']`)
      .select('Hermoine Granger');
    cy.get(`button[type='submit']`)
      .click();

    cy.contains('[ng-hide="noAccount"]', 'Account Number')
      .contains('strong', '1001')
      .should('be.visible');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', '5096')
      .should('be.visible');
    cy.contains('.ng-binding', 'Dollar')
      .should('be.visible');

    cy.get(`button[ng-click='withdrawl()']`)
      .click();
    cy.get(`input[class='form-control ng-pristine ng-untouched ng-invali` +
      `d ng-invalid-required']`)
      .type('5100');
    cy.get(`button[type='submit']`)
      .contains('Withdraw')
      .click();
    cy.get(`span[class='error ng-binding']`)
      .contains('Transaction Failed. You can not withdraw amount more' +
      ' than the balance.')
      .should('be.visible');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', '5096')
      .should('be.visible');

    cy.get(`button[ng-click='byebye()']`)
      .click();
    cy.get(`select[name='userSelect']`)
      .should('be.visible');
  });
});
