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
    name: 'Lista pracowników',
    component: PracownicyTable
  },
  {
    path: '/wynagrodzenia',
    name: 'Lista wynagrodzeń',
    component: SecretaryTable
  },
  {
    path: '/wynagrodzenia/:id?',
    name: 'Wynagrodzenia',
    component: WynagrodzeniaForm
  },
  {
    path: '/pracownicy/:id?',
    name: 'Pracownicy',
    component: PracownicyForm
  },
  {
    path: '/sektor',
    name: 'Lista sektorów',
    component: SektorTable
  },
  {
    path: '/sektor/:id?',
    name: 'Sektor',
    component: SektorForm
  },
  {
    path: '/atrakcje',
    name: 'Lista atrakcji',
    component: AtrakcjeTable
  },
  {
    path: '/atrakcje/:id?',
    name: 'Atrakcje',
    component: AtrakcjeForm
  },
  {
    path: '/jezyki',
    name: 'Lista języków',
    component: Jezyki
  },
  {
    path: '/jezyki/:id?',
    name: 'Języki',
    component: JezykiForm,
  },
  {
    path: '/stanowiska',
    name: 'Stanowisko',
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
