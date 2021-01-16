<template>
  <div class="stanowisko">

     <v-main class="elevation-0 mt-4 px-5 py-3">
      <h1>Tu są stanowisko</h1>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2 my-4"
            color="primary"
            :to="{ name: 'StanowiskoForm' }"
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
        :set-items-per-page="setStanowiskoItemsPerPage"
        :fetch-objects="fetchStanowiskoList"
        locale="pl-PL"
        class="elevation-1"
      >
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          title="Usuń stanowisko"
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'StanowiskoTable',
  components: { TestTable },
  data() {
    return {
      options: {}  
    };
  },
  methods: {
    ...mapMutations([
      'setStanowiskoItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchStanowiskoList',
      'deleteStanowisko',
    ]),
    async deleteItem(item) {
      let confirmation = confirm('Czy na pewno chcesz usunąć stanowisko?')
      if (confirmation) {
        await this.deleteStanowisko(item);
        this.fetchStanowiskoList()
        this.showMessage({ message: 'Usunięto stanowisko' });
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'getStanowiskoErrors',
      count:'getStanowiskoCount',
      headers:'getStanowiskoListHeaders',
      items: 'getStanowisko',
      itemsPerPage: 'getStanowiskoItemsPerPage'
    }),
  },
};
</script>
