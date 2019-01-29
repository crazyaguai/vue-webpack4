/* 路由配置 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import H5Demo from '@h5/pages/h5/h5-demo.vue'

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'H5Demo',
            component: H5Demo
        },
    ],

    /**
     * 滚动行为
     *
     */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})


/* 权限控制 */
router.beforeEach((to, from, next) => {
    return next()
})

export default router
