<template>
  <v-toolbar
    class="toolbar"
    flat
    text-align:center
    color="#fafafa">
        <v-toolbar-title 
        
        class="mt-4 px-9 my-5 flex text-center"
        >
          <h1>{{ name }}</h1>
          </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'PageToolbar',
  props: {
    name: {
      type: String
    },
    breadcrumbs: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  & > :first-child {
    border-bottom: 1px rgba(0, 0, 0, 0.10) solid;
  }
  
  .breadcrumbs {
    &__item {
      color: rgba(0, 0, 0, 0.38);
      text-decoration: none;
    }
  }
}
</style>
