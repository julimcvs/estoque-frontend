<template>
  <title>Adicionar Produto - Elder</title>
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
            <v-form fast-fail @submit.prevent="adicionarProduto">
              <v-card-title>
                <v-container>
                  <h1 class="text-primary">
                    Adicionar Produto
                  </h1>
                </v-container>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="9" sm="6">
                      <v-text-field
                        v-model="form.description"
                        :rules="[required, maxLength]"
                        color="primary"
                        label="Descrição"
                        prepend-inner-icon="mdi-tag-text"
                        required
                        variant="outlined">
                        <template v-slot:append-inner>
                          <v-icon color="grey">
                            mdi-information
                          </v-icon>
                          <v-tooltip
                            activator="parent"
                            aria-labelledby="tooltip-descricao"
                            location="bottom"
                          >
                            <span id="tooltip-descricao">
                              Informe a descrição do produto
                            </span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="6">
                      <v-text-field
                        v-model="form.price"
                        :rules="[required, price]"
                        color="primary"
                        label="Preço (R$)"
                        placeholder="99.99"
                        prepend-inner-icon="mdi-currency-usd"
                        required
                        type="text"
                        variant="outlined">
                        <template v-slot:append-inner>
                          <v-icon color="grey">
                            mdi-information
                          </v-icon>
                          <v-tooltip
                            activator="parent"
                            aria-labelledby="tooltip-preco"
                            location="bottom"
                          >
                            <span id="tooltip-preco">
                              Informe o preço do produto
                            </span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="form.categoryId"
                        :items="categorias"
                        :rules="[required]"
                        clearable
                        color="primary"
                        item-title="description"
                        item-value="id"
                        label="Categoria"
                        prepend-inner-icon="mdi-tag"
                        required
                        variant="outlined">
                        <template v-slot:append-inner>
                          <v-icon color="grey">
                            mdi-information
                          </v-icon>
                          <v-tooltip
                            activator="parent"
                            aria-labelledby="tooltip-categoria"
                            location="bottom"
                          >
                            <span id="tooltip-categoria">
                              Informe a categoria em que o produto está inserido
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="form.supplierId"
                        :items="fornecedores"
                        :rules="[required]"
                        clearable
                        color="primary"
                        item-title="description"
                        item-value="id"
                        label="Fornecedor"
                        prepend-inner-icon="mdi-truck"
                        required
                        variant="outlined">
                        <template v-slot:append-inner>
                          <v-icon color="grey">
                            mdi-information
                          </v-icon>
                          <v-tooltip
                            activator="parent"
                            aria-labelledby="tooltip-fornecedor"
                            location="bottom"
                          >
                            <span id="tooltip-fornecedor">
                              Informe o fornecedor do produto
                            </span>
                          </v-tooltip>
                        </template>
                      </v-autocomplete>
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
    transition="dialog-bottom-transition">
    <v-card
      class="container mt-5 pa-5"
      elevation="5"
      variant="elevated">
      <v-card-title>
        <v-container class="titulo-pagina-confirmacao text-wrap text-primary">
          Página de Confirmação - Adicionar Produto
          <v-divider class="d-block mt-5"></v-divider>
        </v-container>
      </v-card-title>
      <v-card-text class="py-0">
        <v-container class="py-0">
          <div class="campos-confirmacao text-wrap">
            <p class="my-2">
              <strong>Descrição:</strong>
              {{ form.description }}
            </p>
            <p class="my-2">
              <strong>Preço:</strong>
              R$ {{ parseFloat(form.price).toFixed(2) }}
            </p>
            <p class="my-2">
              <strong>Categoria:</strong>
              {{ getCategoria }}
            </p>
            <p class="my-2">
              <strong>Estoque:</strong>
              {{ getFornecedor }}
            </p>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container class="d-flex align-start flex-column px-0">
          <v-btn
            :loading="carregando"
            class="ml-5"
            color="primary"
            prepend-icon="mdi-plus"
            size="large"
            variant="elevated"
            width="200"
            @click="confirmar()"
          >
            Confirmar
          </v-btn>
          <v-btn
            class="ml-5 mt-5"
            color="primary"
            prepend-icon="mdi-pencil"
            size="large"
            variant="outlined"
            width="200"
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
      categorias: [
        {
          id: 1,
          description: 'Categoria 1',
        },
        {
          id: 2,
          description: 'Categoria 2',
        }
      ],
      dialogConfirmacao: false,
      fornecedores: [
        {
          id: 1,
          description: 'Fornecedor 1',
        },
        {
          id: 2,
          description: 'Fornecedor 2',
        }
      ],
      form: {
        description: '',
        price: '',
        categoryId: null,
        supplierId: null
      }
    }
  ),
  computed: {
    breadcrumbs() {
      const parentRouteMeta = this.route.matched
        .filter(record => record.path === '/produtos')
        .map(record => record.meta);
      return [...parentRouteMeta[0].breadcrumbs(), ...this.route.meta.breadcrumbs()];
    },

    getCategoria() {
      return this.categorias.find(categoria => categoria.id === this.form.categoryId).description;
    },

    getFornecedor() {
      return this.fornecedores.find(fornecedor => fornecedor.id === this.form.supplierId).description;
    },
  },

  methods: {
    ...mapActions(useAlertStore, ['showSuccess', 'showError']),

    adicionarProduto() {
      this.dialogConfirmacao = true;
    },

    confirmar() {
      // Submeter formulário
      this.carregando = true;
      setTimeout(() => {
        this.carregando = false;
        this.showSuccess('Produto adicionado com sucesso!');
        this.router.push('/produtos');
      }, 1000);
      console.log(this.form)
    },

    required(value) {
      return !!value || 'Campo obrigatório';
    },
    maxLength(value) {
      return value.length <= 500 || 'Máximo de 500 caracteres';
    },

    price(value) {
      return /^\d{1,5}(\.\d{1,2})?$/.test(value) || 'Por favor, insira um preço válido no formato 0000.00';
    },

    voltar() {
      this.router.push('/produtos');
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
