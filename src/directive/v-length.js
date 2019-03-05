/**
 * 限制input输入长度和类型的指令
 * 使用：参数
 * {
 *  model:v-module值
 *  type:默认空，可设置number
 *  length:长度
 * }
 */

import Vue from 'vue'
Vue.directive('length',{
    //指令第一次绑定到元素时调用
    bind(el,binding,vnode){
        let {type='',model,length} = binding.value
        let scope = vnode.context

        if(model){
            //解绑时需要销毁watch
            el.unbind = scope.$watch(model,(val,oldVal)=>{
                if(type == 'number'){
                    scope[model] = val.replace(/[^0-9]/ig,"")
                }
                if(length && val.length > length){
                    scope[model] = val.slice(0,length)
                }
            })
        }
    },
    //被绑定元素插入父节点时调用
    inserted(el,binding,vnode){

    },
    update(el,binding,vnode,oldVnode){

    },
    componentUpdated(el,binding,vnode,oldVnode){

    },
    //指令与元素解绑时调用
    unbind(el,binding,vnode){
        // 销毁watch
        el.unbind()
    },
})
