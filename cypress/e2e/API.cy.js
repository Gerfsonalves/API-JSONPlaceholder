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
        expect(response.status).to.eq(200);
      });
  });

  it('GetBooking', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking/3',

    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');

      });
  });

  it('CreateBooking', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {
        "firstname": "Ge",
        "lastname": "Alves",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2025-04-28"
        },
        "additionalneeds": "C.R.U.D. QA"
      }
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
      });
  });

})