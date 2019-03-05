import Vue from 'vue'
import '@babel/polyfill'

import router from './index-router.js'
import Index from './index.vue'
import i18n from '@/lang/index'

import '@/scss/style.scss'

//自定义指令
import '@/directive'

//过滤器
import '@/filters'

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

