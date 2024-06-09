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
              size="large"
              prepend-icon="mdi-plus"
              variant="elevated"
              @click="adicionar">
              Adicionar
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            append-icon="mdi-magnify"
            color="primary"
            hide-details="auto"
            :label="`Pesquisar ${titulo.toLowerCase()}`"
            v-model="searchText"
            variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn
                  prepend-icon="mdi-filter"
                  append-icon="mdi-chevron-down"
                  aria-label="Clique para selecionar o campo para filtrar."
                  class="py-1 w-100 h-100"
                  hover
                  rounded="lg"
                  v-bind="props"
                  variant="outlined">
                  Filtrar por {{ campoFiltro.titulo }}
                </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in headers"
                :key="i"
                @click="selecionarCampoFiltro(item)"
              >
                <v-list-item-title>
                  {{ item.titulo }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="12" lg="3">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                prepend-icon="mdi-sort"
                append-icon="mdi-chevron-down"
                aria-label="Clique para selecionar o campo para ordenar."
                class="py-1 w-100 h-100"
                hover
                rounded="lg"
                v-bind="props"
                variant="outlined">
                Ordenar por {{ campoOrdenacao.titulo }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in headers"
                :key="i"
                @click="selecionarCampoOrdenacao(item)"
              >
                <v-list-item-title>
                  {{ item.titulo }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-table
        class="table">
        <thead
          class="table-header text-primary">
        <tr>
          <th
            v-for="header in headers"
            class="text-left">
            {{ header.titulo }}
          </th>
          <th>
            Ações
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(item, i) in filteredItems"
          :key="i"
        >
          <td
            v-for="header in headers">
            {{ item[header.campo] }}
          </td>
          <td>
            <div>
              <v-tooltip
                :aria-labelledby="`tooltip-excluir-produto-${i}`"
                location="top"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    :aria-label="`tooltip-excluir-produto-${i}`"
                    color="red"
                    :loading="loading[i]"
                    icon="mdi-delete"
                    v-bind="props"
                    @click="excluir(i)"
                  >
                  </v-btn>
                </template>
                <span
                  :id="`tooltip-excluir-produto-${i}`">
                Excluir
              </span>
              </v-tooltip>
              <v-tooltip
                :aria-labelledby="`tooltip-excluir-produto-${i}`"
                location="top"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="ml-5"
                    :aria-labelledby="`tooltip-editar-produto-${i}`"
                    color="primary"
                    icon="mdi-pencil"
                    v-bind="props"
                    @click="editar(i)"
                  >
                  </v-btn>
                </template>
                <span
                  :id="`tooltip-editar-produto-${i}`">
                Editar
              </span>
              </v-tooltip>
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
              Itens por página:
              <v-card
                id="botao-quantidade-itens"
                role="button"
                aria-label="Clique para alterar a quantidade de itens por página."
                class="px-2 py-1 ml-5"
                hover
                rounded="lg"
                v-bind="props"
                variant="outlined">
                {{ itensPorPagina }}
                <v-icon class="ml-1">mdi-chevron-down</v-icon>
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
import {mapActions} from "pinia";
import {useAlertStore} from "@/stores/alert";

export default {
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
    totalPaginas: {
      type: Number,
      required: true
    }
  },
  data: () => (
    {
      itensPorPagina: null,
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
    this.itensPorPagina = this.menuPaginacao[0];
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
      const path = this.$route.path;
      this.loading[i] = true;
      try {
        this.$emit('excluir', this.items[i]);
        // await axios.delete(`/api${path}/${this.items[i].id}`)
      } catch (e) {
        this.showError("Erro ao excluir");
      } finally {
        this.loading[i] = false;
        this.showSuccess("Excluído com sucesso");
      }
    },

    selecionarItensPorPagina(item) {
      this.itensPorPagina = item;
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

.title {
  font-size: 24px;
}
</style>
