<template>
  <title>Lista de Categorias - Elder</title>
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
                  titulo="Categorias"/>
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
          titulo: 'Descrição',
          campo: 'description'
        },
      ],
      items: [
        {
          id: 1,
          description: 'Refrigerante',
        },
        {
          id: 2,
          description: 'Líquido',
        },
        {
          id: 3,
          description: 'Bebida Alcoólica',
        },
        {
          id: 4,
          description: 'Suco',
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
