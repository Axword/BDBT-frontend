import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Jezyki from '../views/Jezyki.vue'
import JezykiForm from '../views/JezykiForm.vue'
import SektorTable from  '../views/SektorTable.vue'
import SektorForm from '../views/SektorForm.vue'
import PracownicyTable from '../views/PracownicyTable.vue'
import PracownicyForm from '../views/PracownicyForm.vue'
import SecretaryTable from '../views/SecretaryTable.vue'
import WynagrodzeniaForm from '../views/WynagrodzeniaForm.vue'
import StanowiskoForm from '../views/StanowiskoForm.vue'
import AtrakcjeForm from '../views/AtrakcjeForm.vue'
import AtrakcjeTable from '../views/AtrakcjeTable.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pracownicy',
    name: 'PracownicyTable',
    component: PracownicyTable
  },
  {
    path: '/wynagrodzenia/:id?',
    name: 'WynagrodzeniaForm',
    component: WynagrodzeniaForm
  },
  {
    path: '/pracownicy/:id?',
    name: 'PracownicyForm',
    component: PracownicyForm
  },
  {
    path: '/sektor',
    name: 'SektorTable',
    component: SektorTable
  },
  {
    path: '/sektor/:id?',
    name: 'SektorForm',
    component: SektorForm
  },
  {
    path: '/atrakcje',
    name: 'AtrakcjeTable',
    component: AtrakcjeTable
  },
  {
    path: '/atrakcje/:id',
    name: 'AtrakcjeForm',
    component: AtrakcjeForm
  },
  {
    path: '/sekretarka',
    name: 'SecretaryTable',
    component: SecretaryTable
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
  },
  {
    path: '/stanowiska',
    name: 'StanowiskoTable',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StanowiskoTable.vue')
  },
  {
    path: '/stanowiska/:id?',
    name: 'StanowiskoForm',
    component: StanowiskoForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
