import {defineStore} from "pinia";
import axios from "axios";

export const useVendasStore = defineStore('vendas', {
  state: () => ({
    currentStep: 0,
    steps: [
      {
        title: 'Produtos',
        icon: 'mdi-package-variant-closed',
      },
      {
        title: 'Confirmação',
        icon: 'mdi-check-circle',
      }
    ],
    produtos: [],
    form: {
      produtosSelecionados: []
    },
  }),
  actions: {

    async buscarVendasPorIntervalo(form) {
      const body = {
        startDate: this.parseDateString(form.startDate),
        endDate: this.parseDateString(form.endDate),
      }
      const url = `${import.meta.env.VITE_API_URL}/sale/report`;
      const res = await axios.post(url, body);
      return res.data;
    },

    limparFormulario() {
      this.form = {
        produtosSelecionados: []
      };
      this.produtos.forEach(produto => {
        produto.amount = null;
      })
      this.currentStep = 0;
    },

    parseDateString(dateString) {
      const [datePart, timePart] = dateString.split(', ');

      const [day, month, year] = datePart.split('/').map(Number);

      const [hours, minutes, seconds] = timePart.split(':').map(Number);

      return new Date(year, month - 1, day, hours, minutes, seconds);
    },

    async realizarVenda(form) {
      const products = form.produtosSelecionados.map(produto => ({
        productId: produto.id,
        quantity: Number(produto.amount)
      }));
      const body = {
        products,
      }
      const url = `${import.meta.env.VITE_API_URL}/sale`;
      await axios.post(url, body);
    }
  }
})
