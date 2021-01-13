<template>
  <v-app>
    <v-container class="elevation-1 mt-4">
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
    </v-container>
  </v-app>
</template>

<script>
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
export default {
  name: 'JezykiForm',
  data() {
    return {
      jezykHandler: {},
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
      router.push({ name: 'JezykiList' });
    },
    async createItem(redirect=false) {
      let success = await this.createJezyk();
      console.log(success)
      if (success) {
        if (redirect) {
          router.push({ name: 'JezykiList' }).catch(() => {});
        } else {
          console.log("ELO")
          router.push({ name: 'JezykiForm', params: { id: this.jezyk.id } }).catch(() => {});
        }
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
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getJezykErrors'
    }),
    jezykId() {
      return this.$route.params.id;
    },
    jezyk() {
      return new Proxy(this.getJezykDetails(), this.jezykHandler);
    },
  },
  created() {
    this.jezykHandler = objectHandler(this.setJezykDetailsProp);
    this.fetchJezykDetails(this.jezykId);
  }
};
</script>
