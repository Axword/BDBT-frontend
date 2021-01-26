import Permissions from "../../service/permission";



const state = {
  permission: {},
};
const mutations = {
    setPermissions(state, payload) {
        state.permission = payload;
    }
};
const getters = {
  getPermissions(state) {
    return state.PermissionsList;
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
};


export default {
  state,
  getters,
  mutations,
  actions
};
