import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Jezyki from '../views/Jezyki.vue'
import JezykiForm from '../views/JezykiForm.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/jezyki',
    name: 'JezykiList',
    component: Jezyki
  },
  {
    path: '/jezyki/:id?',
    name: 'JezykiForm',
    component: JezykiForm,
    meta: {
      requiredPerm: 'jezyki_id',
    }
  },
  {
    path: '/adres',
    name: 'Adres',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Adres.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
