<template>
  <title>Lista de Fornecedores - Elder</title>
  <v-layout class="flex-column">
    <v-main>
      <Breadcrumbs :items="breadcrumbs"/>
      <v-container
        class="py-0"
        fluid>
        <v-container
          class="pt-0"
        >
          <v-btn
            class="mb-5"
            color="primary"
            prepend-icon="mdi-chevron-left"
            size="x-large"
            variant="outlined"
            @click="voltar()"
          >
            Voltar
          </v-btn>
          <Tabela
            @excluir="excluir"
            @selecionar-itens-por-pagina="selecionarItensPorPagina"
            :carregando="carregando"
            :headers="headers"
            :items="fornecedores"
            :pagina-atual="paginaAtual"
            :total-paginas="quantidadePaginas"
            :itens-por-pagina="itensPorPagina"
            has-adicionar
            titulo="Fornecedores"/>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
import Breadcrumbs from "@/components/breadcrumbs.vue";
import Tabela from "@/components/tabela.vue";
import {useRoute, useRouter} from "vue-router";
import {mapActions} from "pinia";
import {useAlertStore} from "@/stores/alert";
import {useFornecedoresStore} from "@/stores/fornecedores";

export default {
  components: {Tabela, Breadcrumbs},
  data: () => (
    {
      title: 'Gestão de Estoque',
      searchText: '',
      carregando: false,
      headers: [
        {
          titulo: 'Nome',
          campo: 'name'
        },
        {
          titulo: 'Contato',
          campo: 'contact'
        },
      ],
      fornecedores: [
        {
          id: 999,
          name: 'Atlas',
          contact: '(32) 3343-4397'
        },
        {
          id: 998,
          name: 'Suvinil',
          contact: '(38) 2872-6102'
        },
        {
          id: 997,
          name: 'Coral',
          contact: '(11) 3343-4397'
        },
        {
          id: 996,
          name: 'Sherwin Williams',
          contact: '(32) 3343-4397'
        },
        {
          id: 5,
          name: 'Tintas Renner',
          contact: '(32) 3343-4397'
        },
      ],
      itensPorPagina: 10,
      paginaAtual: 1,
      quantidadePaginas: 5,
    }
  ),
  computed: {
    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    }
  },

  async created() {
    await this.buscarFornecedores();
  },

  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),
    ...mapActions(useFornecedoresStore, ['buscarFornecedoresPaginado', 'excluirFornecedor']),

    async buscarFornecedores() {
      this.carregando = true;
      try {
        const data = await this.buscarFornecedoresPaginado(this.paginaAtual, this.itensPorPagina);
        this.fornecedores = data.content;
        this.quantidadePaginas = Math.ceil(Number(data.totalElements) / data.pageSize);
      } finally {
        this.carregando = false;
      }
    },

    async excluir(fornecedor) {
      try {
        await this.excluirFornecedor(fornecedor.id);
        this.fornecedores.splice(this.fornecedores.indexOf(fornecedor), 1);
      } catch (e) {
        this.showError(`Erro ao excluir fornecedor: ${e.message}`);
      }
    },

    async selecionarItensPorPagina(item) {
      this.itensPorPagina = item;
      await this.buscarFornecedores();
    },

    voltar() {
      this.router.push('/home');
    }
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      router
    }
  }

}
</script>
<style scoped>
</style>
