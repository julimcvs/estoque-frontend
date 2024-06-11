<template>
  <v-app>
    <v-toolbar
      color="primary"
      height="100">
      <v-app-bar-title style="font-size: 30px">Elder - Gestão de Estoque</v-app-bar-title>
    </v-toolbar>
    <Alert></Alert>
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import Alert from "@/components/alert.vue";
</script>
