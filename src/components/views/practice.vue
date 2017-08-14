<template>
  <v-layout column>
    <v-flex>
      <h4 class="text-xs-center">Start Typing to Begin</h4>
    </v-flex>

    <v-flex xs6 offset-xs3>
      <pre v-highlightjs="html">
        <code id="code" class="javascript"></code>
      </pre>
    </v-flex>

    <v-flex>
      <router-link v-if="done" :to="{ name: 'results', params: { snippitId: snippitId }}">
        <md-button class="md-primary">
          <md-icon>show_chart</md-icon> View Results
        </md-button>
      </router-link>
    </v-flex>
  </v-layout>
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
    const snippit = await SnippitService.findById(this.snippitId);
    this.html = snippit.code;
    setTimeout(() => {
      this.start();
    });
  },
  methods: {
    start () {

      function convertAllTextToSpan() {
        const nodes = $('#code').contents();
        let newHtml = $("<div></div>");
        for (let node of nodes) {
          const html = node.nodeValue || node.innerHTML;
          if (node.nodeValue === null)
            $(node).html('')
          for (let j = 0; j < html.length; j++) {
            let char = html[j];
            if (char === '\n')
              char = '&#8629;\n';
            if (node.nodeValue === null)
              $(node).append(`<span class="character">${char}</span>`);
            else
              newHtml.append(`<span class="character">${char}</span>`);
          }
          if (node.nodeValue === null)
            newHtml.append(node);
        }
        $('#code').html(newHtml.html());
      }

      function setCharacterAsRed(i) {
        const red = $('.character.red');
        red.removeClass('red');
        const characters = $('.character');
        $(characters[i]).addClass('red')
      }

      convertAllTextToSpan();

      const code = this.html;
      const start = new Date();
      let i = 0;
      let typed = 0;
      let correct = 0;

      setCharacterAsRed(i);

      let onKeyPress = (event) => {
        let char = code[i];
        if (char === '\n') {
          char = 'Enter'
        }

        typed++;
        if (event.key === char) {
          correct++;
          i++;
          setCharacterAsRed(i);
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
  margin: 0 auto;
  overflow: scroll;
}

.hljs {
  background-color: #333;
  color: white;
  font-size: 18px;
  height: 400px;
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
</style>
