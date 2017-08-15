<template>
  <v-flex xs4>
    <div class="browser">
      <h4>Languages</h4>

      <div class="buttons full scroll">
        <v-btn flat primary
          v-for="language in languages"
          key="language.id"
          @click="select(language)"
          :class="{
            language: true
            /*'md-accent': selectedLanguage.id === language.id,
            'md-primary': selectedLanguage.id !== language.id*/
          }"
          >
          {{language.name}}
        </v-btn>
      </div>
    </div>
  </v-flex>
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
}

.buttons {
  padding-bottom: 100px;
}
</style>
