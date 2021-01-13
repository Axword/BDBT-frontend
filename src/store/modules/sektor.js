import Sektor from "../../service/sektor";



const state = {
  totalItems: 0,
  sektorList: [],
  sektorDetails: {},
  errors: {},
  sektorListHeaders: [
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
  getSektor(state) {

    return state.sektorList;
  },
  getSektorDetails(state) {
    return state.sektorDetails;
  },
  getSektorCount(state) {
    return state.totalItems;
  },
  getSektorErrors(state) {
    return state.errors;
  },
  getSektorListHeaders(state) {
    return state.sektorListHeaders;
  },
  getSektorItemsPerPage(state) {
    return state.itemsPerPage;
  }
};

const mutations = {
  setSektor(state, payload) {
    state.totalItems = payload.count;
    state.sektorList = [ ...payload ];
  },
  setSektorDetails(state, payload) {
    state.sektorDetails = { ...payload };
  },
  setSektorErrors(state, payload) {
    state.errors = { ...payload };
  },
  setSektorItemsPerPage(state, value) {
    state.itemsPerPage = value;
  },
  setSektorDetailsProp(state, { prop, value }) {
    state.sektorDetails = { ...state.sektorDetails, [prop]: value };
    state.errors = { ...state.errors, [prop]: null };
  },
};

const actions = {
  async fetchSektorList(context, params) {
    try {
      context.commit('setSektor', await Sektor.list(params));
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchSektorDetails(context, id) {
    try {
      if (!id) {
        context.commit('setSektorDetails', {});
        return;
      }
      context.commit('setSektorDetails', await Sektor.get(id));
      return true;
    } catch (error) {
      return false;
    }
  },
  async createSektor(context, sektorId) {
    const success_message = sektorId ? 'Język został zaktualizowanay.': 'Język został utworzony.';
    try {
      console.log(context.state.sektorDetails)
      const Sektor = await new Sektor(context.state.sektorDetails).save();
      context.commit('setSektorDetails', Sektor);
      context.commit('setSektorErrors', {});
      context.commit('showMessage', { message: success_message });
      return true
    } catch (error) {
      context.commit('setSektorErrors', error);
      return false
    }
  },
  async deleteSektor(context, payload) {
    try {
      await new Sektor(payload).remove();
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
