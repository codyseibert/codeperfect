<template>
  <md-layout md-column md-gutter="16">
    <div>
      <h1>Start Typing to Begin</h1>

      <div class="code">
        <div class="wrap">
          <pre v-highlightjs="html">
            <code class="javascript"></code>
          </pre>

          <pre class="overlay" v-if="!done" v-html="overlay">
          </pre>
        </div>
      </div>

      <router-link v-if="done" :to="{ name: 'results', params: { snippitId: snippitId }}">
        <md-button class="md-primary">
          <md-icon>show_chart</md-icon> View Results
        </md-button>
      </router-link>
    </div>
  </md-layout>
</template>

<script>
import SnippitService from '../../services/snippit'
import ResultsService from '../../services/results'

export default {
  data () {
    return {
      html: '',
      overlay: '',
      done: false
    }
  },
  props: {
    snippitId: Number
  },
  async mounted () {
    const snippit = await SnippitService.findById(this.snippitId);
    this.html = snippit.code;
    this.overlay = snippit.code;
    this.start();
  },
  methods: {
    start () {
      function setCharacterAsRed(code, i, other) {
        if (i >= code.length) return;
        let char = other[i];
        if (char === '\n') {
          char = '&#8629;\n';
        }
        return code.substring(0, i) +
          `<span class="cursor">${char}</span>` +
          code.substring(i + 1);
      }

      const code = this.overlay;
      const overlay = this.overlay.replace(/[^\s]/g, ' ');
      const start = new Date();
      let i = 0;
      let typed = 0;
      let correct = 0;

      this.overlay = setCharacterAsRed(overlay, i, code);

      let onKeyPress = (event) => {
        let char = code[i];
        if (char === '\n') {
          char = 'Enter'
        }

        typed++;
        if (event.key === char) {
          correct++;
          i++;
          this.overlay = setCharacterAsRed(overlay, i, code);
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
  margin-top: 40px;
}

pre {
  border-radius: 10px;
  max-height: 500px;
  padding: 20px;
  font-size: 14px;
  overflow: hidden;
  margin: 0 auto;
  width: 300px;
  height: 300px;
}

.hljs {
  background-color: #333;
  height: 300px;
  color: white;
}

.overlay {
  position: absolute;
  top: 27px;
  left: 7px;
}

.code {
  position: relative;
}

.wrap {
  width: 300px;
  margin: 0 auto;
  position: relative;
}
</style>
