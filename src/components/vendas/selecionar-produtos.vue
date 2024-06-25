<template>
  <v-container class="pb-0">
    <p class="titulo text-white text-center">
      Selecione os produtos para a venda
    </p>

    <v-form
      ref="form"
      fast-fail
      @submit.prevent="next">
      <v-container>
        <v-autocomplete
          v-model="produtosSelecionados"
          :items="produtos"
          :rules="[minLength]"
          chips
          clear-on-select
          item-title="description"
          item-value="id"
          label="Produto"
          multiple
          no-data-text="Nenhum produto encontrado."
          prepend-inner-icon="mdi-package-variant-closed"
          variant="outlined"
          @update:model-value="selecionarProduto($event)">
          <template v-slot:append-inner>
            <v-icon color="grey">
              mdi-information
            </v-icon>
            <v-tooltip
              activator="parent"
              aria-labelledby="tooltip-produtos"
              location="bottom"
            >
              <span id="tooltip-produtos">Selecione os produtos para a venda. Em seguida preencha a quantidade na tabela abaixo.</span>
            </v-tooltip>
          </template>
        </v-autocomplete>
      </v-container>
      <TabelaProdutosVendas
        :editable="true"/>
      <v-container class="pb-0 d-flex justify-end">
        <v-btn
          append-icon="mdi-chevron-right"
          class="ml-5"
          color="primary"
          size="x-large"
          type="submit"
          variant="elevated"
        >
          Próximo
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>
<script>
import {mapActions, mapWritableState} from "pinia";
import {useVendasStore} from "@/stores/vendas";
import TabelaProdutosVendas from "@/components/vendas/tabela-produtos.vue";
import {useProdutosStore} from "@/stores/produtos";

export default {
  name: 'SelecionarProdutosVendas',
  components: {TabelaProdutosVendas},
  data: () => ({
    produtoSelecionado: null,
  }),

  computed: {
    ...mapWritableState(useVendasStore, ['form', 'produtos', 'currentStep']),

    getValorTotal() {
      const valorTotal = this.form.produtosSelecionados.reduce((acc, produto) => acc + produto.price, 0);
      return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    },

    produtosSelecionados() {
      return this.form.produtosSelecionados.map(produto => produto.id);
    }
  },

  async created() {
    await this.buscarProdutos();
  },

  methods: {
    ...mapActions(useProdutosStore, ['buscarTodosProdutos']),

    async buscarProdutos() {
      this.produtos = await this.buscarTodosProdutos();
    },

    minLength(value) {
      return value.length > 0 || 'Selecione pelo menos um produto';
    },

    next() {
      this.$refs.form.validate().then(state => {
        if (state.valid) {
          this.currentStep++;
        }
      });
    },

    selecionarProduto(produtosIds) {
      this.form.produtosSelecionados = this.produtos.filter(produto => produtosIds.includes(produto.id));
    },
  }
}
</script>
<style scoped>
.titulo {
  font-size: 30px;
}
</style>
