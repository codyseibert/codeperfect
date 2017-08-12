<template>
  <md-sidenav class="md-left" ref="sidenav" @close="close">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>

    <md-list>
      <md-list-item @click.native="close">
        <router-link :to="{ name: 'snippits' }">
          <md-icon>code</md-icon> <span>Snippits</span>
        </router-link>
      </md-list-item>

      <md-list-item @click.native="close">
        <router-link :to="{ name: 'about' }">
          <md-icon>info</md-icon> <span>About</span>
        </router-link>
      </md-list-item>
    </md-list>
  </md-sidenav>
</template>


<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      isOpen: Boolean
    },
    mounted () {
      this.refresh();
    },
    watch: {
      isOpen () {
        this.refresh();
      }
    },
    methods: {
      wtf () {
        console.log('wtf');
      },
      refresh () {
        this.$refs.sidenav[this.isOpen ? 'open' : 'close']()
      },
      close () {
        console.log('close')
        this.$emit('update:isOpen', false)
      },
      open () {
        this.$emit('update:isOpen', true)
      }
    }
  }
</script>

<style scoped>

</style>
