/// <reference types="cypress" />
import { customer } from "../support/Pages/createPageAPI/createAPI"
import {rctest} from "../addLoad/load"

describe("The test suite", ()=>{
  
    beforeEach(function(){
      
       // cy.loginx('9050', 'hammad.rahaman@optym.com', 'National@1')
       cy.login('admin')
       cy.visit('/')
       let int = Cypress.env('accessToken')
       cy.log('token: ',int)
    })

    it("The test run", ()=>{
        cy.visit('/settings/integrations')
        cy.createCustomerAPI()
    })

    it("test2", ()=>{
       // cy.login('admin')
        cy.createCustomerAPI()
    })

    it("test3", ()=>{
     // cy.login('admin')
      cy.createCustomerAPI()
``
  })

  it.skip("test4", ()=>{
    cy.get("a[id='bengaluru'] h5").invoke('text').then((data)=>{
        cy.log(data);
    })
    
  //  cy.generateUSAddress().debug();
    //cy.createCustomerAPI()
   // cy.quickStart();

})

    it('check name', ()=>{
        cy.log(Cypress.env('customerName'))
        console.log('The main name: ', Cypress.env('customerName'))
        console.log('The location pick1', Cypress.env('pickUpLocation'))
        console.log('dropOff1: ',Cypress.env('dropOffLocation'))
    })

    it('check name', ()=>{
        cy.log(Cypress.env('customerName'))
        console.log('The main name second time: ', Cypress.env('customerName'))
        console.log('The location pick2', Cypress.env('pickUpLocation'))
        console.log('dropOff2: ',Cypress.env('dropOffLocation'))
        
    })

    it('check name', ()=>{
        cy.log(Cypress.env('customerName'))
        console.log('The main name third time: ', Cypress.env('customerName'))
        console.log('The location pick3', Cypress.env('pickUpLocation'))
        console.log('dropOff3: ',Cypress.env('dropOffLocation'))
    })
})