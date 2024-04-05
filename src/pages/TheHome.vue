<template>
  <v-app id="inspire">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Gestão de Estoque</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar>

    <v-main class="mt-5">
      <v-container>
        <v-text-field
          autofocus
          variant="outlined"
          v-model="searchText"
          hide-details="auto"
          color="primary"
          append-icon="mdi-magnify"
          label="Pesquisar"
        ></v-text-field>
        <v-row class="mt-5">
          <v-col
            v-for="navItem in filteredNavItems"
            :key="navItem.title"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            cols="12"
          >
            <v-card
              link
              :to="navItem.to"
              color="primary"
              rounded="lg"
              variant="elevated"
              class="w-100"
              height="200">
              <div class="h-100 d-flex align-center">
                <v-row>
                  <v-col
                    class="d-flex justify-center"
                    cols="12">
                    <v-icon size="35">
                      {{ navItem.icon }}
                    </v-icon>
                  </v-col>
                  <v-col
                    class="d-flex justify-center"
                    cols="12">
                    <div>
                      <p class="color-secondary">
                        {{ navItem.title }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </div>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
          title: 'Emitir Notas Fiscais',
          icon: 'mdi-printer-pos',
          to: '/notas-fiscais'
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
<style>

</style>
