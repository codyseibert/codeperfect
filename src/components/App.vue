<template>
  <v-app>
    <v-navigation-drawer
      temporary
      overflow
      v-model="drawer" >
      <div class="logo cyan">
        CodePerfect
        <br>
        <v-icon>keyboard</v-icon>
      </div>
      <v-list class="pt-0" dense>
        <v-list-tile @click="gotoRoute('snippits')">
          <v-list-tile-action>
            <v-icon>code</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Snippits</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

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

    <v-toolbar fixed class="cyan" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CodePerfect</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link v-if="!$store.state.token" :to="{name: 'login'}">
          <v-btn flat>
            <v-icon>login</v-icon> Login
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="cyan">
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
    gotoRoute (name) {
      this.$router.push({
        name: name
      });
    },
    toggleSideNav () {
      this.isSideNavOpen = !this.isSideNavOpen;
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>

<style scoped>
.container {
  /*background-color: #e9effb;*/
}

.logo {
  height: 200px;
  text-align: center;
  color: white;
  font-size: 40px;
  padding-top: 20px;
}

.logo .icon {
  position: relative;
  top: -20px;
  font-size: 130px;
  color: white;
}
</style>
