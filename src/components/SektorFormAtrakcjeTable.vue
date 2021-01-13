<template>
  <div class="atrakcje">
    <v-container fluid>  
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2"
            color="primary"
            :to="{ name: 'AtrakcjeForm' }"
          >
            Dodaj
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :fetch-objects="fetchAtrakcjeList"
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
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'SektorAtrakcjeList',
    props: {
    sektorId: {
      type: [ String, Number ],
      required: true
    }
  },
  data() {

    return {
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
    async deleteItem(role) {
      confirm('Czy na pewno chcesz usunąć język?') && await this.deleteAtrakcje(role);
      this.fetchAtrakcjeList()
      this.showMessage({ message: 'Usunięto język' });

    }
  },
  computed: {
    ...mapGetters({
      errors: 'getAtrakcjeErrors',
      count:'getAtrakcjeCount',
      headers:'getAtrakcjeListHeaders',
      items: 'getAtrakcje'
    }),
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchAtrakcjeList()
  }
};
</script>
