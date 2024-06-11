<template>
  <title>Adicionar Fornecedor - Elder</title>
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
            color="primary"
            prepend-icon="mdi-chevron-left"
            size="x-large"
            variant="outlined"
            @click="voltar()"
          >
            Voltar
          </v-btn>
          <v-card
            class="container mt-5 pa-5"
            elevation="5"
            variant="elevated">
            <v-form fast-fail @submit.prevent="adicionarFornecedor">
              <v-card-title>
                <v-container>
                  <h1>
                    Adicionar Fornecedor
                  </h1>
                </v-container>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="9" sm="6">
                      <v-text-field
                        v-model="form.name"
                        :rules="[required, maxLength]"
                        color="primary"
                        label="Nome"
                        prepend-inner-icon="mdi-truck"
                        required
                        variant="outlined">
                        <template v-slot:append-inner>
                          <v-icon color="grey">
                            mdi-information
                          </v-icon>
                          <v-tooltip
                            activator="parent"
                            aria-labelledby="tooltip-nome"
                            location="bottom"
                          >
                            <p id="tooltip-nome">
                              Informe o nome do fornecedor
                            </p>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="6">
                      <v-text-field
                        v-model="form.contact"
                        v-mask="'(##) #####-####'"
                        :rules="[required]"
                        color="primary"
                        label="Contato"
                        placeholder="(99) 99999-9999"
                        prepend-inner-icon="mdi-phone"
                        required
                        type="text"
                        variant="outlined">
                        <template v-slot:append-inner>
                          <v-icon color="grey">
                            mdi-information
                          </v-icon>
                          <v-tooltip
                            activator="parent"
                            aria-labelledby="tooltip-contato"
                            location="bottom"
                          >
                            <p id="tooltip-contato">
                              Informe o contato do fornecedor
                            </p>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-container class="px-0">
                  <v-btn
                    class="ml-5"
                    color="primary"
                    prepend-icon="mdi-plus"
                    size="x-large"
                    type="submit"
                    variant="elevated"
                  >
                    Adicionar
                  </v-btn>
                </v-container>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
  <v-dialog
    v-model="dialogConfirmacao"
    fullscreen
    transition="slide-x-transition">
    <v-card
      class="container pa-5"
      elevation="5"
      variant="elevated">
      <v-card-title>
        <v-container class="titulo-pagina-confirmacao text-wrap text-primary">
          <h2>Página de Confirmação - Adicionar Fornecedor</h2>
          <v-divider class="d-block mt-5"></v-divider>
        </v-container>
      </v-card-title>
      <v-card-text class="py-0">
        <v-container class="py-0">
          <div class="campos-confirmacao text-wrap">
            <p class="my-2">
              <strong>Nome:</strong>
              {{ form.name }}
            </p>
            <p class="my-2">
              <strong>Contato:</strong>
              {{ form.contact }}
            </p>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container class="d-flex align-start flex-column px-0">
          <v-btn
            :loading="carregando"
            class="ml-5"
            color="success"
            prepend-icon="mdi-plus"
            size="x-large"
            variant="elevated"
            width="250"
            @click="confirmar()"
          >
            Confirmar
          </v-btn>
          <v-btn
            class="ml-5 mt-5"
            color="primary"
            prepend-icon="mdi-pencil"
            size="x-large"
            variant="outlined"
            width="250"
            @click="dialogConfirmacao = false"
          >
            Editar
          </v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Breadcrumbs from "@/components/breadcrumbs.vue";
import {mapActions} from "pinia";
import {useAlertStore} from "@/stores/alert";
import {useRoute, useRouter} from "vue-router";

export default {
  components: {Breadcrumbs},
  data: () => (
    {
      carregando: false,
      dialogConfirmacao: false,
      form: {
        name: '',
        contact: '',
      }
    }
  ),
  computed: {
    breadcrumbs() {
      const parentRouteMeta = this.route.matched
        .filter(record => record.path === '/fornecedores')
        .map(record => record.meta);
      return [...parentRouteMeta[0].breadcrumbs(), ...this.route.meta.breadcrumbs()];
    },
  },

  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),

    adicionarFornecedor() {
      this.dialogConfirmacao = true;
    },

    confirmar() {
      // Submeter formulário
      this.carregando = true;
      setTimeout(() => {
        this.carregando = false;
        this.showSuccess('Fornecedor adicionado com sucesso!');
        this.router.push('/fornecedores');
      }, 1000);
      console.log(this.form)
    },

    required(value) {
      return !!value || 'Campo obrigatório';
    },
    maxLength(value) {
      return value.length <= 500 || 'Máximo de 500 caracteres';
    },

    voltar() {
      this.router.push('/fornecedores');
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
.campos-confirmacao {
  font-size: 22px;
}

.titulo-pagina-confirmacao {
  font-size: 24px;
}
</style>
