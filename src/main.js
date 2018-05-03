// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import App from './App';
import router from './config/router';
import store from './vuex/store';

Vue.use(VueMasonryPlugin);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
