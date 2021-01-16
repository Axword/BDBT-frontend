import Atrakcje from "../../service/atrakcje";



const state = {
  totalItems: 0,
  atrakcjeList: [],
  atrakcjeDetails: {},
  errors: {},
  atrakcjeListHeaders: [
    {
      text: 'Nazwa',
      value: 'nazwa'
    },
    {
      text: 'Data założenia',
      value: 'data_zalozenia'
    },
    {
      text: 'Status',
      value: 'status'
    },
    {
      text: 'Akcje',
      value: 'actions',
      sortable: false
    }
  ],
  itemsPerPage: 5
};

const getters = {
  getAtrakcje(state) {

    return state.atrakcjeList;
  },
  getAtrakcjeDetails(state) {
    return state.atrakcjeDetails;
  },
  getAtrakcjeCount(state) {
    return state.totalItems;
  },
  getAtrakcjeErrors(state) {
    return state.errors;
  },
  getAtrakcjeListHeaders(state) {
    return state.atrakcjeListHeaders;
  },
  getAtrakcjeItemsPerPage(state) {
    return state.itemsPerPage;
  }
};

const mutations = {
  setAtrakcje(state, payload) {
    state.totalItems = payload.count;
    state.atrakcjeList = [ ...payload ];
  },
  setAtrakcjeDetails(state, payload) {
    state.atrakcjeDetails = { ...payload };
  },
  setAtrakcjeErrors(state, payload) {
    state.errors = { ...payload };
  },
  setAtrakcjeItemsPerPage(state, value) {
    state.itemsPerPage = value;
  },
  setAtrakcjeDetailsProp(state, { prop, value }) {
    state.atrakcjeDetails = { ...state.atrakcjeDetails, [prop]: value };
    state.errors = { ...state.errors, [prop]: null };
  },
};

const actions = {
  async fetchAtrakcjeList(context, params) {
    try {
      context.commit('setAtrakcje', await Atrakcje.list(params));
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchAtrakcjeDetails(context, id) {
    try {
      if (!id) {
        context.commit('setAtrakcjeDetails', {});
        return;
      }
      context.commit('setAtrakcjeDetails', await Atrakcje.get(id));
      return true;
    } catch (error) {
      return false;
    }
  },
  async createAtrakcje(context, atrakcjeId) {
    const success_message = atrakcjeId ? 'Atrakcje został zaktualizowanay.': 'Atrakcje został utworzony.';
    try {
      const item = await new Atrakcje(context.state.atrakcjeDetails).save();
      context.commit('setAtrakcjeDetails', item);
      context.commit('setAtrakcjeErrors', {});
      context.commit('showMessage', { message: success_message });
    } catch (error) {
      context.commit('setAtrakcjeErrors', error);
    }
  },
  async deleteAtrakcje(context, payload) {
    try {
      await new Atrakcje(payload).remove();
      return true;
    } catch (error) {
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
