<template>
  <v-app>
    <v-container class="elevation-1 mt-4">
     <h2>Widok sektoru</h2>
      <v-row justify-center>
        <v-col>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="sektor.nazwa"
              name='nazwa'
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="3"
            >
            </v-text-field>
            <v-autocomplete
              v-model="sektor.status"
              :items="statusy"
              name="status"
              label="Nazwa"
              type="text"
              :error-messages="errors.status"
              :autocomplete="'off'"
            >
            </v-autocomplete>
            <v-text-field
              v-model="sektor.data_zalozenia"
              name="nazwa"
              label="Nazwa"
              type="text"
              :error-messages="errors.nazwa"
              maxlength="25"
            >
            <v-text-field
              v-model="sektor.nazwa"
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
                  @click="createSektor(sektorId, false)"
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
                    Atrakcje
                    </v-tab>
                    <v-tab-item>
                        <sektor-atrakcje-list
                            :sektorId="$route.params.id">
                        </sektor-atrakcje-list>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
import SektorAtrakcjeList from '@/components/SektorFormAtrakcjeTable'
export default {
  name: 'SektorForm',
components: {
    SektorAtrakcjeList
  },
  data() {
    return {
      statusy: ['Otwarty', 'Zamknięty'],
      sektorHandler: {},
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
      router.push({ name: 'SektorTable' });
    },
    async createSektor(redirect=false) {
      let success = await this.createSektor();
      if (success) {
        if (redirect) {
          router.push({ name: 'SektorList' }).catch(() => {});
        } else {
          router.push({ name: 'SektorForm', params: { id: this.sektor.id } }).catch(() => {});
        }
      }
    },
    ...mapGetters([
      'getSektorDetails',
    ]),
    ...mapMutations([
      'setSektorDetails',
      'setSektorDetailsProp'
    ]),
    ...mapActions([
      'fetchSektorDetails',
      'createSektor',
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getSektorErrors'
    }),
    sektorId() {
      return this.$route.params.id;
    },
    sektor() {
      return new Proxy(this.getSektorDetails(), this.sektorHandler);
    },
  },
  created() {
    this.sektorHandler = objectHandler(this.setSektorDetailsProp);
    this.fetchSektorDetails(this.sektorId);
  }
};
</script>
