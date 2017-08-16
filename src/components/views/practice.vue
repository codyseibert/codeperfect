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
import SnippitService from '../../services/snippit'
import ResultsService from '../../services/results'
import TypingZone from './practice/TypingZone.vue'

export default {
  data () {
    return {
      code: '',
      typing: false
    }
  },
  props: {
    snippitId: Number
  },
  components: {
    TypingZone
  },
  methods: {
    onTyped () {
      this.typing = true;
    },
    onResults (results) {
      results.snippitId = this.snippitId;
      ResultsService.addResult(results);
      this.$store.dispatch('setResults', results);
      this.$router.push({
        name: 'results'
      });
    }
  },
  async mounted () {
    const snippit = await SnippitService.findById(this.snippitId);
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
/*h1 {
  text-align: center;
  margin-top: 40px;
}

pre {
  margin: 0 auto;
}

.hljs {
  background-color: black;
  color: white;
  font-size: 18px;
  height: 500px;
  overflow: auto;
  position: relative;
}

.overlay {
  position: relative;
  top: -270px;
  left: 18px;
  font-size: 18px;
}

.code {
  position: relative;
}

.wrap {
  width: 300px;
  margin: 0 auto;
  position: relative;
}

.red {
  color: red;
  background-color: yellow;
}

.white {
  background-color: white;
}*/
</style>
