import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'
import CreateView from '../views/CreateView.vue'
import EditView from '../views/EditView.vue'
import MyView from '../views/MyView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
    },
    {
      path: '/edit/:product_id',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/products/:product_id',
      name: 'show',
      component: ProductView,
    },
    {
      path: '/my',
      name: 'my',
      component: MyView,
    }
  ],
})

export default router
