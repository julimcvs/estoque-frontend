<template>
  <head>
  <title>Página Inicial - Elder</title>
  <meta
    name="description"
    content="Página inicial do sistema de gestão de estoque Elder">
  </head>
  <v-layout>
    <v-main class="mt-5">
      <div class="text-center">
        <h1 class="text-primary">
          Página Inicial
        </h1>
      </div>
      <v-container>
        <v-text-field
          autofocus
          variant="outlined"
          v-model="searchText"
          hide-details="auto"
          color="primary"
          label="Pesquisar"
          append-icon="mdi-magnify"
          id="input-pesquisar"
        >
        </v-text-field>
        <v-row class="mt-5">
          <v-col
            v-if="filteredNavItems.length === 0"
            cols="12"
            class="text-center"
          >
            {{ 'Nenhum resultado encontrado' }}
          </v-col>
          <v-col
            v-else
            v-for="navItem in filteredNavItems"
            :key="navItem.title"
            sm="6"
            md="4"
            cols="12"
          >
            <v-card
              link
              :to="navItem.to"
              color="primary"
              rounded="lg"
              variant="elevated"
              elevation="10"
              class="w-100 card text-wrap text-center"
              height="300">
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
