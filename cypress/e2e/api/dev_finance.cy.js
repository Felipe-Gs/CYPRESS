/// <reference types="Cypress"/>

describe("Aplicacao dev finançe", () => {
   it("testando entradas", () => {
      //transação de entradas
      CriarTransacao("Freelance", "200");

      cy.get("#totalDisplay").should("contain", "200");
      cy.get(".description").should("contain", "Freelance");
      // Assume que o texto está contido em um elemento com o id "meuTexto"
      //verifica se a entrada é da cor verde claro
      cy.get(".income")
         .should("have.css", "color")
         .and("eq", "rgb(18, 164, 84)");

      //transação de saidas
      CriarTransacao("Cinema", "-200");
      //verifica se a após a saida, o total vai para 0
      cy.get("#totalDisplay").should("have.text", "R$ 0,00");
      cy.get("#expenseDisplay").should("contain", "-R$");
      cy.get('[data-index="0"] > .description').should("contain", "Freelance");
      cy.get('[data-index="1"] > .description').should("contain", "Cinema");
      //verifica se a saida é da cor vermelho claro
      cy.get(".expense")
         .should("have.css", "color")
         .and("eq", "rgb(233, 41, 41)");
   });

   // cy.visit("https://devfinance-agilizei.netlify.app/#");
});

//funcao para simplificar o cod
function CriarTransacao(descricao, valor) {
   cy.visit("https://devfinance-agilizei.netlify.app/#");
   cy.contains("Nova Transação").click();
   // cy.get("#transaction > .button").click();
   cy.get("#description").type(descricao);
   cy.get("#amount").type(valor);
   cy.get("#date").type("2023-02-01");
   cy.get("button").click();
}
