<template>
  <div id="panel-typing">
    <h1>Start Typing to Begin</h1>
    <pre v-html="html"></pre>
  </div>
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
      
      window.addEventListener('keyup', (event) => {
        console.log(event);
        if (event.keyCode === 32) {
          event.preventDefault();
        }

        let char = code[i];
        if (char === '\n') {
          char = 'Enter'
        }

        typed++;
        console.log(event.key, char);
        if (event.key === char) {
          correct++;
          i++;
          this.html = setCharacterAsRed(code, i);
          console.log(this.html);
        }

        if (i === code.length) {
          const seconds = Math.floor((new Date() - start) / 1000);
          this.$parent.$emit('practice.done', {
            time: seconds,
            cpm: Math.floor((correct / seconds) * 60),
            accuracy: Math.floor(correct / (typed * 1.0) * 100),
            correct: correct,
            typed: typed,
            total: code.length
          });
        }
      });
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
  font-size: 24px;
}
</style>