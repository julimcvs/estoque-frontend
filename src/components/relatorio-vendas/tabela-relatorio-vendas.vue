<template>
  <v-card
    class="container pa-5"
    elevation="5"
    variant="elevated">
    <v-card-title class="d-flex justify-space-between">
      <div>
      <p class="text-success">
        Faturamento total: R${{ faturamentoTotal.toFixed(2) }}
      </p>
      </div>
      <v-tooltip
        aria-labelledby="tooltip-exportar-relatorio"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            aria-labelledby="tooltip-exportar-relatorio"
            v-bind="props"
            color="red"
            size="large"
            variant="elevated"
            icon="mdi-file-document"
            @click="exportarRelatorio">
            <v-img
              alt="Exportar PDF"
              src="/pdf.png"
              width="30"
              height="30"/>
          </v-btn>
        </template>
        <span id="tooltip-exportar-relatorio">
          Exportar PDF
        </span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <v-table
        class="table">
        <thead
          class="table-header text-primary">
        <tr>
          <th class="text-left">
            ID
          </th>
          <th>
            Data
          </th>
          <th>
            Número de Itens
          </th>
          <th>
            Valor Total
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          :key="venda.id"
          v-for="venda in vendas">
          <td>
            {{ venda.id }}
          </td>
          <td>
            {{ venda.creationDate }}
          </td>
          <td>
            {{ venda.products.length }}
          </td>
          <td>
            R${{ venda.totalValue.toFixed(2) }}
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-card-actions>
      <div class="w-100 d-flex justify-space-between">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-label>
              Itens por página:
              <v-card
                role="button"
                aria-label="Clique para alterar a quantidade de itens por página."
                class="px-2 py-1 ml-5"
                hover
                rounded="lg"
                v-bind="props"
                variant="outlined">
                {{ itensPorPagina }}
                <v-icon
                  class="ml-1">mdi-chevron-down</v-icon>
              </v-card>
            </v-label>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in menuPaginacao"
              :key="i"
              @click="selecionarItensPorPagina(item)"
            >
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div>
          <v-label>
            Página {{ paginaAtual }} de {{ totalPaginas }}
            <v-pagination
              :length="5"
              :total-visible="5"
              rounded></v-pagination>
          </v-label>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'pinia';
import {useRelatorioVendasStore} from "@/stores/relatorio-vendas";
export default {
  data: () => (
    {

    }
  ),
  computed: {
    ...mapState(useRelatorioVendasStore, ['vendas', 'itensPorPagina', 'totalPaginas', 'paginaAtual']),

    faturamentoTotal() {
      return this.vendas.reduce((acc, venda) => acc + venda.totalValue, 0);
    },
  },
  created() {
  },
  methods: {

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
