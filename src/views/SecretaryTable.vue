<template>
  <div class="wynagrodzenia">
     <v-main class="elevation-0 mt-4 px-5 py-3">
      <v-row justify-content='right'>
        <v-col cols="12">
          <v-btn
            class="mr-2 my-2"
            color="primary"
            :to="{ name: 'Wynagrodzenia' }"
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
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
              icon
              title="Zmień status"
              @click="statusItem(item)"
          >
              <v-icon>
                mdi-sync
              </v-icon>
          </v-btn>
            <v-btn
              icon
              title="Sprawdź dane osobowe do przelewu"
              @click="showDetails(item)"
          >
            <v-icon>
              mdi-account-cash
            </v-icon>
          </v-btn>
        </template>
      </TestTable>
      <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Dane osobowe</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Imię"
                      v-model='pracownik.imie'
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Nazwisko"
                      v-model='pracownik.nazwisko'
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Numer telefonu"
                      v-model='pracownik.nr_telefonu'
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Numer konta"
                      v-model='pracownik.nr_konta_bankowego'
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Zamknij
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
   </template>
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
      pracownik: {},
      dialog: false,
      options: {},
      status: "Niezapłacone"
    };
  },
  methods: {
    ...mapGetters([
      'getPracownicyDetails'
      ]),
    ...mapMutations([
      'setWynagrodzeniaItemsPerPage',
      'showMessage'
    ]),
    ...mapActions([
      'fetchWynagrodzeniaList',
      'deleteWynagrodzenia',
      'updateStatus',
      'fetchPracownicyDetails'
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
        item.status = "Niezapłacone";
        await this.updateStatus(item);
        return;
      }
      item.status = "Zapłacone"
      await this.updateStatus(item);
    },
    async showDetails(item) {
      const pracownik = await this.fetchPracownicyDetails(item.id_pracownika);
      this.pracownik = pracownik;
      this.dialog=true;
    }, 
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
         this.fetchWynagrodzeniaList(paginationAdapter(this.options, { status: val }));
      }
    }
  }
};
</script>
