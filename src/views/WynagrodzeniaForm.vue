<template>
 <div>
  <v-app>
    <v-main class="elevation-1 mt-4">
    <h1>Wynagrodzenia</h1>
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="wynagrodzenia.kod_wynagrodzeniaa"
              name='kod'
              label="Kod"
              type="text"
              :error-messages="errors.kod_wynagrodzeniaa"
              maxlength="3"
            >
            </v-text-field>
            <v-text-field
              v-model="wynagrodzenia.nazwa"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="25"
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
  </v-app>
 </div>
</template>
<script>
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
export default {
  name: 'WynagrodzeniaForm',
  data() {
    return {
      wynagrodzeniaHandler: {},
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
      router.push({ name: 'SecretaryTable' });
    },
    async createItem(wynagrodzeniaId) {
      let success = await this.createWynagrodzenia(wynagrodzeniaId);
      if (success) {
          router.push({ name: 'WynagrodzeniaList' }).catch(() => {});
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
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getWynagrodzeniaErrors'
    }),
    wynagrodzeniaId() {
      return this.$route.params.id;
    },
    wynagrodzenia() {
      return new Proxy(this.getWynagrodzeniaDetails(), this.wynagrodzeniaHandler);
    },
  },
  created() {
    this.wynagrodzeniaHandler = objectHandler(this.setWynagrodzeniaDetailsProp);
    this.fetchWynagrodzeniaDetails(this.wynagrodzeniaId);
  }
};
</script>
