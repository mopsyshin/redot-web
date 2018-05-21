import Vue from 'vue';
import Router from 'vue-router';
import Trending from '@/spa/trending/Trending';
import Channel from '@/spa/channel/Channel';
import Noti from '@/spa/noti/Noti';
import Profile from '@/spa/profile/Profile';
import PostDetail from '@/spa/post/PostDetail';
import Login from '@/spa/LoginPage';

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
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/post/:id',
      name: 'postdetail',
      props: true,
      components: {
        default: Trending,
        detailView: PostDetail,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return null;
  },
});
