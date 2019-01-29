import Vue from 'vue'
import '@babel/polyfill'

import router from './index-router.js'
import Index from './index.vue'
import i18n from '@/lang/index'

import '@/scss/style.scss'

new Vue({
    mounted() {
        /* remove loading */
        let loadingNode = document.getElementById('fs-loading')
        if (loadingNode) {
            loadingNode.parentNode.removeChild(loadingNode)
        }
    },
    render(h) {
        return h(Index)
    },
    router,
    i18n,
}).$mount('#app')

