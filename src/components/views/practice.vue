<template>
  <md-layout md-column md-gutter="16">
    <h1>Start Typing to Begin</h1>
    <pre v-if="!done" v-html="html"></pre>
    <router-link v-if="done" :to="{ name: 'results', params: { snippitId: snippitId }}">
      <md-button class="md-primary">
        <md-icon>show_chart</md-icon> View Results
      </md-button>
    </router-link>
  </md-layout>
</template>

<script>
import SnippitService from '../../services/snippit'
import ResultsService from '../../services/results'

export default {
  data () {
    return {
      html: '',
      done: false
    }
  },
  props: {
    snippitId: Number
  },
  async mounted () {
    const snippit = await SnippitService.findById(this.snippitId)
    this.html = snippit.code
    this.start();
  },
  methods: {
    start () {
      function setCharacterAsRed(code, i) {
        if (i >= code.length) return;
        let char = code[i];
        if (char === '\n') {
          char = '&#8629;\n';
        }
        return code.substring(0, i) +
          `<span class="cursor">${char}</span>` +
          code.substring(i + 1);
      }

      const code = this.html;
      const start = new Date();
      let i = 0;
      let typed = 0;
      let correct = 0;

      this.html = setCharacterAsRed(code, i);

      let onKeyPress = (event) => {
        let char = code[i];
        if (char === '\n') {
          char = 'Enter'
        }

        typed++;
        if (event.key === char) {
          correct++;
          i++;
          this.html = setCharacterAsRed(code, i);
        }

        if (i === code.length) {
          this.done = true
          const seconds = Math.floor((new Date() - start) / 1000);
          window.removeEventListener('keypress', onKeyPress);
          ResultsService.addResult({
            snippitId: this.snippitId,
            time: seconds,
            cpm: Math.floor((correct / seconds) * 60),
            accuracy: Math.floor(correct / (typed * 1.0) * 100),
            correct: correct,
            typed: typed,
            total: code.length
          });
        }

        if (event.keyCode === 32) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }

      window.addEventListener('keypress', onKeyPress);
    }
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

h1 {
  text-align: center;
}

pre {
  background-color: white;
  border-radius: 10px;
  height: 500px;
  padding: 20px;
  font-size: 14px;
  overflow: hidden;
}
</style>
