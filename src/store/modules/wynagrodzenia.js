import Wynagrodzenia from "../../service/wynagrodzenia";



const state = {
  totalItems: 0,
  wynagrodzeniaList: [],
  wynagrodzeniaDetails: {},
  errors: {},
  wynagrodzeniaListHeaders: [
    {
      text: 'Data wynagrodzenia',
      value: 'data_wynagrodzenia'
    },
    {
      text: 'Kwota podstawowa',
      value: 'kwota_podstawowa'
    },
    {
      text: 'Kwota dodatkowa',
      value: 'kwota_dodatkowa'
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
  getWynagrodzenia(state) {

    return state.wynagrodzeniaList;
  },
  getWynagrodzeniaDetails(state) {
    return state.wynagrodzeniaDetails;
  },
  getWynagrodzeniaCount(state) {
    return state.totalItems;
  },
  getWynagrodzeniaErrors(state) {
    return state.errors;
  },
  getWynagrodzeniaListHeaders(state) {
    return state.wynagrodzeniaListHeaders;
  },
  getWynagrodzeniaItemsPerPage(state) {
    return state.itemsPerPage;
  }
};

const mutations = {
  setWynagrodzenia(state, payload) {
    state.totalItems = payload.count;
    state.wynagrodzeniaList = [ ...payload ];
  },
  setWynagrodzeniaDetails(state, payload) {
    state.wynagrodzeniaDetails = { ...payload };
  },
  setWynagrodzeniaErrors(state, payload) {
    state.errors = { ...payload };
  },
  setWynagrodzeniaItemsPerPage(state, value) {
    state.itemsPerPage = value;
  },
  setWynagrodzeniaDetailsProp(state, { prop, value }) {
    state.wynagrodzeniaDetails = { ...state.wynagrodzeniaDetails, [prop]: value };
    state.errors = { ...state.errors, [prop]: null };
  },
};

const actions = {
  async fetchWynagrodzeniaList(context, params) {
    try {
      context.commit('setWynagrodzenia', await Wynagrodzenia.list(params));
      return true;
    } catch (error) {
      context.commit('showMessage', { message: "Wystąpił błąd przy zmianie odświeżaniu", color: 'error'});
      return false;
    }
  },
  async fetchWynagrodzeniaDetails(context, id) {
    try {
      if (!id) {
        context.commit('setWynagrodzeniaDetails', {});
        return;
      }
      context.commit('setWynagrodzeniaDetails', await Wynagrodzenia.get(id));
      return true;
    } catch (error) {
      return false;
    }
  },
  async createWynagrodzenia(context, wynagrodzeniaId) {
    const success_message = wynagrodzeniaId ? 'Wynagrodzenie zostało zaktualizowane.': 'Wynagrodzenie został utworzone.';
    try {
      const item = await new Wynagrodzenia(context.state.wynagrodzeniaDetails).save();
      context.commit('setWynagrodzeniaDetails', item);
      context.commit('setWynagrodzeniaErrors', {});
      context.commit('showMessage', { message: success_message });
      return true
    } catch (error) {
      context.commit('setWynagrodzeniaErrors', error);
      return false
    }
  },
  async deleteWynagrodzenia(context, payload) {
    try {
      await new Wynagrodzenia(payload).remove();
      return true;
    } catch (error) {
      return false;
    }
  },
  async updateStatus(context, payload) {
    try {
      await new Wynagrodzenia(payload).save();
      context.commit('showMessage', { message: "Zaktualizowano status"});
    } catch(error) {
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
