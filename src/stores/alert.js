import {defineStore} from "pinia";

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alert: {
      show: false,
      message: '',
      title: 'Sucesso',
      type: 'success',
    },
  }),
  actions: {
    showSuccess(message) {
      this.alert = {
        show: true,
        message: message,
        title: 'Sucesso',
        type: 'success',
      }
    },
    showError(message) {
      this.alert = {
        show: true,
        message: message,
        title: 'Erro',
        type: 'error',
      }
    },
    showInfo(message) {
      this.alert = {
        show: true,
        message: message,
        title: 'Informação',
        type: 'info',
      }
    },
    showWarning(message) {
      this.alert = {
        show: true,
        message: message,
        title: 'Aviso',
        type: 'warning',
      }
    },
    closeAlert() {
      this.alert = {
        show: false,
        message: '',
        title: '',
        type: '',
      }
    },
  }
})
