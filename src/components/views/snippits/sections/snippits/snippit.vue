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
      <router-link :to="{ name: 'practice', params: { snippitId: snippit.id }}">
        <md-button class="md-primary">
          <md-icon>keyboard</md-icon> Practice
        </md-button>
      </router-link>

      <router-link :to="{ name: 'results', params: { snippitId: snippit.id }}">
        <md-button class="md-primary">
          <md-icon>show_chart</md-icon> Progress
        </md-button>
      </router-link>
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
  }
}
</script>



<style>
.CodeMirror {
  font-size: 18px;
  line-height: 24px;
  height: 240px;
}

.md-card {
  margin-bottom: 40px;
}
</style>
