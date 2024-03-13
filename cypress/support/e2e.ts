// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
//@ts-ignore
if (Cypress.config("hideXHRInCommandLog")) {
    const app = window.top;

    if (
      app &&
      !app.document.head.querySelector("[data-hide-command-log-request]")
    ) {
      const style = app.document.createElement("style");
      style.innerHTML =
        ".command-name-request, .command-name-xhr { display: none }";
      style.setAttribute("data-hide-command-log-request", "");
      app.document.head.appendChild(style);
    }
  }

  export function silenceFetchLogs(silenceFetchPattern: RegExp | string): void {
    let loggedOnce: boolean = false;
    const originalCypressLog = Cypress.log
    Cypress.log = function (opts, ...other) {
      if (
        opts.displayName === "fetch"
        &&
        ((opts as any).url as string).match(silenceFetchPattern) != null
      ) {
        if (loggedOnce) {
          return
        } else {
          loggedOnce = true;
          opts.displayName = "noisy fetch - will be silenced";
          return originalCypressLog(opts, ...other)
        }
      }
      return originalCypressLog(opts, ...other)
    }
  }

// Alternatively you can use CommonJS syntax:
// require('./commands')