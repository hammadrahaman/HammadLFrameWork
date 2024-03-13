declare namespace Cypress {
      interface Chainable {
        login(string)
        deleteintegrationAPI()
        deleteCustomer()
        createCustomerAPI()
        generateUSAddress()
        loginx(dot: string, email: string, password: string): Chainable;
        quickStart()
        checkDebug()
      }
      interface ResolvedConfigOptions {
        hideXHRInCommandLog?: boolean;
      }
    }
  