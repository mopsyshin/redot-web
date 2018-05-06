import Vue from 'vue';
import Router from 'vue-router';
import Trending from '@/spa/trending/Trending';
import Channel from '@/spa/channel/Channel';
import Noti from '@/spa/noti/Noti';
import Profile from '@/spa/profile/Profile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/trending',
    },
    {
      path: '/trending',
      name: 'trending',
      component: Trending,
    },
    {
      path: '/channel',
      name: 'channel',
      component: Channel,
    },
    {
      path: '/noti',
      name: 'noti',
      component: Noti,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
  ],
  scrollBehavior() {
    return {
      x: 0, y: 0,
    };
  },
});
