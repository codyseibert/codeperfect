<template>
  <md-layout md-gutter="16">
    <md-layout md-column md-flex="33">
      <Browser @selectedLanguageChanged="showSnippitsByLanguage"/>
    </md-layout>
    <md-layout md-column>
      <Snippits :selected-language="selectedLanguage"/>
    </md-layout>
    <!-- <md-layout>
      <Snippit />
    </md-layout> -->
  </md-layout>
</template>

<script>
import Browser from './sections/browser.vue'
import Snippits from './sections/snippits/snippits.vue'
// import Statistics from './sections/statistics.vue'

export default {
  data () {
    return {
      selectedLanguage: {}
    }
  },
  components: {
    Browser,
    Snippits
  },
  methods: {
    showSnippitsByLanguage (language) {
      this.selectedLanguage = language
    }
  }
}
</script>

<style>
body {
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  color: #333;
}
</style>

<style scoped>

</style>
