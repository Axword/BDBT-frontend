<template>
   <v-main class="elevation-0 mt-4 px-5 py-3">
      <v-row justify-center>
        <v-col>
          <h2>Strona główna</h2>
        </v-col>
      </v-row>
    </v-main> 
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


