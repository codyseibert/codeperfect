<template>
  <v-flex xs8>
    <div class="white elevation-2">
      <v-toolbar flat dense class="cyan" dark>
        <v-toolbar-title>Snippits</v-toolbar-title>
      </v-toolbar>

      <v-layout row class="pl-2 pr-2 pb-2">
        <v-flex class="pr-2">
          <Snippit
            class="pt-2"
            :key="snippit.id"
            :snippit="snippit"
            v-for="snippit in oddSnippits" />
        </v-flex>

        <v-flex>
          <Snippit
            class="pt-2"
            :key="snippit.id"
            :snippit="snippit"
            v-for="snippit in evenSnippits" />
        </v-flex>
      </v-layout>
    </div>
  </v-flex>
</template>


<script>
import SnippitService from '../../../../../services/snippits_service'
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
      this.snippits = await SnippitService.index({
        languageId: this.selectedLanguage._id
      });
    }
  },
  components: {
    Snippit
  }
}
</script>


<style scoped>
</style>
