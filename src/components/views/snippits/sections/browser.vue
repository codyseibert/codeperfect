<template>
  <v-flex xs4>
    <div class="white elevation-2">
      <v-toolbar flat dense class="cyan" dark>
        <v-toolbar-title>Languages</v-toolbar-title>
      </v-toolbar>

      <div>
        <v-btn flat primary
          v-for="language in languages"
          key="language._id"
          @click="select(language)"
          class="language"
          >
          {{language.name}}
        </v-btn>
      </div>
    </div>
  </v-flex>
</template>



<script>
import LanguageService from '../../../../services/languages_service'
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
    this.languages = await LanguageService.index()
    if (this.languages.length && Object.keys(this.selectedLanguage).length === 0) {
      this.select(this.languages[0])
    }
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
}

.language {
  font-size: 24px;
  height: 50px;
  width: 100%;
  margin: 0;
}

.buttons {
  padding-bottom: 100px;
}
</style>
