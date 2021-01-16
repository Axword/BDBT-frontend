<template>
  <div class="jezyki">
      <TestTable
        :headers="headers"
        :items="items"
        :items-count="count"
        :get-items-per-page="itemsPerPage"
        :set-items-per-page="setJezykItemsPerPage"
        :fetch-object-params=" {id_pracownika: pracownikId}"
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
      </TestTable>
  </div>
</template>

<script>
// @ is an alias to /src
import TestTable from '@/components/TestTable'
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'JezykList',
  components: { TestTable },
  props: {
    pracownikId: {
      type: [ String, Number ],
      required: true
    }
  },
  data() {
    return {
      options: {}  
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
    async deleteItem(item) {
      let confirmation = confirm('Czy na pewno chcesz usunąć język?')
      if (confirmation) {
        await this.deleteJezyk(item);
        this.fetchJezykList()
        this.showMessage({ message: 'Usunięto język' });
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'getJezykErrors',
      count:'getJezykCount',
      headers:'getJezykListHeaders',
      items: 'getJezyk',
      itemsPerPage: 'getJezykItemsPerPage'
    }),
  },
};
</script>
