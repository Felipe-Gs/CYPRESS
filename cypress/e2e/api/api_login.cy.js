/// <reference types="Cypress"/>

describe("API - teste funcional de login", () => {
   it("Deve realizar o login", () => {
      cy.api_commands("POST", "login", "fulano@qa.com", "teste").then(
         (response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal(
               "Login realizado com sucesso"
            );
            cy.log(response.body.message);
         }
      );
   });
   it("Login invalido", () => {
      cy.request({
         method: "POST",
         url: "http://localhost:3000/login",
         body: {
            email: "fulano@qa.com",
            password: "senhaincorreta",
         },
         failOnStatusCode: false,
      }).then((response) => {
         expect(response.status).to.equal(401);
         expect(response.body.message).to.equal("Email e/ou senha inválidos");
         cy.log(response.body.message);
      });
   });

   it("deve listar os usuraios", () => {
      cy.request({
         method: "GET",
         url: "http://localhost:3000/",
      }).then((response) => {
         expect(response.status).to.equal(200);
         cy.log(response.body.message);
      });
   });
});
