import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Uploader from '@/views/Uploader.vue';

import { adminUserUid } from '@/config/private';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/uploader',
    name: 'uploader',
    component: Uploader,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/:catchAll(.*)', component: PageNotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const checkIsAdminUser = async () => new Promise((resolve) => {
  const removeListener = onAuthStateChanged(getAuth(), (user) => {
    if (user && user.uid === adminUserUid) {
      removeListener();
      resolve(true);
    } else {
      resolve(false);
    }
  });
});

router.beforeEach(async (to, from, next) => {
  const isNavToAuthRoute = to.matched.some((record) => record.meta.requiresAuth);
  const toLoginRoute = to.matched.some((record) => record.path === '/login');
  const isAdminUser = await checkIsAdminUser();

  if (isAdminUser && toLoginRoute) {
    // prevent user navigate to login without sign out
    next(from);
    return;
  }

  if (isNavToAuthRoute) {
    if (isAdminUser) next();
    else next('/login');

    return;
  }

  next();
});

export default router;
