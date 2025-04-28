import { faker } from '@faker-js/faker';

/// <reference types="cypress" />


describe('API restful-booker - Fluxo Completo', () => {
  let authToken;

  // Obter token antes de todos os testes
  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
    });
  });



  it('GetBookingIds', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('GetBooking', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking/3',
      headers: {
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Content-Type': 'application/json'
      },
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

  it('UpdateBooking', () => {
    cy.request({
      method: 'PUT',
      url: 'https://restful-booker.herokuapp.com/booking/2',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${authToken}`
      },
      body: {
        "firstname": "James",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2025-04-28"
        },
        "additionalneeds": "Nova história"
      }
    }).then((response) => {
      console.log('Response Body:', response.body)
      expect(response.status).to.eq(200);
    });
  });

})