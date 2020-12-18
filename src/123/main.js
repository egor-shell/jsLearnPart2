import Vue from 'vue'
import App from './App.vue'

import store from './store'

new Vue ({
    el: 'section',
    template: '<App />',
    components: {
        App,
    },
    store,
})

Vue.config.devtools = true