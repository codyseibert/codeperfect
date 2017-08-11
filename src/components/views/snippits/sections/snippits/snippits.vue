<template>
  <div>
    <h2>{{selectedLanguage.name}} Snippits</h2>
    <md-layout md-gutter="40">
      <md-layout md-column>
        <Snippit
          :key="snippit.id"
          :snippit="snippit"
          v-for="snippit in oddSnippits" />
      </md-layout>

      <md-layout md-column>
        <Snippit
          :key="snippit.id"
          :snippit="snippit"
          v-for="snippit in evenSnippits" />
      </md-layout>
    </md-layout>
  </div>
</template>


<script>
import SnippitService from '../../../../../services/snippit'
import Snippit from './snippit.vue'

export default {
  data () {
    return {
      snippits: []
    }
  },
  watch: {
    async selectedLanguage () {
      this.snippits = await SnippitService.find({
        languageId: this.selectedLanguage.id
      });
    }
  },
  props: {
    selectedLanguage: Object
  },
  computed: {
    evenSnippits () {
      return this.snippits.filter((s, i) => i % 2 === 0)
    },
    oddSnippits () {
      return this.snippits.filter((s, i) => i % 2 === 1)
    }
  },
  components: {
    Snippit
  }
}
</script>



<style scoped>
h2 {
  margin-bottom: 50px;
}
</style>
