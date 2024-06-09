<template>
  <v-container
    class="d-flex justify-center mb-10">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="d-flex">
      <div
        class="position-relative text-center d-flex align-center">
        <v-btn
          :aria-labelledby="step.title"
          :color="currentStep >= index ? 'secondary' : 'white'"
          :icon="step.icon"
          :variant="currentStep >= index ? 'elevated' : 'outlined'"
          class="bg-primary"
          @click="currentStep = index"
        ></v-btn>
        <p
          :id="step.title"
          class="position-absolute font-weight-bold text-white"
          style="top: 115%; left: 50%; transform: translateX(-50%)">
          {{ step.title }}
        </p>
      </div>
      <div class="d-flex align-center">
        <v-progress-linear
          v-if="index !== steps.length - 1"
          :color="currentStep > index ? 'secondary' : 'white'"
          aria-label="Progresso do Stepper"
          model-value="100"
          style="width: 10vw"/>
      </div>
    </div>
  </v-container>
</template>
<script>
import {mapState, mapWritableState} from "pinia";
import {useVendasStore} from "@/stores/vendas";

export default {
  name: 'StepperVendas',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(useVendasStore, ['steps']),
    ...mapWritableState(useVendasStore, ['currentStep']),

    isMobile() {
      return this.$vuetify.display.xs
    }
  }
}
</script>
<style scoped>

</style>
