/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'pt-BR',
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#29569B',
          secondary: '#f4731a',
          success: '#28a745',
        },
      },
    },
  },
})
