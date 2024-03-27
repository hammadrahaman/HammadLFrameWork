/// <reference types="cypress" />
import { customer } from "../support/Pages/createPageAPI/createAPI";
import { rctest } from "../addLoad/load";

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

  it("Create Customer", () => {
    cy.createCustomerAPI();
  });

  it("Create Location", () => {
    cy.generateLocation();
  });

  it("add load", () => {
    cy.visit("/");
    cy.checkDebug();
  });
});
