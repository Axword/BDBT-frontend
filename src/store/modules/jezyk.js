import Jezyki from "../../service/jezyk";



const state = {
  totalItems: 0,
  jezykList: [],
  jezykDetails: {},
  errors: {},
  jezykListHeaders: [
    {
      text: 'Kod języka',
      align: 'left',
      value: 'kod_jezyka',
    },
    {
      text: 'Nazwa',
      value: 'nazwa',
      sortable: true
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
  getJezyk(state) {

    return state.jezykList;
  },
  getJezykDetails(state) {
    return state.jezykDetails;
  },
  getJezykCount(state) {
    return state.totalItems;
  },
  getJezykErrors(state) {
    return state.errors;
  },
  getJezykListHeaders(state) {
    return state.jezykListHeaders;
  },
  getJezykItemsPerPage(state) {
    return state.itemsPerPage;
  }
};

const mutations = {
  setJezyk(state, payload) {
    state.totalItems = payload.count;
    state.jezykList = [ ...payload ];
  },
  setJezykDetails(state, payload) {
    state.jezykDetails = { ...payload };
  },
  setJezykErrors(state, payload) {
    state.errors = { ...payload };
  },
  setJezykItemsPerPage(state, value) {
    console.log(value)
    state.itemsPerPage = value;
  },
  setJezykDetailsProp(state, { prop, value }) {
    state.jezykDetails = { ...state.jezykDetails, [prop]: value };
    state.errors = { ...state.errors, [prop]: null };
  },
};

const actions = {
  async fetchJezykList(context, params) {
    try {
      context.commit('setJezyk', await Jezyki.list(params));
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchJezykDetails(context, id) {
    try {
      if (!id) {
        context.commit('setJezykDetails', {});
        return;
      }
      context.commit('setJezykDetails', await Jezyki.get(id));
      return true;
    } catch (error) {
      return false;
    }
  },
  async createJezyk(context, jezykId) {
    const success_message = jezykId ? 'Język zistal zaktualizowanay.': 'Język został utworzony.';
    try {
      console.log(context.state.jezykDetails)
      const jezyk = await new Jezyki(context.state.jezykDetails).save();
      context.commit('setJezykDetails', jezyk);
      context.commit('setJezykErrors', {});
      context.commit('showMessage', { message: success_message });
      return true
    } catch (error) {
      context.commit('setJezykErrors', error);
      return false
    }
  },
  async deleteJezyk(context, payload) {
    try {
      await new Jezyki(payload).remove();
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
