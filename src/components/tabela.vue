<template>
  <v-card
    class="container pa-5"
    elevation="5"
    variant="elevated">
    <v-card-title
      class="pa-5 d-flex justify-space-between text-primary">
      <v-row>
        <v-col cols="12" md="9">
          <div>
            <h1 class="title">
              {{ titulo }}
            </h1>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <div class="w-100 h-100 d-flex justify-end">
            <v-btn
              v-if="hasAdicionar"
              color="primary"
              prepend-icon="mdi-plus"
              size="x-large"
              variant="elevated"
              @click="adicionar">
              Adicionar
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            class="py-5"
            color="primary"
            hide-details="auto"
            variant="outlined">
            <template v-slot:label>
              <p>
                Pesquisar {{ titulo.toLowerCase() }}
              </p>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div
        v-if="carregando"
      >
      <v-progress-linear
        color="primary"
        indeterminate>
      </v-progress-linear>
        <v-skeleton-loader
          class="mt-5"
          type="table-tbody">
        </v-skeleton-loader>
      </div>
      <v-table
        v-else
        class="table">
        <thead
          class="table-header text-primary">
        <tr>
          <th
            v-for="header in headers"
            class="header text-left">
            <p>{{ header.titulo }}</p>
          </th>
          <th class="text-center header">
            <p>Ações</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-if="filteredItems.length === 0">
          <td
            :colspan="headers.length + 1"
            class="text-center py-10">
            <p>Nenhum item encontrado.</p>
          </td>
        </tr>
        <tr
          v-else
          v-for="(item, i) in filteredItems"
          :key="i"
        >
          <td
            v-for="header in headers"
            class="field">
            <p>{{ item[header.campo] }}</p>
          </td>
          <td class="py-10 d-flex align-center justify-center">
            <div>
              <v-btn
                :aria-labelledby="`tooltip-editar-produto-${i}`"
                color="primary"
                prepend-icon="mdi-pencil"
                size="x-large"
                text="Editar"
                v-bind="props"
                @click="editar(i)"
              >
              </v-btn>
              <v-btn
                :aria-label="`tooltip-excluir-produto-${i}`"
                :loading="loading[i]"
                class="ml-5"
                color="red"
                prepend-icon="mdi-delete"
                size="x-large"
                text="Excluir"
                v-bind="props"
                @click="excluir(i)"
              >
              </v-btn>
            </div>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-card-actions>
      <div class="w-100 d-flex justify-space-between">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-label for="botao-quantidade-itens">
              <p>Itens por página:</p>
              <v-card
                id="botao-quantidade-itens"
                aria-label="Clique para alterar a quantidade de itens por página."
                class="px-2 py-1 ml-5"
                hover
                role="button"
                rounded="lg"
                v-bind="props"
                variant="outlined">
                <p>{{ itensPorPagina }}</p>
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
                <p>{{ item }}</p>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div>
          <v-label>
            <p>Página {{ paginaAtual }} de {{ totalPaginas }}</p>
            <v-pagination
              :length="totalPaginas"
              :total-visible="5"
              rounded>
            </v-pagination>
          </v-label>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
import {mapActions} from "pinia";
import {useAlertStore} from "@/stores/alert";

export default {
  emits: ['excluir', 'selecionar-itens-por-pagina'],
  props: {
    hasAdicionar: {
      type: Boolean,
      required: false,
      default: false
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    paginaAtual: {
      type: Number,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    itensPorPagina: {
      type: Number,
      required: true
    },
    totalPaginas: {
      type: Number,
      required: true
    },
    carregando: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => (
    {
      campoFiltro: null,
      campoOrdenacao: null,
      menuPaginacao: [10, 15, 20],
      searchText: '',
      loading: []
    }
  ),
  computed: {
    filteredItems() {
      if (!this.searchText || this.searchText === '') {
        return this.items;
      }
      return this.items.filter(item => {
          const itemString = String(item[this.campoFiltro.campo]);
          return itemString.toLowerCase().includes(this.searchText.toLowerCase());
        }
      ).sort((a, b) => {
        if (a[this.campoOrdenacao.campo] < b[this.campoOrdenacao.campo]) {
          return -1;
        }
        if (a[this.campoOrdenacao.campo] > b[this.campoOrdenacao.campo]) {
          return 1;
        }
        return 0;
      })
    }
  },
  created() {
    this.campoFiltro = this.headers[1];
    this.campoOrdenacao = this.headers[1];
    this.items.forEach(() => {
      this.loading.push(false);
    });
  },
  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),

    adicionar() {
      const path = this.$route.path;
      this.$router.push(`${path}/adicionar`)
    },

    editar(i) {
      const item = this.items[i];
      const path = this.$route.path;
      this.$router.push(`${path}/adicionar?id=${item.id}`);
    },

    async excluir(i) {
        this.$emit('excluir', this.items[i]);
    },

    selecionarItensPorPagina(item) {
      this.$emit('selecionar-itens-por-pagina', item);
    },

    selecionarCampoFiltro(filtro) {
      this.campoFiltro = filtro;
    },

    selecionarCampoOrdenacao(ordenacao) {
      this.campoOrdenacao = ordenacao;
    },
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
</style>
