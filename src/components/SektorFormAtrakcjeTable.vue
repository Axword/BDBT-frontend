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
      </TestTable>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router';
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
      router.push({ name: 'Lista Atrakcji', params: { id: item.id } });
    },
    async deleteItem(role) {
      confirm('Czy na pewno chcesz usunąć atrakcje?') && await this.deleteAtrakcje(role);
      this.fetchAtrakcjeList()
      this.showMessage({ message: 'Usunięto atrakcje' });

    }
  },
  computed: {
    ...mapGetters({
      errors: 'getAtrakcjeErrors',
      count:'getAtrakcjeCount',
      items: 'getAtrakcje',
      headers:'getAtrakcjeListHeaders',
    }),
  },
};
</script>
