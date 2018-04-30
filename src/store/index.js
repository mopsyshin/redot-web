import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    accountStore: account,
  },
  state: {
    storeState: 0,
  },
});

export default store;
