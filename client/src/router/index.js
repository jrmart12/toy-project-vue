import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback } from '@okta/okta-vue'
import { navigationGuard } from '@okta/okta-vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import SpringBootView from '@/views/SpringBootView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/login/callback',
      component: LoginCallback
    },
    {
      path: '/springboot',
      component: SpringBootView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach(navigationGuard)
export default router
