import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import App from './App.vue';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import routes from './routes.js';
import store from './store'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({mode: 'history', routes})

new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
