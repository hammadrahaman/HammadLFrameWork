// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as login from '../support/login/login'
//import 'cypress-xpath';
import {customerDeleteAPI} from './Pages/deletePageAPI/deleteAPI '
import {customercreateAPI} from './Pages/createPageAPI/createAPI'
//import {glocation} from './Pages/createPageAPI/locationservice'
//import {quickStart} from '../addLoad/load'
import {testexport} from './Pages/createPageAPI/test'
import {generateLocation} from './Pages/createPageAPI/locationAPI'
const { faker } = require('@faker-js/faker');
import {rctest} from '../addLoad/load'


Cypress.Commands.add('login', (role) => {
    cy.session('loginSession', () => {
        cy.visit('/');
        cy.log('role', role);

        const roleMap = {
            'admin': 'admin',
            'ninefour': 'ninefour',
            'altosexpress': 'altosexpress',
            'prod_admin': 'prod_admin'
        };

        if (roleMap[role]) {
            login.login(roleMap[role]);
        } else {
            cy.log('Credentials invalid');
        }
    });
});



Cypress.Commands.add('deleteintegrationAPI', ()=>{
        cy.request({
            method: 'GET',  url: `/web/factoring/api/v2/integrations/factoringDetails?organizationId=${Cypress.env('originitionID')}`,
            headers: {'Mp-Auth-Token': Cypress.env('accessToken')},
              failOnStatusCode: false}).then((response:any)=>{
              console.log('Response body',  response.body)
              console.log('Respnse body DTO', response.body.integrationsDTO)
                const cred= response.body.integrationsDTO
                console.log('cred', cred)
                //@ts-ignore
                const allIds = Object.values(cred).flatMap(array => array.map(item => item.id));
                
                console.log('All IDs:', allIds);
                allIds.forEach((id)=>{
                    cy.request({method: 'DELETE', url: `/web/factoring/api/v2/integrations?id=${id}`,
                        headers: { 'Mp-Auth-Token': Cypress.env('accessToken') },
                          failOnStatusCode: false
                    }).then((res1)=>{console.log('response of deletion' ,id,  res1.status) })
                })
            })
        })
    

Cypress.Commands.add('deleteCustomer', ()=>{
    customerDeleteAPI()
})
Cypress.Commands.add("checkDebug", ()=>{
    rctest()
})
Cypress.Commands.add('createCustomerAPI', ()=>{

    for(let i=0; i<=0;i++){ // run if you want to create multiple customers
    customercreateAPI()
    }
})

Cypress.Commands.add("generateLocation", ()=>{
    generateLocation();
})

//test example for login
Cypress.Commands.add('loginx', (dot:string,email:string,password:string )=>{
    cy.session('loginsession', ()=>{
        cy.contains('DOT').parent().find('input').type(dot)
    cy.contains('Email').parent().find('input').type(email)
    cy.contains('Password').parent().find('input').type(password)
    cy.intercept('POST', '/web/auth/api/v2/users/login/company').as(
        'waitLogin'
    );
    cy.contains('button', 'Sign In').click();
    cy.wait('@waitLogin').then((interception) => {;
        const loginApiResponse:any = interception.response;
        const responseData = loginApiResponse.body;
        const token = responseData.token;
        const orgID = responseData.organizationId;
        Cypress.env('originitionID', orgID)
        Cypress.env('accessToken', token);
        // to use this it will be Cypress.env('accessToken'); in other file.  and  Cypress.env('originitionID')
        console.log('token', token)
    })
    
    })
    })



// cypress/support/commands.js




Cypress.Commands.add("generateUSAddress", ()=>{
    generateLocation()
})

Cypress.Commands.add('quickStart', ()=>{
    //quickStart()
})




