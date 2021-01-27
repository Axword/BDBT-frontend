import Permissions from "../../service/permission";




const state = {
  permission: {},
  linksPermissions: [],
  links:[
    { icon: 'mdi-card-account-details', text: 'Stanowiska', route: '/stanowiska', requiredPerm: 'pracownicy.view_stanowisko', canView: 1 },
    { icon: 'mdi-globe-model', text: 'Języki', route: '/jezyki', requiredPerm: 'jezyki.view_jezyk', canView: 1},
    { icon: 'mdi-view-dashboard', text: 'Sektory', route: '/sektor', requiredPerm: 'parki.view_sektor', canView: 1},
    { icon: 'mdi-account-multiple', text: 'Pracownicy', route: '/pracownicy', requiredPerm: 'pracownicy.view_pracownik', canView: 1},
    { icon: 'mdi-account-cash', text: 'Wynagrodzenia', route: '/wynagrodzenia', requiredPerm: 'pracownicy.view_wynagrodzenie', canView: 1 },
    { icon: 'mdi-ferris-wheel', text: 'Atrakcje', route: '/atrakcje', requiredPerm: 'atrakcje.view_atrakcja', canView: 1 },
    // do dodania na każdy widok co będziemy robić 
  ]
};

const mutations = {
  setPermissions(state, payload) {
    state.permission = payload;
    },
  setLinksPermissions(state, payload) {
    state.linksPermissions = payload
  }
};
const getters = {
  getPermissions(state) {
    return state.permission;
  },
  getLinksPermissions(state) {
    return state.linksPermissions
  }
};
const actions = {
  async updatePermissions(context) {
    try {
      const perms = await Permissions.getPermissions()
      context.commit('setPermissions', perms);
      return perms;
    } catch(error) {
      return false;
    }
  },
  async updateLinks(context, perms) {
    const table = []
    for (const i in state.links){
      if (perms.includes(state.links[i].requiredPerm)) {
        table.push(state.links[i])
      }
    }
    context.commit('setLinksPermissions', table);
  }
};


export default {
  state,
  getters,
  mutations,
  actions
};
