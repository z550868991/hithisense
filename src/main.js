// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import request from 'superagent'

Vue.config.productionTip = false
Vue.prototype.$request = request

Vue.use(Vuex)
Vue.use(ElementUI)

const store = new Vuex.Store({
    state: {
        userInfor: {
            user: '',
            type: ''
        }
    },
    mutations: {
        setUserInfor(state, user, type, account) {
            state.userInfor.user = user
            state.userInfor.type = type
            state.userInfor.account = account
        }
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
