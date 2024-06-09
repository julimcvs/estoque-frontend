<template>
  <title>Movimentações de Estoque - Elder</title>
  <v-layout class="flex-column">
    <v-main>
      <Breadcrumbs :items="breadcrumbs"/>
      <v-container
        class="py-0"
        fluid>
        <v-container
          class="py-0"
        >
          <v-btn
            color="primary"
            prepend-icon="mdi-chevron-left"
            size="large"
            variant="outlined"
            @click="voltar()"
          >
            Voltar
          </v-btn>
        </v-container>
        <v-container>
          <h1 class="text-primary text-center">
            Movimentações de Estoque
          </h1>
          <v-card
            class="card mt-5 rounded-xl"
            color="primary"
            variant="elevated">
            <v-card-title>
              <StepperMovimentacao/>
            </v-card-title>
            <v-card-text class="bg-white pa-0">
              <div v-if="currentStep === 0" class="pa-5">
                <TipoMovimentacao/>
              </div>
              <div v-else-if="currentStep === 1" class="pa-5">
                <SelecionarProdutosMovimentacao/>
              </div>
              <div v-else class="pa-5">
                <ConfirmacaoMovimentacao/>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>

import Breadcrumbs from "@/components/breadcrumbs.vue";
import {useRoute, useRouter} from "vue-router";
import TipoMovimentacao from "@/components/movimentacoes-estoque/tipo-movimentacao.vue";
import ConfirmacaoMovimentacao from "@/components/movimentacoes-estoque/confirmacao.vue";
import {mapWritableState} from "pinia";
import {useMovimentacaoEstoqueStore} from "@/stores/movimentacao-estoque";
import StepperMovimentacao from "@/components/movimentacoes-estoque/stepper.vue";
import SelecionarProdutosMovimentacao from "@/components/movimentacoes-estoque/selecionar-produtos.vue";

export default {
  components: {
    SelecionarProdutosMovimentacao,
    StepperMovimentacao, ConfirmacaoMovimentacao, TipoMovimentacao, Breadcrumbs
  },

  computed: {
    ...mapWritableState(useMovimentacaoEstoqueStore, ['currentStep', 'form']),

    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    },
    isMobile() {
      return this.$vuetify.display.smAndDown;
    }
  },

  methods: {
    next() {
      this.currentStep++;
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
.card {
  border: 2px solid rgb(var(--v-theme-primary));
}

.titulo {
  font-size: 30px;
}
</style>
