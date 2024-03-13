

describe("Delete API Suite", ()=>{
    it("Delete API integration", ()=>{
        cy.login('admin')
        cy.deleteintegrationAPI()
    })
})