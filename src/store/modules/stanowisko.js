import Stanowisko from "../../service/stanowisko";
import SelectOptions from '@/service/selectOptions';



const state = {
  totalItems: 0,
  stanowiskoList: [],
  stanowiskoChoices: [],
  stanowiskoNameMap: {},
  stanowiskoDetails: {},
  errors: {},
  stanowiskoListHeaders: [
    {
      text: 'Nazwa',
      value: 'nazwa'
    },
    {
      text: 'Opis',
      value: 'opis'
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
  getStanowisko(state) {
    return state.stanowiskoList;
  },
  getStanowiskoDetails(state) {
    return state.stanowiskoDetails;
  },
  getStanowiskoCount(state) {
    return state.totalItems;
  },
  getStanowiskoErrors(state) {
    return state.errors;
  },
  getStanowiskoListHeaders(state) {
    return state.stanowiskoListHeaders;
  },
  getStanowiskoItemsPerPage(state) {
    return state.itemsPerPage;
  },
  getStanowiskoChoices(state) {
    return state.stanowiskoChoices;
  },
};

const mutations = {
  setStanowisko(state, payload) {
    state.totalItems = payload.count;
    state.stanowiskoList = [ ...payload ];
  },
  setStanowiskoDetails(state, payload) {
    state.stanowiskoDetails = { ...payload };
  },
  setStanowiskoErrors(state, payload) {
    state.errors = { ...payload };
  },
  setStanowiskoItemsPerPage(state, value) {
    state.itemsPerPage = value;
  },
  setStanowiskoDetailsProp(state, { prop, value }) {
    state.stanowiskoDetails = { ...state.stanowiskoDetails, [prop]: value };
    state.errors = { ...state.errors, [prop]: null };
  },
  setStanowiskoChoices(state, payload) {
    state.stanowiskoChoices = [... payload];
    state.stanowiskoNamesMap = { ...payload.reduce((acc, val) => (acc[val.id] = val.name, acc), {}) };
  },
};

const actions = {
  async fetchStanowiskoList(context, params) {
    try {
      context.commit('setStanowisko', await Stanowisko.list(params));
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchStanowiskoDetails(context, id) {
    try {
      if (!id) {
        context.commit('setStanowiskoDetails', {});
        return;
      }
      context.commit('setStanowiskoDetails', await Stanowisko.get(id));
      return true;
    } catch (error) {
      return false;
    }
  },
  async createStanowisko(context, stanowiskoId) {
    const success_message = stanowiskoId ? 'Stanowisko zostało zaktualizowanae.': 'Stanowisko zostało utworzone.';
    try {
      const item = await new Stanowisko(context.state.stanowiskoDetails).save();
      context.commit('setStanowiskoDetails', item);
      context.commit('setStanowiskoErrors', {});
      context.commit('showMessage', { message: success_message });
      return true
    } catch (error) {
      context.commit('setStanowiskoErrors', error);
      return false;
    }
  },
  async deleteStanowisko(context, payload) {
    try {
      await new Stanowisko(payload).remove();
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchStanowiskoChoices(context, params=null) {
    try {
      context.commit('setStanowiskoChoices', await SelectOptions.get('stanowisko', 'pracownik', params));
      return true
    } catch (error) {
      return false
    }
  },
};


export default {
  state,
  getters,
  mutations,
  actions
};
