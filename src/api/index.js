import axios from 'axios'
import i18n,{headerLang} from '@/lang'
import storage from '@/common/storage'

const baseURL = ''

//处理返回数据
axios.interceptors.response.use(rep => {
    return rep.data
}, err => {
    return false
})

//处理请求
axios.interceptors.request.use((config) => {
    return config;
},(error) => {
    return Promise.reject(error);
})

function getHeaders(url,headers) {
    let token = storage.getItem('LOGIN_TOKEN');
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }
    if(headerLang){
        headers['accept-language'] = headerLang
    }
    return headers
}

export default {
    get(url, param = {}, headers = {}, notUseBaseURL = false) {
        return axios.get(url, {
            baseURL: notUseBaseURL ? '' : baseURL,
            params: param,
            headers: getHeaders(url,headers)
        })
    },
    post(url, param = null, headers = {}, notUseBaseURL = false) {
        return axios.post(url, param, {
            baseURL: notUseBaseURL ? '' : baseURL,
            headers: getHeaders(url,headers)
        })
    },
    file(url, param = null, headers = {}, notUseBaseURL = false) {
        return axios.post(url, param, {
            baseURL: notUseBaseURL ? '' : baseURL,
            headers: Object.assign({
                'Content-Type': 'multipart/form-data'
            }, getHeaders(url,headers))
        })
    }
}
