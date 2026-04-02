import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

import LoginVue from '@/views/login/Login.vue'
import HomeVue from '@/views/Home.vue'
import LayoutVue from '@/views/login/Layout.vue'
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import StartCreateVue from '@/views/article/StartCreate.vue'
import ArticleEditVue from '@/views/article/ArticleEdit.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'

const routes = [
  { path: '/login', component: LoginVue },
  { path: '/', component: HomeVue },
  { path: '/create', component: StartCreateVue },
  { path: '/article/edit', component: ArticleEditVue },
  {
    path: '/admin',
    component: LayoutVue,
    redirect: '/admin/article/manage',
    children: [
      { path: '/admin/article/category', component: ArticleCategoryVue },
      { path: '/admin/article/manage', component: ArticleManageVue },
      { path: '/admin/user/avatar', component: UserAvatarVue },
      { path: '/admin/user/info', component: UserInfoVue },
      { path: '/admin/user/resetPassword', component: UserResetPasswordVue },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (import.meta.env.DEV) {
    return true
  }

  const tokenStore = useTokenStore()

  if (to.path === '/login') {
    return tokenStore.token ? '/' : true
  }

  return tokenStore.token ? true : '/login'
})

export default router
