import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'

import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default
    },
    theme: {
        dark: false // From 2.0 You have to select the theme dark or light here
    },
})