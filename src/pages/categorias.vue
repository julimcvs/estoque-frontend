<template>
  <title>Lista de Categorias - Elder</title>
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
            :headers="headers"
            :items="categorias"
            :pagina-atual="paginaAtual"
            :itens-por-pagina="itensPorPagina"
            :total-paginas="quantidadePaginas"
            :carregando="carregando"
            has-adicionar
            @excluir="excluir"
            @selecionar-itens-por-pagina="selecionarItensPorPagina"
            titulo="Categorias"/>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
import Breadcrumbs from "@/components/breadcrumbs.vue";
import Tabela from "@/components/tabela.vue";
import {useRoute, useRouter} from "vue-router";
import {useAlertStore} from "@/stores/alert";
import {mapActions} from "pinia";
import {useCategoriasStore} from "@/stores/categorias";

export default {
  components: {Tabela, Breadcrumbs},
  data: () => (
    {
      carregando: false,
      title: 'Gestão de Estoque',
      searchText: '',
      headers: [
        {
          titulo: 'ID',
          campo: 'id'
        },
        {
          titulo: 'Descrição',
          campo: 'description'
        },
      ],
      categorias: [],
      itensPorPagina: 10,
      paginaAtual: 1,
      quantidadePaginas: 5,
    }
  ),

  async created() {
    await this.buscarCategorias();
  },

  computed: {
    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    }
  },

  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),
    ...mapActions(useCategoriasStore, ['buscarCategoriasPaginado', 'excluirCategoria']),

    async buscarCategorias() {
      this.carregando = true;
      try {
        const data = await this.buscarCategoriasPaginado(this.paginaAtual, this.itensPorPagina);
        this.categorias = data.content;
        this.quantidadePaginas = Math.ceil(Number(data.totalElements) / data.pageSize);
      } finally {
        this.carregando = false;
      }
    },

    async excluir(categoria) {
      try {
        await this.excluirCategoria(categoria.id);
        this.categorias.splice(this.categorias.indexOf(categoria), 1);
      } catch (e) {
        this.showError(`Erro ao excluir categoria: ${e.response.data.message}`);
      }
    },

    async selecionarItensPorPagina(item) {
      this.itensPorPagina = item;
      await this.buscarCategorias();
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
