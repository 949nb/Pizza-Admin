// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './routes'
import axios from 'axios'
import { store } from "./components/vuex/store";

Vue.config.productionTip = false;

Vue.use(VueRouter);

axios.defaults.baseURL = 'https://wd9519199794alqwsb.wilddogio.com';
Vue.prototype.$http = axios;

const router = new VueRouter({
  routes: routes,
  mode:'history',
  scrollBehavior(to,from,savedOpsition){
    // return {x:0,y:100}
    // return {selector:'.btn'}
    if(savedOpsition){
      return savedOpsition
    }else{
      return {x:0,y:0}
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router,
  store: store
});
