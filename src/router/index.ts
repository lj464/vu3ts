import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/index.vue'),
    name:"main"
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to)=>{
  if(to.path !== '/login'){
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if(to.path ==='/main'){
    return firstMenu.url
  }
})
export default router
