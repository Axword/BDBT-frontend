<template>
  <v-app>
    <v-main class="elevation-1 mt-4">
     <h2>Widok pracownicy</h2>
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="pracownicy.nazwa"
              name='nazwa'
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="3"
            >
            </v-text-field>
            <v-autocomplete
              v-model="pracownicy.status"
              :items="statusy"
              name="status"
              label="Nazwa"
              type="text"
              :error-messages="errors.status"
              :autocomplete="'off'"
            >
            </v-autocomplete>
            <v-text-field
              v-model="pracownicy.data_zalozenia"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="25"
            >
            <v-text-field
              v-model="pracownicy.nazwa"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="25"
            >
            </v-text-field>  
            </v-text-field>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-2 my-1"
                  color="primary"
                  title="Zapisz"
                  :disabled="!form.valid"
                  @click="createItem(pracownicyId, false)"
                >
                  Zapisz
                </v-btn>
                <v-btn
                  class="mr-2 my-1"
                  title="Wróć"
                  @click="back()"
                >
                  Wróć
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    <v-main class="px-0">
        <v-row class="elevation-1">
            <v-col>
                <v-tabs
                    v-if="!! this.$route.params.id">
                    <v-tab>
                    Wynagrodzenia
                    </v-tab>
                    <v-tab-item>
                        <wynagrodzenia-table
                            :pracownikId="$route.params.id">
                        </wynagrodzenia-table>
                    </v-tab-item>
                    <v-tab>
                    Języki
                    </v-tab>
                    <v-tab-item>
                        <jezyki
                            :pracownikId="$route.params.id">
                        </jezyki>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
      </v-main>
   </v-main>
  </v-app>
</template>

<script>
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
import WynagrodzeniaTable from '@/components/WynagrodzeniaTable'
import Jezyki from '@/components/JezykTable'
export default {
  name: 'PracownicyForm',
  components: { WynagrodzeniaTable, Jezyki },
  data() {
    return {
      statusy: ['Otwarty', 'Zamknięty'],
      pracownicyHandler: {},
      form: {
        valid: true
      },
      rules: {
        required: value => !! value || 'To pole jest wymagane',
      },
    };
  },
  methods: {
    back() {
      router.push({ name: 'PracownicyTable' });
    },
    async createItem(pracownicyId) {
      let success = await this.createPracownicy(pracownicyId);
      if (success) {
          router.push({ name: 'PracownicyTable' }).catch(() => {});
      }
    },
    ...mapGetters([
      'getPracownicyDetails',
    ]),
    ...mapMutations([
      'setPracownicyDetails',
      'setPracownicyDetailsProp'
    ]),
    ...mapActions([
      'fetchPracownicyDetails',
      'createPracownicy',
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getPracownicyErrors'
    }),
    pracownicyId() {
      return this.$route.params.id;
    },
    pracownicy() {
      return new Proxy(this.getPracownicyDetails(), this.pracownicyHandler);
    },
  },
  created() {
    this.pracownicyHandler = objectHandler(this.setPracownicyDetailsProp);
    this.fetchPracownicyDetails(this.pracownicyId);
  }
};
</script>
