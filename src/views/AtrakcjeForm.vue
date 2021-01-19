<template>
  <div class="atrakcje">
    <v-main class="elevation-3 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <h2>{{ atrakcjeName }}</h2>
          <v-form v-model="form.valid">
            <v-text-field
              v-model="atrakcje.nazwa"
              name="nazwa"
              label="Nazwa"
              type="text"
              :rules="[rules.required]"
              :error-messages="errors.nazwa"
              maxlength="30"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.producent"
              name="producent"
              label="Producent"
              type="text"
              :rules="[rules.required]"
              :error-messages="errors.producent"
              maxlength="30"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.typ_atrakcji"
              name="typ_atrakcji"
              label="Typ atrakcji"
              type="text"
              :rules="[rules.required]"
              :error-messages="errors.typ_atrakcji"
              maxlength="30"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.opis"
              name="opis"
              label="Opis"
              type="text"
              :error-messages="errors.opis"
              :rules="[rules.required]"
              maxlength="400"
            >
            </v-text-field>
              <v-text-field
              v-model="atrakcje.wymagania_wiekowe"
              name="wymagania_wiekowe"
              label="Minimalny wiek do skorzystania"
              type="integer"
              :error-messages="errors.wymagania_wiekowe"
              :rules="[rules.required]"
              maxlength="2"
            >
            </v-text-field>
              <v-select
              :rules="[rules.required]"
              v-model="atrakcje.status"
              name='Status'
              label="Status"
              type="text"
              :error-messages="errors.status"
              :items="status"
            >
            </v-select>
            <v-text-field
              v-model="atrakcje.wysokosc"
              hint="Niewymagane"
              name="wysokosc"
              label="Wysokość (w metrach)"
              type="integer"
              :error-messages="errors.wysokosc"
              maxlength="5"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.predkosc"
              hint="Niewymagane"
              name="predkosc"
              label="Prędkość (w km/h)"
              type="integer"
              :error-messages="errors.predkosc"
              maxlength="3"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.przeciazenie"
              hint="Niewymagane"
              name="przeciazenie"
              label="Przeciążenie (w przyśpieszeniu ziemskim G)"
              type="integer"
              :error-messages="errors.przeciazenie"
              maxlength="4"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.przepustowosc"
              hint="Niewymagane"
              name="przepustowosc"
              label="Liczba miejsc"
              type="text"
              :error-messages="errors.przepustowosc"
              maxlength="4"
            >
            </v-text-field>
            <v-text-field
              v-model="atrakcje.dlugosc_trasy"
              hint="Niewymagane"
              name="dlugosc_trasy"
              label="Długość trasy (w metrach)"
              type="text"
              :error-messages="errors.dlugosc_trasy"
              maxlength="4"
            >
            </v-text-field>
            
            <v-autocomplete
              label="Sektor"
              :item-text="item => item.nazwa"
              item-value="id"
              v-model="atrakcje.id_sektora"
              :items="sektorChoices"
              :rules="[rules.required]"
              :error-messages="errors.id_sektora"
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
      status: ['Zamknięta', 'Otwarta'],
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
      router.push({ name: 'Lista atrakcji' });
    },
    async createItem(atrakcjeId) {
      let success = await this.createAtrakcje(atrakcjeId);
      if (success) {
        router.push({ name: 'Lista atrakcji' }).catch(() => {});
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
      'fetchSektorChoices'
    ]),
  },
  computed: {
    ...mapGetters({
      errors: 'getAtrakcjeErrors',
      sektorChoices: 'getSektorChoices'
    }),
    atrakcjeId() {
      return this.$route.params.id;
    },
    atrakcje() {
      return new Proxy(this.getAtrakcjeDetails(), this.atrakcjeHandler);
    },
    atrakcjeName() {
      return this.atrakcjeId ? this.getAtrakcjeDetails().nazwa : 'Nowa atrakcja';
    },
  },
  created() {
    this.atrakcjeHandler = objectHandler(this.setAtrakcjeDetailsProp);
    this.fetchAtrakcjeDetails(this.atrakcjeId);
    this.fetchSektorChoices({ ordering: 'nazwa' });
  }
};
</script>
