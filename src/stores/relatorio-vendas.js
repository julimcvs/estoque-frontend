import {defineStore} from "pinia";

export const useRelatorioVendasStore = defineStore('relatorio-vendas', {
  state: () => ({
    vendas: [
      {
        id: 1,
        creationDate: '2024-01-01',
        totalValue: 124.99,
        products: [
          {
            id: 1,
            name: 'Produto 1',
            price: 24.99,
            quantity: 1,
          },
          {
            id: 2,
            name: 'Produto 2',
            price: 100,
            quantity: 1,
          },
        ],
      }
    ],
  }),
  actions: {
    async buscarVendas() {
      this.vendas = await fetch('/api/vendas').then((res) => res.json())
    },
  },
});
