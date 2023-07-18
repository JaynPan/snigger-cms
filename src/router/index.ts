import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const getCurrentUser = async () => new Promise((resolve, reject) => {
  const removeListener = onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      removeListener();
      resolve(user);
    } else {
      reject();
    }
  });
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
