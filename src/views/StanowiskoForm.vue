<template>
  <div class="stanowisko">
    <v-main class="elevation-3 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="stanowisko.nazwa"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="100"
            >
            </v-text-field>
            <v-text-field
              v-model="stanowisko.opis"
              name='opis'
              label="Opis"
              type="text"
              :error-messages="errors.opis"
              maxlength="400"
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-2 my-1"
                  color="primary"
                  title="Zapisz"
                  :disabled="!form.valid"
                  @click="createItem(stanowiskoId, false)"
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
  name: 'StanowiskoForm',
  data() {
    return {
      stanowiskoHandler: {},
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
      router.push({ name: 'Lista Stanowisk' });
    },
    async createItem(stanowiskoId) {
      let success = await this.createStanowisko(stanowiskoId);
      if (success) {
        router.push({ name: 'Lista Stanowisk' }).catch(() => {});
      }
    },
    ...mapGetters([
      'getStanowiskoDetails',
    ]),
    ...mapMutations([
      'setStanowiskoDetails',
      'setStanowiskoDetailsProp'
    ]),
    ...mapActions([
      'fetchStanowiskoDetails',
      'createStanowisko',
      'fetchPracownicyChoices'
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getStanowiskoErrors',
      pracownicyChoices: 'getPracownicyChoices'
    }),
    stanowiskoId() {
      return this.$route.params.id;
    },
    stanowisko() {
      return new Proxy(this.getStanowiskoDetails(), this.stanowiskoHandler);
    },
  },
  created() {
    this.stanowiskoHandler = objectHandler(this.setStanowiskoDetailsProp);
    this.fetchStanowiskoDetails(this.stanowiskoId);
    this.fetchPracownicyChoices({ ordering: 'imie' });
  }
};
</script>
