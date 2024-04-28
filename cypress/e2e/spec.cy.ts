describe('search results', () => {
  it('should render multiple results', () => {
    cy.visit('http://localhost:3000/results?bookingType=holiday&location=orlando&gateway=LHR&departureDate=01-06-2024&duration=7&partyCompositions=a2')
    cy.get('article').should('have.length.gt',1);
  })
})