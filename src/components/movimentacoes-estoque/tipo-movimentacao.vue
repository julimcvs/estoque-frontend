<template>
  <v-container class="pb-0" fluid>
    <p class="titulo text-primary text-center">
      Escolha um tipo de movimentação:
    </p>
    <v-form @submit.prevent="next">
      <v-row class="mt-10 d-flex align-center justify-center">
        <v-col
          v-for="movimentacao in movimentacoes"
          :key="movimentacao.title"
          cols="12"
          md="4"
          sm="6"
        >
          <v-card
            :class="isSelecionado(movimentacao) ? 'bg-primary' : 'bg-white'"
            :height="isSelecionado(movimentacao) ? 350 : 300"
            :ripple="false"
            :variant="isSelecionado(movimentacao) ? 'elevated' : 'outlined'"
            class="w-100 card rounded-xl"
            color="primary"
            elevation="10"
            hover
            @click="selecionarTipoMovimentacao(movimentacao)">
            <div class="h-100 d-flex align-center">
              <v-row>
                <v-col
                  class="d-flex justify-center"
                  cols="12">
                  <v-icon size="50">
                    {{ movimentacao.icon }}
                  </v-icon>
                </v-col>
                <v-col
                  class="d-flex justify-center"
                  cols="12">
                  <div>
                    <p class="color-secondary font-weight-medium">
                      {{ movimentacao.title }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-container class="pb-0 d-flex justify-end">
        <v-btn
          append-icon="mdi-chevron-right"
          class="ml-5"
          color="primary"
          size="large"
          type="submit"
        >
          Próximo
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>
<script>
import {mapState, mapWritableState} from "pinia";
import {useMovimentacaoEstoqueStore} from "@/stores/movimentacao-estoque";

export default {
  computed: {
    ...mapWritableState(useMovimentacaoEstoqueStore, ['form', 'currentStep']),
    ...mapState(useMovimentacaoEstoqueStore, ['movimentacoes']),
  },

  created() {
    this.form.tipoMovimentacao = this.movimentacoes[0];
  },

  methods: {
    isSelecionado(movimentacao) {
      return this.form.tipoMovimentacao.title === movimentacao.title;
    },

    next() {
      this.currentStep++
    },

    selecionarTipoMovimentacao(movimentacao) {
      this.form.tipoMovimentacao = movimentacao;
    },
  }
}
</script>
<style scoped>
.card {
  font-size: 30px;
}

.titulo {
  font-size: 30px;
}
</style>
