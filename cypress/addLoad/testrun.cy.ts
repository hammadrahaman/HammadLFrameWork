/// <reference types="cypress" />
import { customer } from "../support/Pages/createPageAPI/createAPI";


describe("The test suite", () => {
  beforeEach(function () {
    cy.visit("/");
    cy.login("ninefour");

    let int: any = Cypress.env("accessToken");
    cy.log("token: ", int);
  });

  it("Delete Integration", () => {
    cy.visit("/settings/integrations");
    cy.deleteintegrationAPI();
  });

  it.only("Create Customer", () => {
    cy.createCustomerAPI();
  });

  it.only("Create Location", () => {
    cy.generateLocation();
  });

  it.only("add load", () => {
    cy.visit("/");
    cy.checkDebug();
  });
});
