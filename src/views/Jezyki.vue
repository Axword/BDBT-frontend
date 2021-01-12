<template>
  <div class="jezyki">
    <h1>Tu są języki</h1>
    <v-container fluid>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2"
            color="primary"
            :to="{ name: 'JezykiForm' }"
          >
            Dodaj
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
     <v-main class="my-5">
      <v-data-table
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :fetch-objects="fetchJezykList"
        locale="pl-PL"
        class="elevation-1"
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
  name: 'JezykList',
  data() {
    return {
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
    editItem(item) {
      router.push({ name: 'JezykiForm', params: { id: item.id } });
    },
    async deleteItem(role) {
      confirm('Czy na pewno chcesz usunąć język?') && await this.deleteJezyk(role);
      this.fetchJezykList()
      this.showMessage({ message: 'Usunięto język' });

    }
  },
  computed: {
    ...mapGetters({
      errors: 'getJezykErrors',
      count:'getJezykCount',
      headers:'getJezykListHeaders',
      items: 'getJezyk'
    }),
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchJezykList()
  }
};
</script>
