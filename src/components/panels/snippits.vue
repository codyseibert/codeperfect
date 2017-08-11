<template>
  <md-layout md-row>
    <md-layout>Left</md-layout>
    <md-layout>Center</md-layout>
    <md-layout>Right</md-layout>
  </md-layout>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript';

export default {
  data () {
    return {
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
  }
}
</script>

<style scoped>
  .CodeMirror {
    font-size: 14px;
  }
</style>
