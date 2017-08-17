<template>
  <v-layout column>
    <v-flex v-if="!typing" class="mb-4 mt-4">
      <h4 class="text-xs-center">Start Typing to Begin</h4>
    </v-flex>

    <v-flex xs6 offset-xs3>
      <typing-zone
        ref="typingZone"
        @typed="onTyped"
        @onResults="onResults"
        :code="code" />
    </v-flex>
  </v-layout>
</template>

<script>
import SnippitsService from '../../services/snippits_service'
import ReportsService from '../../services/reports_service'
import TypingZone from './practice/TypingZone.vue'

export default {
  data () {
    return {
      code: '',
      typing: false
    }
  },
  props: {
    snippitId: String
  },
  components: {
    TypingZone
  },
  methods: {
    onTyped () {
      this.typing = true;
    },
    async onResults (results) {
      results.snippitId = this.snippitId;

      if (this.$store.state.token) {
        await ReportsService.post(results);
      }
      this.$store.dispatch('setResults', results);
      this.$router.push({
        name: 'results'
      });
    }
  },
  async mounted () {
    const snippit = await SnippitsService.show(this.snippitId);
    this.code = snippit.code;
    setTimeout(() => {
      this.$refs.typingZone.start();
    });
  }
}
</script>

<style>
.cursor {
  color: red;
  background-color: yellow;
}
</style>

<style scoped>

</style>
