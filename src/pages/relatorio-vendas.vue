<template>
  <head>
    <title>Relatório de Vendas - Elder</title>
    <meta
      content="Página de relatório de vendas do sistema de gestão de estoque Elder"
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
          <v-card class="mt-5">
            <v-card-title>
              <v-container>
                <v-row class="mt-2">
                  <v-col cols="12" md="5">
                    <v-date-input
                      role="combobox"
                      v-model="form.dataInicial"
                      aria-label="Data inicial"
                      color="primary"
                      label="Data inicial"
                      title="Data inicial"
                      variant="outlined">
                    </v-date-input>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-date-input
                      role="combobox"
                      v-model="form.dataFinal"
                      aria-label="Data final"
                      color="primary"
                      label="Data final"
                      title="Data final"
                      variant="outlined">
                    </v-date-input>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      class="w-100"
                      color="primary"
                      prepend-icon="mdi-magnify"
                      size="x-large"
                      variant="elevated"
                      @click="buscarVendas()"
                    >
                      Aplicar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>
            <v-card-text>
              <v-container>
                <TabelaRelatorioVendas/>
              </v-container>
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
import {VDateInput} from "vuetify/labs/components";
import TabelaRelatorioVendas from "@/components/relatorio-vendas/tabela-relatorio-vendas.vue";

export default {
  components: {
    TabelaRelatorioVendas,
    Breadcrumbs,
    VDateInput
  },

  computed: {
    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    },
    isMobile() {
      return this.$vuetify.display.smAndDown;
    }
  },

  created() {
    const dataAtual = new Date();
    const primeiroDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    this.form.dataInicial = primeiroDiaDoMes;
    this.form.dataFinal = dataAtual;
  },

  data: () => ({
    form: {
      dataInicial: null,
      dataFinal: null,
    }
  }),

  methods: {
    selecionarData() {
      console.log(this.form);
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
