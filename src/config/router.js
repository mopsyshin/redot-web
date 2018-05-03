import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/spa/Home';
import Editor from '@/spa/Editor/Editor';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/edit',
      name: 'Editor',
      component: Editor,
    },
  ],
});
