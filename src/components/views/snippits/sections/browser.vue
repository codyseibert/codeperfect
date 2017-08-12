<template>
  <div class="full">
    <h1>Languages</h1>

    <div class="full scroll buttons">
      <md-button
        v-for="language in languages"
        key="language.id"
        @click="select(language)"
        :class="{
          language: true,
          'md-accent': selectedLanguage.id === language.id,
          'md-primary': selectedLanguage.id !== language.id
        }"
        >
        {{language.name}}
      </md-button>
    </div>
  </div>
</template>



<script>
import LanguageService from '../../../../services/language'
import {mapState} from 'vuex';

export default {
  data () {
    return {
      languages: null
    }
  },
  computed: {
    ...mapState([
      'selectedLanguage'
    ])
  },
  async mounted () {
    this.languages = await LanguageService.getAll()
    if (this.languages.length && !this.selectedLanguage)
      this.select(this.languages[0])
  },
  methods: {
    select (language) {
      this.$store.dispatch('setSelectedLanguage', language);
    }
  }
}
</script>



<style scoped>
h1, h2, h3, h4, h5, h6 {
  text-align: center;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
}

.language {
  font-size: 24px;
  height: 50px;
  width: 100%;
}

.buttons {
  padding-bottom: 100px;
}
</style>
