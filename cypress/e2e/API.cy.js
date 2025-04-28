import { faker } from '@faker-js/faker';

/// <reference types="cypress" />


describe('API restful-booker', () => {

  it('Auth - CreateToken', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "username": "admin",
        "password": "password123"
      }
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      expect(response.body.token).not.to.be.empty;

      cy.wrap(response.body.token).as('authToken');
    });
  });



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

  it('GetBooking', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking/1',

    })
      .then((response) => {
        console.log(response)
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.all.keys(
          'firstname',
          'lastname',
          'totalprice',
          'depositpaid',
          'bookingdates',
          'additionalneeds'
        );
      });
  });

  it('', () => {

  });

})