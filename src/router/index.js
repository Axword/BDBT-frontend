import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
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
import Home from '../views/Home.vue'
import State from '@/service/state';

Vue.use(VueRouter)

const checkIfAuthorized = (to, from, next) => { (!State.isAuth() || (!! to.meta.requiredPerm && ! State.getPermissions().includes(to.meta.requiredPerm))) ? next('/login') : next(); };
const routes = [
  {
    path: '/login',
    name: 'Logowanie',
    component: Login
  },
  {
    path: '/',
    name: 'Strona główna',
    component: Home,
    beforeEnter: checkIfAuthorized,
    meta: {
    }
  },
  {
    path: '/pracownicy',
    name: 'Lista pracowników',
    component: PracownicyTable,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'pracownicy.view_pracownik',
    }
  },
  {
    path: '/wynagrodzenia',
    name: 'Lista wynagrodzeń',
    component: SecretaryTable,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'pracownicy.view_wynagrodzenie',
    }
  },
  {
    path: '/wynagrodzenia/:id?',
    name: 'Wynagrodzenia',
    component: WynagrodzeniaForm,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'pracownicy.change_wynagrodzenie',
    }
  },
  {
    path: '/pracownicy/:id?',
    name: 'Pracownicy',
    component: PracownicyForm,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'pracownicy.change_pracownik',
    }
  },
  {
    path: '/sektor',
    name: 'Lista sektorów',
    component: SektorTable,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'parki.view_sektor',
    }
  },
  {
    path: '/sektor/:id?',
    name: 'Sektor',
    component: SektorForm,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'parki.change_sektor',
    }
  },
  {
    path: '/atrakcje',
    name: 'Lista atrakcji',
    component: AtrakcjeTable,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'atrakcje.view_atrakcja',
    }
  },
  {
    path: '/atrakcje/:id?',
    name: 'Atrakcje',
    component: AtrakcjeForm,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'atrakcje.change_atrakcja',
    }
  },
  {
    path: '/jezyki',
    name: 'Lista języków',
    component: Jezyki,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'jezyki.view_jezyk',
    }
  },
  {
    path: '/jezyki/:id?',
    name: 'Języki',
    component: JezykiForm,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'jezyki.change_jezyk',
    }
  },
  {
    path: '/stanowiska',
    name: 'Lista Stanowisk',
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'pracownicy.view_stanowisko'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StanowiskoTable.vue')
  },
  {
    path: '/stanowiska/:id?',
    name: 'Stanowisko',
    component: StanowiskoForm,
    beforeEnter: checkIfAuthorized,
    meta: {
      requiredPerm: 'pracownicy.change_stanowisko'
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
