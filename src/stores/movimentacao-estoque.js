import {defineStore} from "pinia";
import axios from "axios";

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
    produtos: [],
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
    },

    async movimentarEstoque(form) {
      const stocks = form.produtosSelecionados.map(produto => ({
        productId: produto.id,
        quantity: produto.amount
      }));
      const body = {
        stocks,
        add: form.tipoMovimentacao.title === 'Entrada'
      }
      const url = `${import.meta.env.VITE_API_URL}/stock`;
      await axios.post(url, body);
    }
  }
})
