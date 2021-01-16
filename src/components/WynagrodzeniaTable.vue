<template>
  <div class="wynagrodzenia">
      <TestTable 
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :fetch-objects="fetchWynagrodzeniaList"
        :fetch-object-params=" {id_pracownika: pracownikId}"
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
import TestTable from '@/components/TestTable'
export default {
  name: 'WynagrodzeniaList',
  components: { TestTable },
    props: {
    pracownikId: {
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
      'setWynagrodzeniaItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchWynagrodzeniaList',
      'deleteWynagrodzenia',
    ]),
    editItem(item) {
      router.push({ name: 'WynagrodzeniaForm', params: { id: item.id } });
    },
    async deleteItem(role) {
      confirm('Czy na pewno chcesz usunąć język?') && await this.deleteWynagrodzenia(role);
      this.fetchWynagrodzeniaList()
      this.showMessage({ message: 'Usunięto język' });

    }
  },
  computed: {
    ...mapGetters({
      errors: 'getWynagrodzeniaErrors',
      count:'getWynagrodzeniaCount',
      headers:'getWynagrodzeniaListHeaders',
      items: 'getWynagrodzenia'
    }),
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchWynagrodzeniaList()
  }
};
</script>
