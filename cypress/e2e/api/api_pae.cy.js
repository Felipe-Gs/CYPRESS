// https://amo-backend.onrender.com/usuario/eu/mudar/

/// <reference types="Cypress"/>
describe("Testes de funções do aplicativo", () => {
   it("Senha atual incorreta", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/usuario/eu/mudar/`,

         headers: {
            Authorization:
               "Token " + "d2bd5d88544b198d96b90f3c31588743d8199eaf",
         },
         "Content-Type": "application/json",

         body: {
            senha_velha: "a12345678",
            senha_nova: "felipe",
            confirma: "felipe3",
         },
         failOnStatusCode: false,
      }).then((response) => {
         expect(response.body.erro).to.equal("senha atual incorreta");
         cy.log(response.body.erro);
      });
   });

   it("senhas nao conicidem", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/usuario/eu/mudar/`,

         headers: {
            Authorization:
               "Token " + "d2bd5d88544b198d96b90f3c31588743d8199eaf",
         },
         "Content-Type": "application/json",

         body: {
            senha_velha: "a1234567",
            senha_nova: "felipe3",
            confirma: "felipe333",
         },
         failOnStatusCode: false,
      }).then(({ body }) => {
         const { erro } = body;
         expect(erro).to.equal("senhas não coincidem");
      });
   });

   it.only("Alteração de senha - Sucesso ou Falha", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/usuario/eu/mudar/`,

         headers: {
            Authorization:
               "Token " + "d2bd5d88544b198d96b90f3c31588743d8199eaf",
         },
         "Content-Type": "application/json",

         body: {
            senha_velha: "a12345",
            senha_nova: "a1234",
            confirma: "a12345",
         },
         failOnStatusCode: false,
      }).then((response) => {
         if (response.status === 200) {
            const { sucesso } = response.body;
            expect(sucesso).to.equal("senha alterada com sucesso!");
         } else if (response.status === 403) {
            const { erro } = response.body;
            expect(erro).to.equal("senha atual incorreta");
         } else if (response.status === 400) {
            const { erro } = response.body;
            expect(erro).to.equal("senhas não coincidem");
         }
      });
   });
});
