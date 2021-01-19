<template>
  <div class="sektor">
    <v-main class="elevation-3 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <h2>{{sektorName}}</h2>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="sektor.nazwa"
              name='nazwa'
              label="Nazwa"
              type="text"
              :rules="[rules.required]"
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
              :rules="[rules.required]"
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
                  :error-messages="errors.data_zalozenia"
                  :clearable="true"
                  clear-icon="mdi-delete-outline"
                  :rules="[rules.required]"
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
              :rules="[rules.required]"
              maxlength="25"
            >
            </v-text-field>  
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-2 my-3"
                  color="primary"
                  title="Zapisz"
                  :disabled="!form.valid"
                  @click="createItem(sektorId, false)"
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
        <v-tabs v-if="!! this.$route.params.id">
            <v-tab>
            Atrakcje
            </v-tab>
            <v-tab-item>
                <sektor-atrakcje-list
                    :sektorId="$route.params.id">
                </sektor-atrakcje-list>
            </v-tab-item>
        </v-tabs>
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
      router.push({ name: 'Lista sektorów' });
    },
    async createItem(sektorId) {
      let success = await this.createSektor(sektorId);
      if (success) {
          router.push({ name: 'Lista sektorów' }).catch(() => {});
      }
    },
    ...mapGetters([
      'getSektorDetails',
      'getSektor'
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
      errors: 'getSektorErrors',
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
    sektorName() {
      return this.sektorId ? this.getSektorDetails().nazwa : 'Nowy sektor';
    },
  },
  created() {
    this.sektorHandler = objectHandler(this.setSektorDetailsProp);
    this.fetchSektorDetails(this.sektorId);
  }
};
</script>
