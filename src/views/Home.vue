<template>
  <v-row justify="center">
    <v-img
      src="amusement_park.png"
      max-width="1500"
      max-height="1000"

    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import State from '../service/state'
export default {
  name: 'User',
  data() {
    return {
    };
  },
    methods: {
    ...mapGetters([
      'getPermissions'
    ]),
    ...mapActions([
      'updatePermissions',
      'updateLinks'
    ]),
  },
  async created() {
    const permissions = await this.updatePermissions();
    this.updateLinks(permissions)
    State.setPermissions(permissions);
  }
};
</script>


