import {defineStore} from "pinia";

export const useMovimentacaoEstoqueStore = defineStore('movimentacao-estoque', {
  state: () => ({
    currentStep: 0,
    steps: [
      {
        title: 'Movimentação',
        icon: 'mdi-swap-horizontal',
      },
      {
        title: 'Produtos',
        icon: 'mdi-package-variant-closed',
      },
      {
        title: 'Confirmação',
        icon: 'mdi-check-circle',
      }
    ],
    movimentacoes: [
      {
        title: 'Entrada',
        icon: 'mdi-package-down',
      },
      {
        title: 'Saída',
        icon: 'mdi-package-up',
      },
    ],
    produtos: [
      {
        id: 1,
        description: 'Coca-Cola',
        price: 5.00,
        category: 'Refrigerante',
        supplier: 'Coca-Cola'
      },
      {
        id: 2,
        description: 'Pepsi',
        price: 4.50,
        category: 'Refrigerante',
        supplier: 'Pepsi'
      },
      {
        id: 3,
        description: 'Fanta',
        price: 4.00,
        category: 'Refrigerante',
        supplier: 'Coca-Cola'
      },
      {
        id: 4,
        description: 'Sprite',
        price: 3.50,
        category: 'Refrigerante',
        supplier: 'Coca-Cola'
      },
      {
        id: 5,
        description: 'Guaraná',
        price: 3.00,
        category: 'Refrigerante',
        supplier: 'Guaraná Antártica'
      },
      {
        id: 6,
        description: 'Água',
        price: 2.50,
        category: 'Líquido',
        supplier: 'Igarapé'
      },
      {
        id: 7,
        description: 'Suco',
        price: 2.00,
        category: 'Líquido',
        supplier: 'Del Valle'
      },
      {
        id: 8,
        description: 'Guarapan',
        price: 1.50,
        category: 'Refrigerante',
        supplier: 'Coca-Cola'
      },
      {
        id: 9,
        description: 'Cerveja',
        price: 1.00,
        category: 'Bebida Alcoólica',
        supplier: 'Bohemia'
      },
      {
        id: 10,
        description: 'Vinho',
        price: 0.50,
        category: 'Bebida Alcoólica',
        supplier: 'Pérgola'
      }
    ],
    form: {
      tipoMovimentacao: null,
      produtosSelecionados: []
    },
  }),
  actions: {
    limparFormulario() {
      this.form = {
        tipoMovimentacao: null,
        produtosSelecionados: []
      };
      this.produtos.forEach(produto => {
        produto.amount = null;
      });
      this.currentStep = 0;
    }
  }
})
