<template>
  <div class="atrakcje">
    <v-main class="elevation-3 mt-4 px-5 py-3">
     <h1>Atrakcje</h1>
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="atrakcje.kod_atrakcjea"
              name='kod'
              label="Kod"
              type="text"
              :error-messages="errors.kod_atrakcjea"
              maxlength="3"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.nazwa"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="25"
            >
            </v-text-field>
              <v-select
              v-model="atrakcje.kod_poziomu"
              name='kod poziomu'
              label="Kod poziomu"
              type="text"
              :error-messages="errors.kod_poziomu"
              :items="kod_poziomu"
            >
            </v-select>
            <v-text-field
              v-model="atrakcje.opis"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.opis"
              maxlength="25"
            >
            </v-text-field>
            <v-autocomplete
              label="Pracownik"
              :item-text="item => item.imie +  '  ' + item.nazwisko"
              item-value="id"
              v-model="atrakcje.id_pracownika"
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
                  @click="createItem(atrakcjeId, false)"
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
export default {
  name: 'AtrakcjeForm',
  data() {
    return {
      atrakcjeHandler: {},
      kod_poziomu: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
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
      router.push({ name: 'AtrakcjeTable' });
    },
    async createItem(atrakcjeId) {
      let success = await this.createAtrakcje(atrakcjeId);
      if (success) {
        router.push({ name: 'AtrakcjeTable' }).catch(() => {});
      }
    },
    ...mapGetters([
      'getAtrakcjeDetails',
    ]),
    ...mapMutations([
      'setAtrakcjeDetails',
      'setAtrakcjeDetailsProp'
    ]),
    ...mapActions([
      'fetchAtrakcjeDetails',
      'createAtrakcje',
      'fetchPracownicyChoices'
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getAtrakcjeErrors',
      pracownicyChoices: 'getPracownicyChoices'
    }),
    atrakcjeId() {
      return this.$route.params.id;
    },
    atrakcje() {
      return new Proxy(this.getAtrakcjeDetails(), this.atrakcjeHandler);
    },
  },
  created() {
    this.atrakcjeHandler = objectHandler(this.setAtrakcjeDetailsProp);
    this.fetchAtrakcjeDetails(this.atrakcjeId);
    this.fetchPracownicyChoices({ ordering: 'imie' });
  }
};
</script>
