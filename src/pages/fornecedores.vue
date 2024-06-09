<template>
  <title>Lista de Fornecedores - Elder</title>
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
            class="mb-5"
            color="primary"
            prepend-icon="mdi-chevron-left"
            size="large"
            variant="outlined"
            @click="voltar()"
          >
            Voltar
          </v-btn>
          <Tabela :headers="headers" :items="items" :pagina-atual="1" :total-paginas="5" has-adicionar
                  titulo="Fornecedores"/>
        </v-container>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
import Breadcrumbs from "@/components/breadcrumbs.vue";
import Tabela from "@/components/tabela.vue";
import {useRoute, useRouter} from "vue-router";

export default {
  components: {Tabela, Breadcrumbs},
  data: () => (
    {
      title: 'Gestão de Estoque',
      searchText: '',
      headers: [
        {
          titulo: 'ID',
          campo: 'id'
        },
        {
          titulo: 'Nome',
          campo: 'name'
        },
        {
          titulo: 'Contato',
          campo: 'contact'
        },
      ],
      items: [
        {
          id: 1,
          name: 'Atlas',
          contact: '(32) 3343-4397'
        },
        {
          id: 2,
          name: 'Suvinil',
          contact: '(38) 2872-6102'
        },
        {
          id: 3,
          name: 'Coral',
          contact: '(11) 3343-4397'
        },
        {
          id: 4,
          name: 'Sherwin Williams',
          contact: '(32) 3343-4397'
        },
        {
          id: 5,
          name: 'Tintas Renner',
          contact: '(32) 3343-4397'
        },
      ],
    }
  ),
  computed: {
    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    }
  },

  methods: {
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
