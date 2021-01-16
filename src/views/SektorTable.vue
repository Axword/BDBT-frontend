<template>
  <div class="sektor">

     <v-main class="elevation-0 mt-4 px-5 py-3">
      <h1>Tu są sektory</h1>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2 my-4"
            color="primary"
            :to="{ name: 'SektorForm' }"
          >
            Dodaj
          </v-btn>
        </v-col>
      </v-row>
      <TestTable
        :headers="headers"
        :items="items"
        :items-count="count"
        :get-items-per-page="itemsPerPage"
        :set-items-per-page="setSektorItemsPerPage"
        :fetch-objects="fetchSektorList"
        locale="pl-PL"
        class="elevation-1"
      >
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          title="Edytuj sektor"
          @click="editItem(item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Usuń sektor"
          @click="deleteItem(item)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      </TestTable>
     </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import TestTable from '@/components/TestTable'
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'SektorTable',
  components: { TestTable },
  data() {
    return {
      options: {}  
    };
  },
  methods: {
    ...mapMutations([
      'setSektorItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchSektorList',
      'deleteSektor',
    ]),
    editItem(item) {
      router.push({ name: 'SektorForm', params: { id: item.id } });
    },
    async deleteItem(item) {
      let confirmation = confirm('Czy na pewno chcesz usunąć sektor?')
      if (confirmation) {
        await this.deleteSektor(item);
        this.fetchSektorList()
        this.showMessage({ message: 'Usunięto sektor' });
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'getSektorErrors',
      count:'getSektorCount',
      headers:'getSektorListHeaders',
      items: 'getSektor',
      itemsPerPage: 'getSektorItemsPerPage'
    }),
  },
};
</script>
