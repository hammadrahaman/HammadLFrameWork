

describe("Delete API Suite", ()=>{
    it("Delete API integration", ()=>{
        cy.login('ninefour')
        cy.deleteintegrationAPI()
    })
})