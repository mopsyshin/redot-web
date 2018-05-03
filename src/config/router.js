import Vue from 'vue';
import Router from 'vue-router';
import Trending from '@/spa/tranding/Trending';
import Channel from '@/spa/channel/Channel';
import Upload from '@/spa/upload/Upload';
import Noti from '@/spa/noti/Noti';
import Profile from '@/spa/profile/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/trending',
    },
    {
      path: '/trending',
      component: Trending,
    },
    {
      path: '/channel',
      component: Channel,
    },
    {
      path: '/upload',
      component: Upload,
    },
    {
      path: '/noti',
      component: Noti,
    },
    {
      path: '/profile',
      component: Profile,
    },
  ],
});
