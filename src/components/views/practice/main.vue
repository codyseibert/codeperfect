<template>
  <md-layout md-gutter="16">
    <h1>Start Typing to Begin</h1>
    <pre v-html="html"></pre>
  </md-layout>
</template>

<script>
export default {
  data () {
    return {
      html: ''
    }
  },
  props: [
    'code'
  ],
  watch: {
    code () {
      if (this.code === '') {
        return;
      }

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

      const code = this.code;
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
          const seconds = Math.floor((new Date() - start) / 1000);
          window.removeEventListener('keypress', onKeyPress);
          this.$parent.$emit('practice.done', {
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



<style scoped>
.cursor {
  color: red;
  background-color: yellow;
}

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
