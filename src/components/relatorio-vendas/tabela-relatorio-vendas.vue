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
      <v-btn
        aria-labelledby="tooltip-exportar-relatorio"
        color="red"
        size="x-large"
        variant="elevated"
        @click="exportarRelatorio">
        <template v-slot:prepend>
          <v-img
            alt="Exportar PDF"
            height="30"
            src="/pdf.png"
            width="30"/>
        </template>

        <p>
          Exportar PDF
        </p>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-table
        class="table mt-10">
        <thead
          class="table-header text-primary">
        <tr>
          <th class="text-left">
            <p>
              ID
            </p>
          </th>
          <th>
            <p>
              Data
            </p>
          </th>
          <th>
            <p>
              Número de Itens
            </p>
          </th>
          <th>
            <p>
              Valor Total
            </p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="venda in vendas"
          :key="venda.id">
          <td>
            <p>
              {{ venda.id }}
            </p>
          </td>
          <td>
            <p>
              {{ venda.creationDate }}
            </p>
          </td>
          <td>
            <p>
              {{ venda.products.length }}
            </p>
          </td>
          <td>
            <p>
              R${{ venda.totalValue.toFixed(2) }}
            </p>
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
                aria-label="Clique para alterar a quantidade de itens por página."
                class="px-2 py-1 ml-5"
                hover
                role="button"
                rounded="lg"
                v-bind="props"
                variant="outlined">
                {{ itensPorPagina }}
                <v-icon
                  class="ml-1">mdi-chevron-down
                </v-icon>
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
import {mapState} from 'pinia';
import {useRelatorioVendasStore} from "@/stores/relatorio-vendas";

export default {
  data: () => (
    {}
  ),
  computed: {
    ...mapState(useRelatorioVendasStore, ['vendas', 'itensPorPagina', 'totalPaginas', 'paginaAtual']),

    faturamentoTotal() {
      return this.vendas.reduce((acc, venda) => acc + venda.totalValue, 0);
    },
  },
  created() {
  },
  methods: {}
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
