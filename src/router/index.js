import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import TrackingView from '../views/TrackingView.vue'

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
  },
  {
    path: '/tracking',
    name: 'tracking',
    component: TrackingView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
