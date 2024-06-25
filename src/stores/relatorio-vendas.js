import {defineStore} from "pinia";
import * as XLSX from 'xlsx/xlsx.mjs';

export const useRelatorioVendasStore = defineStore('relatorio-vendas', {
  state: () => ({
    vendas: [
      {
        id: 1,
        itemsAmount: 2,
        creationDate: '01/06/2024',
        totalValue: 549.98,
        products: [
          {
            id: 1,
            name: 'Cimento',
            price: 'R$ 24,99',
            totalValue: 'R$ 49,98',
            amount: 2,
          },
          {
            id: 2,
            name: 'Areia',
            price: 'R$ 100,00',
            totalValue: 'R$ 500,00',
            amount: 5,
          },
        ],
      },
      {
        id: 2,
        itemsAmount: 1,
        creationDate: '02/06/2024',
        totalValue: 89.99,
        products: [
          {
            id: 1,
            name: 'Tinta Branco Neve',
            price: 'R$ 89,99',
            totalValue: 'R$ 89,99',
            amount: 1,
          },
        ],
      },
      {
        id: 3,
        itemsAmount: 1,
        creationDate: '03/06/2024',
        totalValue: 49.90,
        products: [
          {
            id: 1,
            name: 'Machado',
            price: 'R$ 49,90',
            totalValue: 'R$ 49,90',
            amount: 1,
          },
        ],
      }
    ],
  }),
  actions: {
    gerarRelatorioVendasXLSX() {
      const relatorio = this.vendas.map(venda => ({
        'ID': venda.id,
        'Quantidade de Itens': venda.totalItems,
        'Data de Criação': new Date(venda.saleDate).toLocaleDateString(),
        'Valor Total': `R$ ${Number(venda.totalValue).toFixed(2)}`,
        'Produtos': venda.products.map(produto => produto.description)
      }));
      const ws = XLSX.utils.json_to_sheet(relatorio);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Vendas');
      XLSX.writeFile(wb, 'relatorio-vendas.xlsx');
    }
  },
});
