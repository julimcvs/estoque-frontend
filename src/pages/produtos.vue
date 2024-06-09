<template>
  <title>Lista de Produtos - Elder</title>
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
          <Tabela :headers="headers"
                  :items="items"
                  :pagina-atual="1"
                  :total-paginas="5"
                  @excluir="excluir($event)"
                  has-adicionar
                  titulo="Produtos"/>
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
        {
          titulo: 'Preço',
          campo: 'price'
        },
        {
          titulo: 'Categoria',
          campo: 'category'
        },
        {
          titulo: 'Estoque',
          campo: 'stock'
        }
      ],
      items: [
        {
          id: 1,
          description: 'Coca-Cola',
          price: 5.00,
          category: 'Refrigerante',
          stock: 'Estoque 1'
        },
        {
          id: 2,
          description: 'Pepsi',
          price: 4.50,
          category: 'Refrigerante',
          stock: 'Estoque 5'
        },
        {
          id: 3,
          description: 'Fanta',
          price: 4.00,
          category: 'Refrigerante',
          stock: 'Estoque 1'
        },
        {
          id: 4,
          description: 'Sprite',
          price: 3.50,
          category: 'Refrigerante',
          stock: 'Estoque 2'
        },
        {
          id: 5,
          description: 'Guaraná',
          price: 3.00,
          category: 'Refrigerante',
          stock: 'Estoque 1'
        },
        {
          id: 6,
          description: 'Água',
          price: 2.50,
          category: 'Líquido',
          stock: 'Estoque 3'
        },
        {
          id: 7,
          description: 'Suco',
          price: 2.00,
          category: 'Líquido',
          stock: 'Estoque 3'
        },
        {
          id: 8,
          description: 'Guarapan',
          price: 1.50,
          category: 'Refrigerante',
          stock: 'Estoque 1'
        },
        {
          id: 9,
          description: 'Cerveja',
          price: 1.00,
          category: 'Bebida Alcoólica',
          stock: 'Estoque 2'
        },
        {
          id: 10,
          description: 'Vinho',
          price: 0.50,
          category: 'Bebida Alcoólica',
          stock: 'Estoque 1'
        }
      ],
    }
  ),
  computed: {
    breadcrumbs() {
      return this.route.meta.breadcrumbs();
    }
  },

  methods: {
    excluir(produto) {
      this.items.splice(this.items.indexOf(produto), 1);
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
