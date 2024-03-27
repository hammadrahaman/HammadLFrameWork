/// <reference types="cypress" />

export function customerDeleteAPI() {
  cy.request({
    method: "PUT",
    url: `web/customer/api/v2/customers/get/customer/list?organizationId=${Cypress.env(
      "originitionID"
    )}&pageNumber=1&pageSize=100&sort=%2Bname`,
    body: {
      customerPreferenceFilter: null,
    },
    headers: {
      "Mp-Auth-Token": Cypress.env("accessToken"),
    },
    failOnStatusCode: false,
  }).then((res) => {
    console.log("respone: ", res.body);
    let content = res.body.content;
    console.log("id", content);
    let allIDs = Object.values(content).flatMap((list) => list);
    //@ts-ignore
    let id = allIDs.map((index) => index.id);
    console.log("id", id);
    id.forEach((num) => {
      cy.request({
        method: "DELETE",
        url: `/web/customer/api/v2/customers/customer?organizationId=${Cypress.env(
          "originitionID"
        )}&id=${num}`,
        headers: { "Mp-Auth-Token": Cypress.env("accessToken") },
        failOnStatusCode: false,
      }).then((response) => {
        let stat = response.body;
        console.log("status", stat);
        if (stat === 'message :"Customer deleted with all attributes"') {
          cy.log("The customer is deleted successfully");
        } else {
          cy.log("The customer is not deleted, perhaps would be used in loads");
        }
      });
    });
  });
}
