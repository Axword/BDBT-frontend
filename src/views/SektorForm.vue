<template>
  <div class="sektor">
    <v-main class="elevation-1 mt-4">
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
              maxlength="225"
            >
            </v-text-field>
            <v-autocomplete
              v-model="sektor.status"
              :items="statusy"
              name="status"
              label="Status"
              type="text"
              :error-messages="errors.status"
              :autocomplete="'off'"
            >
            </v-autocomplete>
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
                  v-model="sektor.data_zalozenia"
                  name='data_zalozenia'
                  label="Data założenia"
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
                v-model="sektor.data_zalozenia"
                :max="today"
                label="Data założenia"
                prepend-icon="mdi-calendar"
                locale="pl">
              </v-date-picker>
            </v-menu>
            <v-text-field
              v-model="sektor.opis"
              name="opis"
              label="Opis"
              type="text"
              :error-messages="errors.opis"
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
                  @click="createItem(sektorId, false)"
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
      <v-main class="px-0" >
        <v-row class="elevation-1" v-if="!! this.$route.params.id">
            <v-col>
                <v-tabs>
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
    </v-main>
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { objectHandler } from '@/store/utils';
import SektorAtrakcjeList from '@/components/SektorFormAtrakcjeTable'
import moment from 'moment';
export default {
  name: 'SektorForm',
components: {
    SektorAtrakcjeList
  },
  data() {
    return {
      menu: false,
      date: new Date(),
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
    async createItem(sektorId) {
      let success = await this.createSektor(sektorId);
      if (success) {
          router.push({ name: 'SektorTable' }).catch(() => {});
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
    today() {
      return moment().format('YYYY-MM-DD');
    },
  },
  created() {
    this.sektorHandler = objectHandler(this.setSektorDetailsProp);
    this.fetchSektorDetails(this.sektorId);
  }
};
</script>
