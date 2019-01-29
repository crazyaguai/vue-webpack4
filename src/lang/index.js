import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enLocale from './en.json'
import zhLocale from './zh-CN.json'
import storage from '@/common/storage'

Vue.use(VueI18n)

const langOptions = [
    {
        label: '简体中文',
        value: 'zh-CN',
        headerLang: 'zh-CN',
        pattern: /^zh/
    },
    {
        label: 'English',
        value: 'en',
        headerLang: 'en-US',
        pattern: /^en/
    },
]

const DEFAULT_LANG = langOptions[0].value
let locale = storage.getItem('language') || DEFAULT_LANG

let headerLang;
langOptions.some(item=>{
    if(item.value == locale){
        headerLang = item.headerLang
    }
})

const messages = {
    en: {
        ...enLocale
    },
    'zh-CN': {
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale,
    messages
})

export {
    i18n as default,
    locale,
    langOptions,
    headerLang
}
