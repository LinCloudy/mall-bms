import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/login';
import Home from '@/components/Home';
import Welcome from '@/components/welcome';
import Users from '@/components/user/users';
import Data from '@/components/data/data';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/reports',
        component: Data
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next();
  }
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    return next('/login');
  }
  next();
});

export default router;
