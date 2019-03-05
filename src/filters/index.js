import Vue from 'vue'

import number from '@/common/number'

Vue.filter('add0',function (val,len) {
    return number.add0(val,len)
})
