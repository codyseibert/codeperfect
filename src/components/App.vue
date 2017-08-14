<template>
  <v-app>
    <v-navigation-drawer
      temporary
      overflow
      v-model="drawer" >
      <v-list class="pt-0" dense>
        <router-link :to="{ name: 'snippits' }">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>code</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Snippits</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed class="indigo" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CodePerfect</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="indigo" style="margin-top: 100px;">
      <div class="text-xs-center" style="width: 100%; color: white;">
        © Cody Seibert 2017
      </div>
    </v-footer>
  </v-app>
<!--
  <md-layout md-column class="full">
    <side-nav
      ref="sidenav"
      :is-open.sync="isSideNavOpen" />

    <top-nav
      @menuItemClicked="toggleSideNav" />

    <router-view></router-view>
  </md-layout> -->
</template>

<script>
import TopNav from './common/topnav.vue'
import SideNav from './common/sidenav.vue'

export default {
  data () {
    return {
      isSideNavOpen: false,
      drawer: false
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
/*html, body{
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  margin: 0px auto;
  overflow: hidden;
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

.overflow-hidden {
  overflow: hidden;
}*/
</style>

<style scoped>
</style>
