/// <reference types="cypress" />

export function login(testRole){
    cy.fixture('dots').then((data)=>{
        console.log("email", data.ninefour.dot)
        let dot: string;
        let email: string;
        let password: string;

        switch (testRole) {
            case 'admin':
            case 'altosexpress':
            case 'prod_admin':
            case 'ninefour':
                dot = data[testRole].dot;
                email = data[testRole].email;
                password = data[testRole].password;
                cy.log(`${testRole} - dot: ${dot}, email: ${email}, password: ${password}`);
                break;
            default:
                cy.log('Credentials invalid from login service file');
        }
        
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
    
}