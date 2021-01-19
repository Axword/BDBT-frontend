<template>
   <v-main class="elevation-3 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <h2>{{pracownikName}}</h2>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="pracownicy.imie"
              name='nazwa'
              label='Imię'
              type="text"
              :error-messages="errors.imie"
              maxlength="30"
            >
            </v-text-field>
            <v-text-field
              v-model="pracownicy.nazwisko"
              name="nazwisko"
              label="Nazwisko"
              type="text"
              :error-messages="errors.nazwisko"
              maxlength="30"
            >
            </v-text-field>  
            <v-text-field
              v-model="pracownicy.pesel"
              name="pesel"
              label="Pesel"
              type="text"
              :error-messages="errors.pesel"
              maxlength="25"
            >
            </v-text-field>
            <v-text-field
              v-model="pracownicy.email"
              name="email"
              label="Email"
              type="text"
              :error-messages="errors.email"
              maxlength="50"
            >
            </v-text-field>
            <v-text-field
              v-model="pracownicy.nr_telefonu"
              name="nr_telefonu"
              label="Numer telefonu"
              type="text"
              :error-messages="errors.nr_telefonu"
              maxlength="11"
            >
            </v-text-field>
            <v-text-field
              v-model="pracownicy.nr_konta_bankowego"
              name="nr_konta_bankowego"
              label="Numer konta bankowego"
              type="text"
              :error-messages="errors.nr_konta_bankowego"
              maxlength="26"
            >
            </v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                  v-model="pracownicy.data_urodzenia"
                  name='data_urodzenia'
                  label="Data urodzenia"
                  readonly
                  :error-messages="errors.data_urodzenia"
                  :clearable="true"
                  clear-icon="mdi-delete-outline"
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="pracownicy.data_urodzenia"
                :max="today"
                label="Data urodzenia"
                prepend-icon="mdi-calendar"
                locale="pl">
              </v-date-picker>
            </v-menu>
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                  v-model="pracownicy.data_zatrudnienia"
                  name='data_zatrudnienia'
                  label="Data zatrudnienia"
                  readonly
                  :error-messages="errors.data_zatrudnienia"
                  :clearable="true"
                  clear-icon="mdi-delete-outline"
                  :rules="[rules.required]"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="pracownicy.data_zatrudnienia"
                :max="today"
                label="Data zatrudnienia"
                prepend-icon="mdi-calendar"
                locale="pl">
              </v-date-picker>
            </v-menu>
            <v-menu
            :clonse-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            ref="menu"
            >
              <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                  v-if="pracownicyId"
                  hint="Niewymagane"
                  v-model="pracownicy.data_zwolnienia"
                  name='data_zwolnienia'
                  label="Data zwolnienia"
                  readonly
                  :error-messages="errors.data_zwolnienia"
                  :clearable="true"
                  clear-icon="mdi-delete-outline"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="pracownicy.data_zwolnienia"
                :max="today"
                label="Data zwolnienia"
                prepend-icon="mdi-calendar"
                locale="pl">
              </v-date-picker>
            </v-menu>
              <v-autocomplete
              label="Stanowisko"
              :item-text="item => item.nazwa"
              item-value="id"
              v-model="pracownicy.id_stanowiska"
              :items="stanowiskoChoices"
              :rules="[rules.required]"
              :error-messages="errors.id_stanowiska"
            ></v-autocomplete>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-2 my-3"
                  color="primary"
                  title="Zapisz"
                  :disabled="!form.valid"
                  @click="createItem(pracownicyId, false)"
                >
                  Zapisz
                </v-btn>
                <v-btn
                  class="mr-2 my-3"
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
        <v-row>
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
</template>

<script>
import router from '@/router';
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
import WynagrodzeniaTable from '@/components/WynagrodzeniaTable'
import Jezyki from '@/components/JezykTable'
export default {
  name: 'Pracownicy',
  components: { WynagrodzeniaTable, Jezyki },
  data() {
    return {
      menu: false,
      menu2: false,
      menu3: false,
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
      router.push({ name: 'Lista pracowników' });
    },
    async createItem(pracownicyId) {
      let success = await this.createPracownicy(pracownicyId);
      if (success) {
          router.push({ name: 'Lista pracowników' }).catch(() => {});
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
      'fetchStanowiskoChoices'
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getPracownicyErrors',
      stanowiskoChoices: 'getStanowiskoChoices'
    }),
    pracownicyId() {
      return this.$route.params.id;
    },
    pracownicy() {
      return new Proxy(this.getPracownicyDetails(), this.pracownicyHandler);
    },
    pracownikName(){
      const pracownik = this.getPracownicyDetails()
      let pracownikShown = pracownik.imie + " " + pracownik.nazwisko
      return this.pracownicyId ? pracownikShown : 'Nowy pracownik';
    },
    today() {
      return moment().format('YYYY-MM-DD');
    },
  },
  created() {
    this.pracownicyHandler = objectHandler(this.setPracownicyDetailsProp);
    this.fetchPracownicyDetails(this.pracownicyId);
    this.fetchStanowiskoChoices({ ordering: 'nazwa' });
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    menu2 (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    menue (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
};
</script>
