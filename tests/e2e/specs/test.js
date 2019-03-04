// https://docs.cypress.io/api/introduction/api.html

describe('TEST CURRENCY CONVERTER APP', () => {
  it('sets the default value of base rate to 10.00', () => {
      cy.visit('/');
      cy.get('input.v-money')
        .should('have.value', '10,00')
  })

  it('updates displayed rates when base rate is changed', () => {
      cy.visit('/');
      cy.get('.card')
        .first()
        .find('.card--content span').invoke('text')
        .then((previousValue) => {
          cy.get('input.v-money')
            .clear()
            .type('5')

          cy.wait(3000)

          cy.get('.card')
            .first()
            .find('.card--content span').invoke('text').should('not.equal', previousValue);
        })
  })

  it('removes displayed rate on remove button click', () => {
    cy.visit('/');
    cy.get('.card')
      .first()
      .find('.card--close')
      .click();
  })

  it('adds new currency when selected', () => {
    cy.visit('/');
    cy.get('.card').its('length').then((cardLength) => {
      cy.get('select')
      .select('MXN');

      cy.wait(3000);

      cy.get('.card').its('length').should('greaterThan', cardLength);
    })
  })
})