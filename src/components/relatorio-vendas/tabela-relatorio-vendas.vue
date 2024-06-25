<template>
  <v-card
    class="container pa-5"
    elevation="5"
    variant="elevated">
    <v-card-title class="d-flex justify-space-between">
      <div>
        <p class="text-success">
          Faturamento total: R${{ faturamentoTotal.toFixed(2).replace('.', ',') }}
        </p>
      </div>
      <v-btn
        aria-labelledby="tooltip-exportar-relatorio"
        color="success"
        size="x-large"
        text="Exportar Relatório"
        variant="elevated"
        @click="gerarRelatorioVendasXLSX">
        <template v-slot:prepend>
          <v-img
            alt="Imagem Excel do botão de exportar relatório"
            height="30"
            src="/excel.png"
            width="30"/>
        </template>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model:expanded="expanded"
        :headers="headers"
        :items="vendas"
        class="mt-10"
        disable-sort
        item-value="id"
        items-per-page-text="Itens por página"
        show-expand
      >
        <template v-slot:item.saleDate="{ item }">
          <p>{{ new Date(item.saleDate).toLocaleDateString() }}</p>
        </template>
        <template v-slot:item.totalValue="{ item }">
          <p>R$ {{ Number(item.totalValue).toFixed(2).replace('.', ',') }}</p>
        </template>
        <template v-slot:item.data-table-expand="{ internalItem, toggleExpand, isExpanded }">
          <v-btn
            :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            color="primary"
            size="x-large"
            text="Produtos"
            variant="outlined"
            @click="toggleExpand(internalItem)"
          >
          </v-btn>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td
              :colspan="columns.length"
              class="py-5">
              <v-data-table
                :headers="headersProdutos"
                :items="item.products"
                disable-sort
                hide-default-footer
              >
                <template v-slot:top>
                  <p class="py-2 text-primary font-weight-bold">
                    Produtos
                  </p>
                </template>
              </v-data-table>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import {mapActions, mapState} from 'pinia';
import {useRelatorioVendasStore} from "@/stores/relatorio-vendas";

export default {
  data: () => (
    {
      expanded: [],
      headers: [
        {
          title: 'Data da Venda',
          align: 'start',
          sortable: false,
          key: 'saleDate',
        },
        {title: 'Valor Total', key: 'totalValue'},
        {title: 'Quantidade de Itens', key: 'totalItems'},
        {title: 'Ações', key: 'data-table-expand'},
      ],
      headersProdutos: [
        {title: 'Descrição', key: 'description'},
        {title: 'Quantidade', key: 'quantity'},
        {title: 'Valor Unitário', key: 'price'},
        {title: 'Valor Total', key: 'totalValue'},
      ]
    }
  ),
  computed: {
    ...mapState(useRelatorioVendasStore, ['vendas', 'itensPorPagina', 'totalPaginas', 'paginaAtual']),

    faturamentoTotal() {
      if (this.vendas && this.vendas.length > 0) {
        const totalValue = this.vendas
          .map(venda => Number(venda.totalValue))
          .reduce((acc, totalValue) => acc + totalValue, 0);
        console.log(totalValue)
        return totalValue;
      }
      return 0;
    },
  },
  created() {
  },
  methods: {
    ...mapActions(useRelatorioVendasStore, ['gerarRelatorioVendasXLSX']),

  }
}
</script>
<style scoped>
.container {
  border-radius: 10px !important;
}

span, th, td {
  font-size: 18px;
}

.title {
  font-size: 24px;
}
</style>
