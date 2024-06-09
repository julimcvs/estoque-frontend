<template>
    <v-app>
    <v-toolbar color="primary">
      <v-app-bar-title>Elder - Gestão de Estoque</v-app-bar-title>
    </v-toolbar>
    <Alert></Alert>
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import Alert from "@/components/alert.vue";
</script>
