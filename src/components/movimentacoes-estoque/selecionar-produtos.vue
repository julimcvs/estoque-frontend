<template>
  <v-container class="pb-0">
    <p class="titulo text-primary text-center">
      Selecione os produtos para a movimentação ({{ form.tipoMovimentacao.title }})
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
              <p id="tooltip-produtos">
                Selecione os produtos para a movimentação. Em seguida preencha a quantidade na tabela abaixo.
              </p>
            </v-tooltip>
          </template>
        </v-autocomplete>
      </v-container>
      <TabelaProdutosMovimentacao
        :editable="true"/>
      <v-container class="pb-0 d-flex justify-space-between">
        <v-btn
          class="ml-5"
          color="primary"
          prepend-icon="mdi-chevron-left"
          size="x-large"
          variant="outlined"
          @click="prev"
        >
          Voltar
        </v-btn>
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
import {mapActions, mapState, mapWritableState} from "pinia";
import {useMovimentacaoEstoqueStore} from "@/stores/movimentacao-estoque";
import TabelaProdutosMovimentacao from "@/components/movimentacoes-estoque/tabela-produtos.vue";
import {useProdutosStore} from "@/stores/produtos";

export default {
  name: 'SelecionarProdutosMovimentacao',
  components: {TabelaProdutosMovimentacao},
  data: () => ({
    produtoSelecionado: null,
  }),

  computed: {
    ...mapWritableState(useMovimentacaoEstoqueStore, ['produtos', 'form', 'currentStep']),

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

    prev() {
      this.currentStep--;
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
