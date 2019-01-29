import Vue from 'vue'
import '@babel/polyfill'

import router from './h5-router.js'
import H5 from './h5.vue'
import i18n from '@/lang/index'

new Vue({
    mounted() {
        /* remove loading */
        let loadingNode = document.getElementById('fs-loading')
        if (loadingNode) {
            loadingNode.parentNode.removeChild(loadingNode)
        }
    },
    render(h) {
        return h(H5)
    },
    router,
    i18n,
}).$mount('#app')

