/// <reference types="cypress" />

import { any } from "cypress/types/bluebird";

const fake = require( '../fakeFunction.ts/fake')



export let customer:string='';

export function customercreateAPI(){
    const customerData= 
    {
        "organizationId": Cypress.env('originitionID'),
        "contacts": [
            {
                "description": "created through API",
                "phoneData": {
                    "countryCode": 'USA',
                    "phone": fake('phone')
                },
                "email": fake('email'),
                "isPrimary": true,
                "fullName": fake('fullName')
            }
        ],
        "commodityTypes": [],
        "name": fake('name'),
        "type": "Shipper",
        "notes": null,
        "status": true,
        "customerPreference": "NONE",
        "addressDTO": {
            "fullAddress": fake('fullAddress'),
            "address": fake('address'),
            "city": fake('city'),
            "state": "AZ",
            "streetAddress": fake('streetAddress'),
            "streetAddress2": null,
            "zip": fake('zip')
        },
        "mc": 131095,
        "useFactoring": false,
        "factoringId": "",
        "ediCustomerId": ""
    }
    cy.request({
        method: 'POST',
        url: '/web/customer/api/v2/customers/customer/create',
        body: customerData,
        headers:{
            'Mp-Auth-Token': Cypress.env('accessToken')
        },
        failOnStatusCode: false
    }).then((respone)=>{
        expect(respone.status).to.equal(200);
        console.log('customerName: ', respone.body.name);
        // Export the name to the NameExporter module
        Cypress.env('customerName', respone.body.name)
        customer = Cypress.env('customerName')
        console.log('customerenv', customer)
        cy.log(" The name of the customer: ",customer)
    })

    }


    