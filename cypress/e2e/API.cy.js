import { faker } from '@faker-js/faker';

/// <reference types="cypress" />


describe('API restful-booker', () => {
  it('GetBookingIds', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',

    })
      .then((response) => {
        console.log(response)
        expect(response.status).to.eq(200);
      });
  });


})