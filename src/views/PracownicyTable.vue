<template>
  <div class="pracownicy">
     <v-main class="elevation-0 mt-4 px-5 py-3">
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2 my-4"
            color="primary"
            :to="{ name: 'Pracownicy' }"
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
          title="Edytuj pracownika"
          @click="editItem(item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Zwolnij pracownika"
          @click="deleteItem(item)"
        >
          <v-icon>
            mdi-account-cancel
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
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'ListaPracowników',
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
      'updateStatusPracownicy',
    ]),
    editItem(item) {
      router.push({ name: 'Pracownicy', params: { id: item.id } });
    },
    async deleteItem(item) {
      let confirmation = confirm('Czy na pewno chcesz zwolnić pracownika?')
      if (confirmation) {
        item.data_zwolnienia = this.today
        await this.updateStatusPracownicy(item)
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
    today() {
      return moment().format('YYYY-MM-DD');
    },
  },
};
</script>
