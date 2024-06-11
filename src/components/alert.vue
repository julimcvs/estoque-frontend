<template>
  <v-expand-transition>
    <v-alert
      v-model="alert.show"
      :text="alert.message"
      :title="alert.title"
      :type="alert.type"
      class="alert pt-7 pb-10"
      closable
      close-label="Fechar alerta"
    >
    </v-alert>
  </v-expand-transition>
</template>
<script>
import {mapState} from "pinia";
import {useAlertStore} from "@/stores/alert";
import {useRoute} from "vue-router";

export default {
  computed: {
    ...mapState(useAlertStore, ['alert']),
  },

  setup() {
    const route = useRoute();
    return {
      route
    }
  },

  watch: {
    '$route'(rota1, rota2) {
      if (rota1.path !== '/home' && !rota2.path.includes(rota1.path)) {
        this.alert.show = false;
      }
    }
  }
}
</script>
<style scoped>
.alert {
  border-radius: 0;
  font-size: 20px;
}

:deep(.v-alert-title) {
  font-size: 24px !important;
}
</style>
