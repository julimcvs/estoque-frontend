<template>
  <v-container>
    <p class="titulo text-center py-5 text-primary">
      Página de Confirmação - Movimentação de Estoque
    </p>
    <v-divider class="d-block my-5"/>
    <v-container class="py-5">
      <div class="campos-confirmacao text-wrap">
        <p>
          <strong>Tipo de Movimentação:</strong>
          {{ form.tipoMovimentacao.title }}
        </p>
        <TabelaProdutosMovimentacao
          :editable="false"
          class="mt-5"/>
      </div>
    </v-container>
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
        :loading="loading"
        append-icon="mdi-check-circle"
        class="ml-5"
        color="success"
        size="x-large"
        type="submit"
        variant="elevated"
        @click="confirmar"
      >
        Confirmar
      </v-btn>
    </v-container>
  </v-container>
</template>
<script>
import {mapActions, mapState, mapWritableState} from "pinia";
import {useMovimentacaoEstoqueStore} from "@/stores/movimentacao-estoque";
import {useAlertStore} from "@/stores/alert";
import TabelaProdutosMovimentacao from "@/components/movimentacoes-estoque/tabela-produtos.vue";

export default {
  name: 'ConfirmacaoMovimentacao',
  components: {TabelaProdutosMovimentacao},

  computed: {
    ...mapState(useMovimentacaoEstoqueStore, ['form']),
    ...mapWritableState(useMovimentacaoEstoqueStore, ['currentStep']),
  },

  data: () => ({
    loading: false,
  }),

  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),
    ...mapActions(useMovimentacaoEstoqueStore, ['limparFormulario']),

    confirmar() {
      this.loading = true;
      setTimeout(() => {
        this.limparFormulario();
        this.loading = false;
        this.showSuccess('Movimentação realizada com sucesso!');
        this.$router.push('/home');
      }, 1000);
    },

    prev() {
      this.currentStep--;
    },
  }
}
</script>
<style scoped>
.campos-confirmacao {
  font-size: 22px;
}

.titulo {
  font-size: 30px;
}
</style>
