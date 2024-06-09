<template>
  <head>
    <title>Vendas - Elder</title>
    <meta
      content="Página de vendas do sistema de gestão de estoque Elder"
      name="description">
  </head>
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
              <StepperVendas/>
            </v-card-title>
            <v-card-text class="bg-white pa-0">
              <div v-if="currentStep === 0" class="pa-5">
                <SelecionarProdutosVendas/>
              </div>
              <div v-else class="pa-5">
                <ConfirmacaoVendas/>
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
import {mapWritableState} from "pinia";
import {useRoute, useRouter} from "vue-router";
import SelecionarProdutosVendas from "@/components/vendas/selecionar-produtos.vue";
import StepperVendas from "@/components/vendas/stepper.vue";
import {useVendasStore} from "@/stores/vendas";
import ConfirmacaoVendas from "@/components/vendas/confirmacao.vue";

export default {
  components: {
    ConfirmacaoVendas,
    StepperVendas,
    SelecionarProdutosVendas,
    Breadcrumbs
  },

  computed: {
    ...mapWritableState(useVendasStore, ['currentStep', 'form']),

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

</style>
