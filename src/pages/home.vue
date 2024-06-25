<template>
  <head>
    <title>Página Inicial - Elder</title>
    <meta
      content="Página inicial do sistema de gestão de estoque Elder"
      name="description">
  </head>
  <v-layout>
    <v-main class="mt-10">
      <div class="text-center">
        <h1 class="text-primary">
          Página Inicial
        </h1>
      </div>
      <v-container>
        <v-row class="mt-5">
          <v-col
            v-if="filteredNavItems.length === 0"
            class="text-center"
            cols="12"
          >
            {{ 'Nenhum resultado encontrado' }}
          </v-col>
          <v-col
            v-for="navItem in filteredNavItems"
            v-else
            :key="navItem.title"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card
              :to="navItem.to"
              class="w-100 card text-wrap text-center"
              color="primary"
              elevation="10"
              height="300"
              link
              rounded="lg"
              variant="elevated">
              <div class="h-100 d-flex align-center">
                <v-row>
                  <v-col
                    class="d-flex justify-center"
                    cols="12">
                    <v-icon size="50">
                      {{ navItem.icon }}
                    </v-icon>
                  </v-col>
                  <v-col
                    class="d-flex justify-center"
                    cols="12">
                    <div>
                      <h2 class="color-secondary">
                        {{ navItem.title }}
                      </h2>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
export default {
  data: () => (
    {
      title: 'Gestão de Estoque',
      searchText: '',
      navItems: [
        {
          title: 'Produtos',
          icon: 'mdi-package-variant-closed',
          to: '/produtos'
        },
        {
          title: 'Categorias',
          icon: 'mdi-tag',
          to: '/categorias'
        },
        {
          title: 'Fornecedores',
          icon: 'mdi-truck',
          to: '/fornecedores'
        },
        {
          title: 'Movimentações de Estoque',
          icon: 'mdi-swap-horizontal',
          to: '/movimentacoes'
        },
        {
          title: 'Vendas',
          icon: 'mdi-cart-outline',
          to: '/vendas'
        },
        {
          title: 'Relatório de Vendas',
          icon: 'mdi-finance',
          to: '/relatorio-vendas'
        },
      ]
    }
  ),
  computed: {
    filteredNavItems() {
      return this.navItems.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

}
</script>
<style scoped>
.card {
  font-size: 30px;
}
</style>
