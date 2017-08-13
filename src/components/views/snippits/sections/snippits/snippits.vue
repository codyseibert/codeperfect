<template>
  <v-flex xs8>
    <h4>Snippits</h4>
    <v-layout row>
      <v-flex>
        <Snippit
          :key="snippit.id"
          :snippit="snippit"
          v-for="snippit in oddSnippits" />
      </v-flex>

      <v-flex>
        <Snippit
          :key="snippit.id"
          :snippit="snippit"
          v-for="snippit in evenSnippits" />
      </v-flex>
    </v-layout>
  </v-flex>
</template>


<script>
import SnippitService from '../../../../../services/snippit'
import Snippit from './snippit.vue'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      snippits: []
    }
  },
  watch: {
    selectedLanguage () {
      this.loadSnippits();
    }
  },
  mounted () {
    this.loadSnippits();
  },
  computed: {
    ...mapState([
      'selectedLanguage'
    ]),
    evenSnippits () {
      return this.snippits.filter((s, i) => i % 2 === 0)
    },
    oddSnippits () {
      return this.snippits.filter((s, i) => i % 2 === 1)
    }
  },
  methods: {
    async loadSnippits () {
      this.snippits = await SnippitService.find({
        languageId: this.selectedLanguage.id
      });
    }
  },
  components: {
    Snippit
  }
}
</script>



<style scoped>
h1, h2 {
  margin-bottom: 20px;
}

.snippits {
  padding-bottom: 100px;
}

.snippits-content {
  padding-right: 40px;
}
</style>
