import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/snackbar'
import jezyk from './modules/jezyk';
import sektor from './modules/sektor'
import atrakcje  from './modules/atrakcje'
import pracownicy from './modules/pracownicy'
import wynagrodzenia from './modules/wynagrodzenia'
import stanowisko from './modules/stanowisko'
import permission from './modules/permission';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    jezyk,
    snackbar,
    sektor,
    atrakcje,
    pracownicy,
    wynagrodzenia,
    stanowisko,
    permission
  }
})
