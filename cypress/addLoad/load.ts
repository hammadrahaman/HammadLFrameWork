/// <reference types="cypress" />

export function loadCustomer() {
  let rc =
    "Have a Rate Confirmation PDF? If its from one of our supported vendors we'll scrape the data.Drag/Drop Ratecon PDF or click to browse filesORDo you often run the same lanes? Save any load as a template and then use it to prefill a new load.Choose a templateChoose a templateTip: Tab off last field to move to first field in next section; Shift+Tab on any field to skip to next section";
  cy.contains("Add Load").click();
  cy.get('div[aria-labelledby="quick-start"]')
    .invoke("text")
    .then((data) => {
      expect(data).to.equal(rc);
    });
  //need to work on templates from QuickStart
  // cy.get(`a[href="javascript:void(0)"]`).click();
  //Cypress.env('customerName')

  //customer section
  cy.get("#customer").click();
  cy.get("#createLoad-customer-name").type(Cypress.env("customerName"));
  cy.wait(1000);
  cy.get("#createLoad-customer-name-option-0").click();
  cy.get("#createLoad-customer-referenceNumber").type("9035351268");
}

export function loadStops() {
  cy.get(`#stops`).click();
  cy.get("#createLoad-stop-businessname")
    .eq(0)
    .type(Cypress.env("pickUpLocation"));
  cy.wait(3000);
  cy.get("#createLoad-stop-businessname-option-0").click();
  cy.wait(3000);
  cy.get("#createLoad-stop-businessname").type(Cypress.env("dropOffLocation"));
  cy.wait(3000);
  cy.get("#createLoad-stop-businessname-option-0").click();
}
