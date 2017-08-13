<template>
  <div class="snippit">
    <md-card>
      <md-card-media>
        <pre v-highlightjs="snippit.code">
          <code class="javascript"></code>
        </pre>
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

        <router-link :to="{ name: 'progress', params: { snippitId: snippit.id }}">
          <md-button class="md-primary">
            <md-icon>show_chart</md-icon> Progress
          </md-button>
        </router-link>
      </md-card-actions>
    </md-card>
  </div>
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
pre {
  height: 240px;
  margin: 0px;
}

code {
  font-size: 18px;
  line-height: 24px;
  height: 240px;
  top: -20px;
  position: relative;
}

.hljs {
  background-color: black;
  color: white;
}

.md-card {
  margin-bottom: 40px;
}

.snippit {
  padding: 10px;
}
</style>
