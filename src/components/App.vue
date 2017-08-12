<template>
  <md-layout md-column class="wrapper">
    <side-nav
      ref="sidenav"
      :is-open.sync="isSideNavOpen" />

    <top-nav
      @menuItemClicked="toggleSideNav" />

    <router-view></router-view>
  </md-layout>
</template>

<script>
import TopNav from './common/topnav.vue'
import SideNav from './common/sidenav.vue'

export default {
  data () {
    return {
      isSideNavOpen: false
    }
  },
  components: {
    TopNav,
    SideNav
  },
  mounted () {
  },
  methods: {
    toggleSideNav () {
      this.isSideNavOpen = !this.isSideNavOpen;
    }
  }
}
</script>

<style>
html, body{
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  margin: 0px auto;
}

.wrapper {
  height: 100%;
  overflow: hidden;
}

.scroll {
  overflow: auto;
}

.full {
  height: 100%;
}
</style>

<style scoped>
</style>
