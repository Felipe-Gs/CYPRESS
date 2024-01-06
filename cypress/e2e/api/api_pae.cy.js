// https://amo-backend.onrender.com/usuario/eu/mudar/

/// <reference types="Cypress"/>
//Testes para troca de senha do usuario
describe("Testes de funções do aplicativo", () => {
   //testando funcao de senha incorreta
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

   it("Alteração de senha - Sucesso ou Falha", () => {
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

   it("ver dados da minha conta", () => {
      cy.request({
         method: "GET",
         url: `https://amo-backend.onrender.com/usuario/eu/`,

         headers: {
            Authorization:
               "Token " + "d2bd5d88544b198d96b90f3c31588743d8199eaf",
         },
         "Content-Type": "application/json",
      }).then((response) => {
         const { perfil } = response.body;

         expect(response.body).to.have.property("perfil");

         expect(perfil).to.deep.equal({
            id: 30,
            foto: "https://res.cloudinary.com/dlvmqmqcn/image/upload/v1/imagens/F_gomes568884foto_zufwut",
            nome_completo: "Felipe Gomes ",
            nome_exibicao: "F gomes",
            curso: "Engenharia de Software",
            entrada: "2020.2",
            cargos: ["aluno"],
         });
         expect(perfil.nome_completo).to.equal("Felipe Gomes ");
         expect(perfil.cargos[0]).to.equal("aluno");
      });
   });

   it("verificar nomes - Teste de Carga Simples", () => {
      // Número de solicitações concorrentes
      const numberOfRequests = 10;

      // Array de promessas para aguardar a conclusão das solicitações
      const requests = [];

      // Variáveis para medir o tempo médio de resposta
      let totalTime = 0;

      for (let i = 0; i < numberOfRequests; i++) {
         requests.push(
            cy
               .request({
                  method: "GET",
                  url: "https://amo-backend.onrender.com/usuario/eu/",
                  headers: {
                     Authorization:
                        "Token " + "d2bd5d88544b198d96b90f3c31588743d8199eaf",
                  },
                  "Content-Type": "application/json",
               })
               .then((response) => {
                  const { perfil } = response.body;

                  // Verifica se o nome é igual
                  expect(perfil.nome_completo).to.equal("Felipe Gomes ");

                  // Mede o tempo de resposta para cada solicitação
                  const requestTime = response.duration;
                  totalTime += requestTime;
               })
         );
      }

      // Aguarda a conclusão de todas as solicitações e calcula o tempo médio
      return Cypress.Promise.all(requests).then(() => {
         const averageTime = totalTime / numberOfRequests;

         cy.log(`Tempo total: ${totalTime}ms`);
         cy.log(`Tempo médio por solicitação: ${averageTime}ms`);
      });
   });

   it("cadastrar usuario", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/registrar/`,

         headers: {
            "Content-Type": "application/json",
         },

         body: {
            email: "123456@alu.ufc.br",
            password: "12345676g",
         },
         failOnStatusCode: false,
      }).then((response) => {
         if (
            response.body &&
            response.body.error &&
            response.body.error.message
         ) {
            const { error } = response.body;
            expect(error.message).to.equal(
               "Já existe um cadastro utilizando este endereço de e-mail."
            );
         }
      });
   });

   it("senha curta", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/registrar/`,

         headers: {
            "Content-Type": "application/json",
         },

         body: {
            email: "123456@alu.ufc.br",
            password: "12345",
         },
         failOnStatusCode: false,
      }).then((response) => {
         if (
            response.body &&
            response.body.error &&
            response.body.error.message &&
            response.body.error.message.password
         ) {
            const { password } = response.body.error.message;
            // Verifique se a mensagem de erro contém as informações esperadas
            expect(password).to.deep.equal([
               "Senha deve ter pelo menos 8 caracteres.",
               "Senha deve conter pelo menos uma letra.",
            ]);
         }
      });
   });

   it("senha com apenas numeros", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/registrar/`,

         headers: {
            "Content-Type": "application/json",
         },

         body: {
            email: "123456@alu.ufc.br",
            password: "12345564",
         },
         failOnStatusCode: false,
      }).then((response) => {
         const { error } = response.body;
         expect(error.message.password[0]).to.equal(
            "Senha deve conter pelo menos uma letra."
         );
      });
   });

   it("cadastro de email ja usado", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/registrar/`,

         headers: {
            "Content-Type": "application/json",
         },

         body: {
            email: "123456@alu.ufc.br",
            password: "12345564s",
         },
         failOnStatusCode: false,
      }).then((response) => {
         const { error } = response.body;
         expect(error.message).to.equal(
            "Já existe um cadastro utilizando este endereço de e-mail."
         );
      });
   });

   it.only("retornar token do cadastro", () => {
      cy.request({
         method: "POST",
         url: `https://amo-backend.onrender.com/registrar/`,
         headers: {
            "Content-Type": "application/json",
         },
         body: {
            email: "12332145673246@alu.ufc.br",
            password: "12345564s",
         },
         failOnStatusCode: false,
      }).then((response) => {
         if (response.status === 409) {
            expect(response.body.error.message).to.equal(
               "Já existe um cadastro utilizando este endereço de e-mail."
            );
         } else {
            const { auth_token } = response.body.data;
            // verifica se o token retornando é uma string e nao está vazia
            expect(auth_token).to.be.a("string").and.not.be.empty;
         }
      });
   });
});
