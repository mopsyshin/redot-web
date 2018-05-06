import Vue from 'vue';
import Vuex from 'vuex';
import accountStore from './modules/account';
import uiStore from './modules/ui';
import { db } from '../firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    accountStore,
    uiStore,
  },
  state: {
    uploadPageState: false,
    channels: [],
    recoCh: '',
    channelReady: false,
    refreshCount: 0,
  },
  mutations: {
    refresh(state) {
      state.refreshCount += 1;
    },
    setUploadPageState(state) {
      state.uploadPageState = !state.uploadPageState;
    },
    setChannels(state, payload) {
      state.channels = payload.channels;
    },
    setRecoCh(state, payload) {
      state.recoCh = payload.recoCh;
    },
    channelReady(state, payload) {
      state.channelReady = payload.value;
    },
  },
  actions: {
    refreshTrending() {
      store.commit('refresh');
    },
    toggleUploadPageState() {
      store.commit('setUploadPageState');
    },
    getChannels() {
      const channels = [];
      const recoCh = [];
      store.commit({
        type: 'channelReady',
        value: false,
      });
      db.collection('channel').orderBy('channel_created_date')
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            channels.push(doc.data());
            recoCh.push(doc.data().channel_name);
          });
        })
        .then(() => {
          store.commit({
            type: 'channelReady',
            value: true,
          });
          store.commit({
            type: 'setChannels',
            channels,
          });
          const leng = recoCh.length;
          const random = Math.floor((Math.random() * leng));
          store.commit({
            type: 'setRecoCh',
            recoCh: recoCh[random],
          });
        });
    },
  },
});

export default store;
