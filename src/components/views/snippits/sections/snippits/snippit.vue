<template>
  <md-card>
    <md-card-media>
      <codemirror
        v-model="snippit.code"
        :options="editorOptions" />
    </md-card-media>

    <md-card-header>
      <div class="md-title">{{snippit.title}}</div>
    </md-card-header>

    <md-card-actions>
      <md-button class="md-primary" @click="practice"><md-icon>keyboard</md-icon> Practice</md-button>
      <md-button class="md-primary"><md-icon>show_chart</md-icon> Statistics</md-button>
    </md-card-actions>
  </md-card>
</template>


<script>
export default {
  data () {
    return {
      editorOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        lineNumbers: true,
        readOnly: true,
        theme: 'base16-dark'
      }
    }
  },
  props: {
    snippit: Object
  },
  methods: {
    practice () {
      this.$emit('snippitSelected', this.snippit)
    }
  }
}
</script>



<style>
.CodeMirror {
  font-size: 18px;
  line-height: 24px;
  height: 240px;
}
</style>
