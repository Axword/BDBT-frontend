<template>
  <div class="sektor">
     <v-main class="my-5">
      <h1>Tu są języki</h1>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2"
            color="primary"
            :to="{ name: 'SektorForm' }"
          >
            Dodaj
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :fetch-objects="fetchSektorList"
        locale="pl-PL"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:item.actions="{ item }">
        <v-btn
            icon
            title="Edytuj język"
            @click="editItem(item)"
        >
            <v-icon>
            mdi-pencil
            </v-icon>
        </v-btn>
        <v-btn
            icon
            title="Usuń język"
            @click="deleteItem(item)"
        >
            <v-icon>
            mdi-delete
            </v-icon>
        </v-btn>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'SektorList',
  data() {
    return {
        pagination: {
            ascending: true,
            sortBy:"name",
            rowsPerPage: 5,
            page: 1
        }
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
      confirm('Czy na pewno chcesz usunąć język?') && await this.deleteSektor(item);
      this.fetchSektorList()
      this.showMessage({ message: 'Usunięto język' });

    }
  },
  computed: {
    ...mapGetters({
      errors: 'getSektorErrors',
      count:'getSektorCount',
      headers:'getSektorListHeaders',
      items: 'getSektor'
    }),
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchSektorList()
  }
};
</script>
