import Vue from 'vue';
import Router from 'vue-router';
import Trending from '../spa/Trending/Trending';
import Channel from '../spa/Channel/Channel';
import Upload from '../spa/Upload/Upload';
import Noti from '../spa/Noti/Noti';
import Profile from '../spa/Profile/Profile';

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
