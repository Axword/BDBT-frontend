<template>
  <v-app>
    <v-snackbar
      top
      v-model="snackbar"
      :color="snackbarColor">{{ snackbarMessage }}
    </v-snackbar>
      <v-main>
          <Navbar 
          v-if="isAuth()"/>
          <toolbar
          :name="currentRouteName"
          v-if="isAuth()"
        ></toolbar>
        <router-view class='mx-8 mb-8'></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { mapGetters, mapMutations } from 'vuex';
import Toolbar from '@/components/Toolbar';
import State from '@/service/state';
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Toolbar
  },

  data() {
    Toolbar
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
    currentRouteName() {
        return this.$route.name;
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
    ]),
    isAuth() {
      return State.isAuth();
    },
  }
};
</script>

<style>
  .v-snack__content {
    white-space: pre-line;
  }
  h2 {
    font-size: 200%;
    font-weight: 450;
  }
  h1 {
    font-weight: 500;
  }
</style>
