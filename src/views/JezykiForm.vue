<template>
  <div class="jezyk">
    <v-main class="elevation-3 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="jezyk.kod_jezyka"
              name='kod'
              label="Kod"
              type="text"
              :error-messages="errors.kod_jezyka"
              maxlength="3"
            >
            </v-text-field>
            <v-text-field
              v-model="jezyk.nazwa"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="25"
            >
            </v-text-field>
              <v-select
              v-model="jezyk.kod_poziomu"
              name='kod poziomu'
              label="Kod poziomu"
              type="text"
              :error-messages="errors.kod_poziomu"
              :items="kod_poziomu"
            >
            </v-select>
            <v-text-field
              v-model="jezyk.opis"
              name="opis"
              label="Opis"
              type="text"
              :error-messages="errors.opis"
              maxlength="250"
            >
            </v-text-field>
            <v-autocomplete
              label="Pracownik"
              :item-text="item => item.imie +  '  ' + item.nazwisko"
              item-value="id"
              v-model="jezyk.id_pracownika"
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
                  @click="createItem(jezykId, false)"
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
  name: 'Jezyki',
  data() {
    return {
      jezykHandler: {},
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
      router.push({ name: 'Lista języków' });
    },
    async createItem(jezykId) {
      let success = await this.createJezyk(jezykId);
      if (success) {
        router.push({ name: 'Lista języków' }).catch(() => {});
      }
    },
    ...mapGetters([
      'getJezykDetails',
    ]),
    ...mapMutations([
      'setJezykDetails',
      'setJezykDetailsProp'
    ]),
    ...mapActions([
      'fetchJezykDetails',
      'createJezyk',
      'fetchPracownicyChoices'
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getJezykErrors',
      pracownicyChoices: 'getPracownicyChoices'
    }),
    jezykId() {
      return this.$route.params.id;
    },
    jezyk() {
      return new Proxy(this.getJezykDetails(), this.jezykHandler);
    },
    jezykName() {
      return this.sektorId ? this.getJezykDetails().nazwa : 'Nowy język';
    }
  },
  created() {
    this.jezykHandler = objectHandler(this.setJezykDetailsProp);
    this.fetchJezykDetails(this.jezykId);
    this.fetchPracownicyChoices({ ordering: 'imie' });
  }
};
</script>
