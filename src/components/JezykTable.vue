<template>
  <div class="jezyki">
      <TestTable
        :headers="headers"
        :items="items"
        :items-count="count"
        :get-items-per-page="itemsPerPage"
        :set-items-per-page="setJezykItemsPerPage"
        :fetch-object-params=" {id_pracownika: pracownikId}"
        :fetch-objects="fetchJezykList"
        locale="pl-PL"
        class="elevation-1"
      >
      </TestTable>
  </div>
</template>

<script>
// @ is an alias to /src
import TestTable from '@/components/TestTable'
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'JezykList',
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
      text: 'Kod języka',
      value: 'kod_jezyka',
    },
    {
      text: 'Nazwa',
      value: 'nazwa',
      sortable: true
    },
    {
      text: 'Kod poziomu',
      value: 'kod_poziomu',
    }]
    };
  },
  methods: {
    ...mapMutations([
      'setJezykItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchJezykList',
      'deleteJezyk',
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getJezykErrors',
      count:'getJezykCount',
      items: 'getJezyk',
      itemsPerPage: 'getJezykItemsPerPage'
    }),
  },
};
</script>
