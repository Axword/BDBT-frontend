import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/snackbar'
import jezyk from './modules/jezyk';
import sektor from './modules/sektor'
import atrakcje  from './modules/atrakcje'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    jezyk,
    snackbar,
    sektor,
    atrakcje
  }
})
