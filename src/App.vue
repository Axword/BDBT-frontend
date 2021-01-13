<template>
  <v-app>
    <v-snackbar
      top
      v-model="snackbar"
      :color="snackbarColor">{{ snackbarMessage }}
    </v-snackbar>
      <v-main class='lime lighten-5' >
          <Navbar />
        
        <router-view class='mx-8 mb-8'></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar'

import { mapGetters, mapMutations } from 'vuex';


export default {
  name: 'App',
  components: {
    Navbar
  },

  data() {
    return {};
  },
  computed: {
    snackbar: {
      get() {
        return this.isSnackbarOpened;
      },
      set() {
        this.hideMessage();
      }
    },
    ...mapGetters([
      'isSnackbarOpened'
    ]),
    ...mapGetters({
      snackbarMessage: 'getSnackbarMessage',
      snackbarColor: 'getSnackbarColor'
    })
  },
  methods: {
    ...mapMutations([
      'hideMessage'
    ])
  }
};
</script>

<style>
  .v-snack__content {
    white-space: pre-line;
  }
</style>
