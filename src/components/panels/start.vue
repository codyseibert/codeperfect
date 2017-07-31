<template>
  <div id="panel-start">
    <h1>Upload a Code Snippit and Click Practice</h1>
    <codemirror v-model="code" :options="editorOptions"></codemirror>
    <button v-on:click="startPractice">PRACTICE</button>
  </div>
  
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript';

export default {
  data () {
    return {
      code: 'const a = 10',
      editorOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        lineNumbers: true
      }
    }
  },
  components: {
    codemirror
  },
  methods: {
    startPractice () {
      $('button').blur();
      this.$parent.$emit('practice.start', {
        code: this.code
      });  
    }
  }
}
</script>

<style>
.CodeMirror {
  font-size: 20px;
}
</style>

<style scoped>
h1 {
  text-align: center;
}

button {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 70px;
  margin-top:6px;
  border: none;
  background-color: #dcedc1;
  cursor: pointer;
  font-size: 40px;
  font-family: 'VT323', monospace;
  border-radius: 5px;
}

button:hover {
  background-color: #a8e6cf;
}
</style>