<template>
  <div>
    <side-nav
      ref="sidenav"
      :is-open.sync="isSideNavOpen" />

    <top-nav
      @menuItemClicked="toggleSideNav" />

    <div class="main-content">
      <router-view></router-view>
    </div>
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

<style>
html,
body {
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped>
.main-content {
  padding: 16px;
  overflow-y: scroll;
  height: 100%;
}
</style>
