<template>
  <v-footer
    dark
    padless
    app
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-text class="blue darken-1 white--text text-center">
        <h2 class="text-center">
            <strong class="subheading">Strona stworzona przez Michała Cybulskiego i Bartosza Dorobka</strong>
        </h2>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>BDBT - Projekt Park Rozrywki</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>

