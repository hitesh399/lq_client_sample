import Vue from 'vue'
import './plugins'
import App from './App'
import store from './store'
import './registerServiceWorker';

Vue.config.productionTip = false

const main = (props, router) => new Vue({
    router,
    store,
    render: h => h(App, {
        props: props
      })
}).$mount('#app')


export default main
