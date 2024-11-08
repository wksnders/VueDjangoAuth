import { createRouter, createWebHistory } from 'vue-router'
import { inject} from 'vue';

import HomeView from '@/views/HomeView.vue'
import LoginPage from '@/views/LoginView.vue';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth:true}
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
  ];

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })
  /*
  router.beforeEach((to, from) => {

    const auth = inject('auth')

    if (to.name !== 'Login' && to.meta.requiresAuth && !auth.isAuthenticated.value) {
        return { name: 'Login' }
    }

    return true;
  });*/
  
  export default router