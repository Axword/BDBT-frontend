<template>
  <div class="wynagrodzenia">
      <TestTable 
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :fetch-objects="fetchWynagrodzeniaList"
        :fetch-object-params=" {id_pracownika: pracownikId}"
        locale="pl-PL"
        class="elevation-1"
      >
      </TestTable>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import TestTable from '@/components/TestTable';
export default {
  name: 'WynagrodzeniaList',
  components: { TestTable },
    props: {
    pracownikId: {
      type: [ String, Number ],
      required: true
    }
  },
  data() {

    return {
    headers: [
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
    }]
    };
  },
  methods: {
    ...mapMutations([
      'setWynagrodzeniaItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchWynagrodzeniaList',
      'deleteWynagrodzenia',
    ]),
    editItem(item) {
      router.push({ name: 'WynagrodzeniaForm', params: { id: item.id } });
    },
    async deleteItem(role) {
      confirm('Czy na pewno chcesz usunąć wynagrodzenie?') && await this.deleteWynagrodzenia(role);
      this.fetchWynagrodzeniaList()
      this.showMessage({ message: 'Usunięto wynagrodzenie' });

    }
  },
  computed: {
    ...mapGetters({
      errors: 'getWynagrodzeniaErrors',
      count:'getWynagrodzeniaCount',
      items: 'getWynagrodzenia'
    }),
  },
};
</script>
