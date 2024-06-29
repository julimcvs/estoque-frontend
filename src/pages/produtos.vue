<template>
  <title>Lista de Produtos - Elder</title>
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
            :items="produtos"
            :pagina-atual="paginaAtual"
            :total-paginas="quantidadePaginas"
            :itensPorPagina="itensPorPagina"
            :carregando="carregando"
            @selecionar-itens-por-pagina="selecionarItensPorPagina"
            has-adicionar
            titulo="Produtos"
            @excluir="excluir"/>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
import Breadcrumbs from "@/components/breadcrumbs.vue";
import Tabela from "@/components/tabela.vue";
import {useRoute, useRouter} from "vue-router";
import {useProdutosStore} from "@/stores/produtos";
import {mapActions} from "pinia";
import {useAlertStore} from "@/stores/alert";

export default {
  components: {Tabela, Breadcrumbs},
  data: () => (
    {
      title: 'Gestão de Estoque',
      carregando: true,
      searchText: '',
      headers: [
        {
          titulo: 'Descrição',
          campo: 'description'
        },
        {
          titulo: 'Preço',
          campo: 'price'
        },
        {
          titulo: 'Categoria',
          campo: 'categoryDescription'
        },
        {
          titulo: 'Fornecedor',
          campo: 'supplierName'
        }
      ],
      produtos: [],
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
    await this.buscarProdutos();
  },

  methods: {
    ...mapActions(useAlertStore, ['showError']),
    ...mapActions(useProdutosStore, ['buscarProdutosPaginado', 'excluirProduto']),

    async buscarProdutos() {
      this.carregando = true;
      try {
        const data = await this.buscarProdutosPaginado(this.paginaAtual, this.itensPorPagina);
        this.produtos = data.content;
        this.quantidadePaginas = Math.ceil(Number(data.totalElements) / data.pageSize);
      } finally {
        this.carregando = false;
      }
    },

    async excluir(produto) {
      try {
        await this.excluirProduto(produto.id);
        this.produtos.splice(this.produtos.indexOf(produto), 1);
      } catch (e) {
        this.showError(`Erro ao excluir produto: ${e.response.data.message}`);
      }
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
