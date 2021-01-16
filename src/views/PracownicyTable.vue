<template>
  <div class="pracownicy">
     <v-main class="my-5">
      <h1>Tu są pracowniki</h1>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2"
            color="primary"
            :to="{ name: 'PracownicyForm' }"
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
        :set-items-per-page="setPracownicyItemsPerPage"
        :fetch-objects="fetchPracownicyList"
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
  name: 'PracownicyTable',
  components: { TestTable },
  data() {
    return {
      options: {}  
    };
  },
  methods: {
    ...mapMutations([
      'setPracownicyItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchPracownicyList',
      'deletePracownicy',
    ]),
    editItem(item) {
      router.push({ name: 'PracownicyForm', params: { id: item.id } });
    },
    async deleteItem(item) {
      let confirmation = confirm('Czy na pewno chcesz usunąć pracownik?')
      if (confirmation) {
        await this.deletePracownicy(item);
        this.fetchPracownicyList()
        this.showMessage({ message: 'Usunięto pracownik' });
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'getPracownicyErrors',
      count:'getPracownicyCount',
      headers:'getPracownicyListHeaders',
      items: 'getPracownicy',
      itemsPerPage: 'getPracownicyItemsPerPage'
    }),
  },
};
</script>
