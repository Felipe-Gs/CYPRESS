/// <reference types="Cypress"/>

// describe("template spec", () => {
//    it("passes", () => {
//       cy.visit("https://automationpratice.com.br/");
//       cy.get(".form-control").type("felipegomes@gmail.com");
//       cy.get(".clear > .theme-btn-one").click();
//       cy.get(".swal2-confirm").click();
//       // cy.get('[data-test="username"]').type("felipe gomes");
//       // cy.get('[data-test="password"]').type("ola mundo");
//    });

//    it("email invalido", () => {
//       cy.visit("https://automationpratice.com.br/");
//       cy.get(".form-control").type("felipegomesgmail.com");
//       cy.get(".clear > .theme-btn-one").click();
//       // cy.get(".swal2-confirm").click();
//    });
// });

describe("realizar login", () => {
   it("login", () => {
      cy.login_teste("felipe@gmail.com", "123456767");
   });
});
