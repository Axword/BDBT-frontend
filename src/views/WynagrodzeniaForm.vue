<template>
 <div class="wynagrodzenie">
   <v-main class="elevation-3 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="wynagrodzenia.kwota_podstawowa"
              name="kwota_podstawowa"
              label="Kwota podstawowa"
              type="text"
              :rules="[rules.required]"
              :error-messages="errors.kwota_podstawowa"
              maxlength="25"
            >
            </v-text-field>
            <v-text-field
              v-model="wynagrodzenia.kwota_dodatkowa"
              name="kwota_dodatkowa"
              label="Kwota dodatkowa"
              :rules="[rules.required]"
              type="text"
              :error-messages="errors.kwota_dodatkowa"
              maxlength="25"
            >
            </v-text-field>
            <v-menu
            :clonse-on-content-click="true"
            v-model="menu"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                  v-model="wynagrodzenia.data_wynagrodzenia"
                  name='data_wynagrodzenia'
                  label="Data wynagrodzenia"
                  readonly
                  :error-messages="errors.nazwa"
                  :clearable="true"
                  clear-icon="mdi-delete-outline"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="wynagrodzenia.data_wynagrodzenia"
                :max="today"
                label="Data założenia"
                prepend-icon="mdi-calendar"
                locale="pl">
              </v-date-picker>
            </v-menu>
            <v-select
              v-model="wynagrodzenia.status"
              name='Status'
              label="Status"
              type="text"
              :rules="[rules.required]"
              :error-messages="errors.status"
              :items="status"
            >
            </v-select>
            <v-autocomplete
                label="Pracownik"
                :item-text="item => item.imie +  '  ' + item.nazwisko"
                item-value="id"
                v-model="wynagrodzenia.id_pracownika"
                :items="pracownicyChoices"
                :rules="[rules.required]"
                :error-messages="errors.id_pracownika"
            ></v-autocomplete>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-2 my-1"
                  color="primary"
                  title="Zapisz"
                  :disabled="!form.valid"
                  @click="createItem(wynagrodzeniaId, false)"
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
    </v-main>
 </div>
</template>
<script>
import router from '@/router';
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
export default {
  name: 'WynagrodzeniaLista',
  data() {
    return {
      menu: false,
      date: new Date(),
      wynagrodzeniaHandler: {},
      status: ['Zapłacone', 'Niezapłacone'],
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
      router.push({ name: 'Lista wynagrodzeń' });
    },
    async createItem(wynagrodzeniaId) {
      let success = await this.createWynagrodzenia(wynagrodzeniaId);
      if (success) {
          router.push({ name: 'Lista wynagrodzeń' }).catch(() => {});
      }
    },
    ...mapGetters([
      'getWynagrodzeniaDetails',
    ]),
    ...mapMutations([
      'setWynagrodzeniaDetails',
      'setWynagrodzeniaDetailsProp'
    ]),
    ...mapActions([
      'fetchWynagrodzeniaDetails',
      'createWynagrodzenia',
      'fetchPracownicyChoices'
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getWynagrodzeniaErrors',
      pracownicyChoices: 'getPracownicyChoices'
    }),
    wynagrodzeniaId() {
      return this.$route.params.id;
    },
    wynagrodzenia() {
      return new Proxy(this.getWynagrodzeniaDetails(), this.wynagrodzeniaHandler);
    },
    today() {
      return moment().format('YYYY-MM-DD');
    },
  },
  created() {
    this.wynagrodzeniaHandler = objectHandler(this.setWynagrodzeniaDetailsProp);
    this.fetchWynagrodzeniaDetails(this.wynagrodzeniaId);
    this.fetchPracownicyChoices({ ordering: 'imie' });
  }
};
</script>
