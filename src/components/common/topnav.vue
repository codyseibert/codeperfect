<template>
  <md-toolbar>
    <md-button class="md-icon-button" @click="menuItemClicked">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title" style="flex: 1">CodePerfect</h2>
  </md-toolbar>
</template>


<script>
  export default {
    methods: {
      menuItemClicked () {
        this.$emit('menuItemClicked')
      }
    }
  }
</script>

<style scoped>

</style>
