<template>
  <v-container>
    <p class="titulo text-center py-5 text-primary">
      Página de Confirmação - Venda
    </p>
    <v-divider class="d-block mt-5"/>
    <v-container>
      <div class="campos-confirmacao text-wrap">
        <TabelaProdutosVendas
          :editable="false"/>
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
import {useAlertStore} from "@/stores/alert";
import {useVendasStore} from "@/stores/vendas";
import TabelaProdutosVendas from "@/components/vendas/tabela-produtos.vue";

export default {
  name: 'ConfirmacaoVendas',
  components: {TabelaProdutosVendas},

  computed: {
    ...mapState(useVendasStore, ['form']),
    ...mapWritableState(useVendasStore, ['currentStep'])
  },

  data: () => ({
    loading: false,
  }),

  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),
    ...mapActions(useVendasStore, ['limparFormulario', 'realizarVenda']),

    async confirmar() {
      this.loading = true;
      try {
        await this.realizarVenda(this.form);
        this.showSuccess('Venda efetuada com sucesso!');
        this.limparFormulario();
        this.$router.push('/home')
      } catch (e) {
        this.showError(`Erro ao efetuar venda: ${e.response.data.message}`);
      } finally {
        this.loading = false;
      }
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
