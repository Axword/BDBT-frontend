<template>
  <div class="atrakcje">
      <TestTable 
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :fetch-objects="fetchAtrakcjeList"
        :fetch-object-params=" {id_sektora: sektorId}"
        locale="pl-PL"
        class="elevation-1"
      >
      </TestTable>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations, mapActions } from 'vuex';
import TestTable from '@/components/TestTable';
export default {
  name: 'SektorAtrakcjeList',
    components: { TestTable },
    props: {
    sektorId: {
      type: [ String, Number ],
      required: true
    }
  },
  data() {
    return {
      headers:  [
    {
      text: 'Nazwa',
      value: 'nazwa'
    },
    {
      text: 'Producent',
      value: 'producent'
    },
    {
      text: 'Typ atrakcji',
      value: 'typ_atrakcji'
    },
    {
      text: 'Status',
      value: 'status'
    }],
    };
  },
  methods: {
    ...mapMutations([
      'setAtrakcjeItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchAtrakcjeList',
      'deleteAtrakcje',
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getAtrakcjeErrors',
      count:'getAtrakcjeCount',
      items: 'getAtrakcje',
    }),
  },
};
</script>
