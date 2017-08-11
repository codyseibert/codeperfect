<template>
  <md-layout md-column>
    <h2>Select a Language</h2>
    <md-button
      v-for="language in languages"
      key="language.id"
      @click="select(language)"
      class="language md-primary"
      >
      {{language.name}}
    </md-button>
  </md-layout>
</template>



<script>
import LanguageService from '../../../../services/language'

export default {
  data () {
    return {
      languages: null
    }
  },
  async mounted () {
    this.languages = await LanguageService.getAll()
    if (this.languages.length)
      this.select(this.languages[0])
  },
  methods: {
    select (language) {
      this.$emit('selectedLanguageChanged', language)
    }
  }
}
</script>



<style scoped>
h1, h2, h3, h4, h5, h6 {
  text-align: center;
}

.language {
  font-size: 24px;
  height: 50px;
}
</style>
