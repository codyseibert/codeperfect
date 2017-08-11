<template>
  <div>
    <top-nav
      @menuItemClicked="toggleSideNav" />
    <side-nav
      ref="sidenav"
      :is-open.sync="isSideNavOpen" />

    <md-layout class="main-content">
      <router-view></router-view>
    </md-layout>
  </div>
</template>

<script>
import TopNav from './components/common/topnav.vue'
import SideNav from './components/common/sidenav.vue'

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

<style scoped>
  .main-content {
    padding: 16px;
  }
</style>
