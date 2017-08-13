<template>
  <v-layout row>
    <Browser @onSelectedLanguageChanged="showSnippitsByLanguage"/>
    <Snippits :selected-language="selectedLanguage"/>
  </v-layout>
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
      this.selectedLanguage = language;
    }
  }
}
</script>

<style>
</style>

<style scoped>
.content {
  padding-top: 20px;
}
</style>
