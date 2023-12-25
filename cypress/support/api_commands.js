/// <reference types="Cypress"/>

Cypress.Commands.add("api_commands", (method, parametro, email, password) => {
   cy.request({
      method: method,
      url: `http://localhost:3000/${parametro} `,
      body: {
         email: email,
         password: password,
      },
   });
});
