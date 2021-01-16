<template>
  <div class="wynagrodzenia">
     <v-main class="elevation-0 mt-4 px-5 py-3">
      <h1>Wynagrodzenia</h1>
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2 my-2"
            color="primary"
            :to="{ name: 'WynagrodzeniaForm' }"
          >
            Dodaj
          </v-btn>
          <v-btn
            class="mr-2"
            color="primary"
            @click="fetchZaplacone()"

          >
            Zmień filtr statusu z "{{ status }}"
          </v-btn>
        </v-col>
      </v-row>
    </v-main>
      <TestTable 
        :headers="headers"
        :items="items"
        :server-items-length="count"
        :get-items-per-page="itemsPerPage"
        :set-items-per-page="setWynagrodzeniaItemsPerPage"
        :fetch-objects="fetchWynagrodzeniaList"
        :fetch-object-params=" { status: status }"
        locale="pl-PL"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
        <v-btn
            icon
            title="Zmień status"
            @click="statusItem(item)"
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { paginationAdapter } from '@/store/utils';
import TestTable from '@/components/TestTable'
export default {
  name: 'SecretaryTable',
  components: { TestTable },
  data() {
    return {
      options: {},
      status: "Niezapłacone"
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
      'updateStatus'
    ]),
    async fetchZaplacone(){
      if (this.status === "Niezapłacone") {
        this.status = "Zapłacone";
        return;
      }
      this.status = "Niezapłacone";
    },
    async statusItem(item) {
      if (item.status === "Zapłacone") {
        item.status = "Niezapłacone"
        await this.updateStatus(item)
        return
      }
      item.status = "Zapłacone"
      await this.updateStatus(item)
    } 
  },
  computed: {
    ...mapGetters({
      errors: 'getWynagrodzeniaErrors',
      count:'getWynagrodzeniaCount',
      headers:'getWynagrodzeniaListHeaders',
      items: 'getWynagrodzenia',
      itemsPerPage: 'getWynagrodzeniaItemsPerPage'
    }),
  },
  watch: {
    status: {
      handler(val) {
         this.fetchWynagrodzeniaList(paginationAdapter(this.options, { status: val }))
      }
    }
  }
};
</script>
