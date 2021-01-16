<template>
  <div class="atrakcje">
     <v-main class="elevation-0 mt-4 px-5 py-3">
      <h1>Tu są Atrakcje</h1>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2 my-4"
            color="primary"
            :to="{ name: 'AtrakcjeForm' }"
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
        :set-items-per-page="setAtrakcjeItemsPerPage"
        :fetch-objects="fetchAtrakcjeList"
        locale="pl-PL"
        class="elevation-1"
      >
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          title="Edytuj pracownik"
          @click="editItem(item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Usuń pracownik"
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
  name: 'AtrakcjeTable',
  components: { TestTable },
  data() {
    return {
      options: {}  
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
    editItem(item) {
      router.push({ name: 'AtrakcjeForm', params: { id: item.id } });
    },
    async deleteItem(item) {
      let confirmation = confirm('Czy na pewno chcesz usunąć atrakcje?')
      if (confirmation) {
        await this.deleteAtrakcje(item);
        this.fetchAtrakcjeList()
        this.showMessage({ message: 'Usunięto pracownik' });
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'getAtrakcjeErrors',
      count:'getAtrakcjeCount',
      headers:'getAtrakcjeListHeaders',
      items: 'getAtrakcje',
      itemsPerPage: 'getAtrakcjeItemsPerPage'
    }),
  },
};
</script>
