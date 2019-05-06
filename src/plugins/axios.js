import Vue from 'vue'
import axios from 'axios'
import { getToken, getDeviceId } from '@/utils/auth'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let config = {
    baseURL: process.env.VUE_APP_API_BASE_URL, // api Base URl
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
}

let _axios = axios.create(config)
_axios.defaults.headers.common['client-id'] = process.env.VUE_APP_CLIENT_ID;
_axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';

_axios.interceptors.request.use(
    config => {
        const authToken = getToken();
        if(authToken){
            config.headers['Authorization'] =  'Bearer '+authToken;
        }
        config.headers['device-id'] =  getDeviceId();
        // Do something before request is sent
        return config
    },
    error => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    response => {
        // Do something with response data
        return response.data
    },
    error => {
        // Do something with response error
        return Promise.reject(error)
    }
)

Plugin.install = function (Vue, options) {
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
export { _axios };
