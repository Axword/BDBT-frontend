import Pracownicy from "../../service/pracownicy";
import SelectOptions from '@/service/selectOptions';



const state = {
  totalItems: 0,
  pracownicyList: [],
  pracownicyChoices: [],
  pracownicyNameMap: {},
  pracownicyDetails: {},
  errors: {},
  selectedPracownicy: {},
  pracownicyListHeaders: [
    {
      text: 'Imie',
      value: 'imie'
    },
    {
      text: 'Nazwisko',
      value: 'nazwisko'
    },
    {
        text: 'Nr Telefonu',
        value: 'nr_telefonu'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Data urodzenia',
        value: 'data_urodzenia'
      },
      {
        text: 'Data zatrudnienia',
        value: 'data_zatrudnienia'
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
  getPracownicy(state) {
    return state.pracownicyList;
  },
  getPracownicyDetails(state) {
    return state.pracownicyDetails;
  },
  getPracownicyCount(state) {
    return state.totalItems;
  },
  getPracownicyErrors(state) {
    return state.errors;
  },
  getPracownicyListHeaders(state) {
    return state.pracownicyListHeaders;
  },
  getPracownicyItemsPerPage(state) {
    return state.itemsPerPage;
  },
  getPracownicyChoices(state) {
    return state.pracownicyChoices;
  },
  getSelectedPracownicy(state) {
    return state.selectedPracownicy;
  },
};

const mutations = {
  setPracownicy(state, payload) {
    state.totalItems = payload.count;
    state.pracownicyList = [ ...payload ];
  },
  setPracownicyDetails(state, payload) {
    state.pracownicyDetails = { ...payload };
  },
  setPracownicyErrors(state, payload) {
    state.errors = { ...payload };
  },
  setPracownicyItemsPerPage(state, value) {
    state.itemsPerPage = value;
  },
  setPracownicyDetailsProp(state, { prop, value }) {
    state.pracownicyDetails = { ...state.pracownicyDetails, [prop]: value };
    state.errors = { ...state.errors, [prop]: null };
  },
  setPracownicyChoices(state, payload) {
    state.pracownicyChoices = [... payload];
    state.pracownicyNamesMap = { ...payload.reduce((acc, val) => (acc[val.id] = val.name, acc), {}) };
  },
  setSelectedPracownik(state, value) {
    state.selectedPracownik = { ...value };
  },
};

const actions = {
  async fetchPracownicyList(context, params) {
    try {
      context.commit('setPracownicy', await Pracownicy.list(params));
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchPracownicyDetails(context, id) {
    try {
      if (!id) {
        context.commit('setPracownicyDetails', {});
        return;
      }
      let pracownik = await Pracownicy.get(id)
      context.commit('setPracownicyDetails', pracownik);
      return pracownik;
    } catch (error) {
      return false;
    }
  },
  async createPracownicy(context, pracownicyId) {
    const success_message = pracownicyId ? 'Pracownik został zaktualizowanay.': 'Pracownik został utworzony.';
    try {
      const item = await new Pracownicy(context.state.pracownicyDetails).save();
      context.commit('setPracownicyDetails', item);
      context.commit('setPracownicyErrors', {});
      context.commit('showMessage', { message: success_message });
      return true;
    } catch (error) {
      context.commit('setPracownicyErrors', error);
      return false;
    }
  },
  async deletePracownicy(context, payload) {
    try {
      await new Pracownicy(payload).remove();
      return true;
    } catch (error) {
      return false;
    }
  },
  async fetchPracownicyChoices(context, params=null) {
    try {
      context.commit('setPracownicyChoices', await SelectOptions.get('pracownicy', 'pracownik', params));
      return true
    } catch (error) {
      return false
    }
  },
  async updateStatusPracownicy(context, payload) {
    try {
      await new Pracownicy(payload).save();
      context.commit('showMessage', { message: "Pracownik został zwolniony. Data zwolnienia została ustawiona na dzisiejszą"});
    } catch(error) {
      return false
    }
  }
};


export default {
  state,
  getters,
  mutations,
  actions
};
