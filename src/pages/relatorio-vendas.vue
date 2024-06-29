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
            size="x-large"
            variant="outlined"
            @click="voltar()"
          >
            Voltar
          </v-btn>
        </v-container>
        <v-container>
          <h1 class="text-primary text-center">
            Relatório de Vendas
          </h1>
          <v-card class="mt-5">
            <v-card-title>
              <v-container>
                <v-form
                  v-model="isFormValido"
                  @submit="buscarVendas">
                  <v-row class="mt-2">
                    <v-col cols="12" md="5">
                      <v-text-field
                        v-model="form.startDate"
                        v-mask="'##/##/####'"
                        :rules="[required, data]"
                        color="primary"
                        label="Data Inicial"
                        placeholder="DD/MM/AAAA"
                        prepend-inner-icon="mdi-calendar"
                        rounded="lg"
                        variant="outlined">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        v-model="form.endDate"
                        v-mask="'##/##/####'"
                        :rules="[required, data]"
                        color="primary"
                        label="Data Final"
                        placeholder="DD/MM/AAAA"
                        prepend-inner-icon="mdi-calendar"
                        rounded="lg"
                        variant="outlined">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                      <v-btn
                        class="w-100 mt-2"
                        color="primary"
                        prepend-icon="mdi-magnify"
                        size="x-large"
                        variant="elevated"
                      >
                        Aplicar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-skeleton-loader
                  v-if="carregando"
                  class="mt-5"
                  height="50">
                </v-skeleton-loader>
                <TabelaRelatorioVendas v-else/>
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
import TabelaRelatorioVendas from "@/components/relatorio-vendas/tabela-relatorio-vendas.vue";
import {mapWritableState, mapActions} from "pinia";
import {useRelatorioVendasStore} from "@/stores/relatorio-vendas";
import {useVendasStore} from "@/stores/vendas";
import {useAlertStore} from "@/stores/alert";

export default {
  components: {
    TabelaRelatorioVendas,
    Breadcrumbs,
  },

  computed: {
    ...mapWritableState(useRelatorioVendasStore, ['vendas']),

    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    },
    isMobile() {
      return this.$vuetify.display.smAndDown;
    }
  },

  async created() {
    const dataAtual = new Date();
    const primeiroDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    this.form.startDate = primeiroDiaDoMes.toLocaleString();
    this.form.endDate = dataAtual.toLocaleString();
    await this.buscarVendas();
  },

  data: () => ({
    carregando: true,
    form: {
      startDate: null,
      endDate: null,
    }
  }),

  methods: {
    ...mapActions(useVendasStore, ['buscarVendasPorIntervalo']),
    ...mapActions(useAlertStore, ['showError']),

    data(value) {
      const dateRegex = /\b(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})\b/;
      return dateRegex.test(value) || 'Data inválida.';
    },

    required(value) {
      return !!value || 'Campo obrigatório';
    },

    async buscarVendas() {
      this.carregando = true;
      try {
        this.vendas = await this.buscarVendasPorIntervalo(this.form);
      } catch (e) {
        console.error(e);
        this.showError(`Erro ao buscar vendas: ${e.response.data.message}`);
      } finally {
        this.carregando = false;
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
