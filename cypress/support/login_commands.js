/// <reference types="Cypress"/>

Cypress.Commands.add("login_teste", (email, senha) => {
   cy.visit("https://automationpratice.com.br/");
   cy.get(".right_list_fix > :nth-child(1) > a").click();
   cy.get("#user").type(email);
   cy.get("#password").type(senha);
   cy.get("#btnLogin").click();
   cy.get(".swal2-confirm").click();
   cy.get(".nav > :nth-child(2) > a").click();
   cy.get(".title").should("contain", "Orders");
});
