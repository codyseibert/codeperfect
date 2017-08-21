<template>
  <div class="snippit">
    <v-card>
      <v-card-media>
        <pre v-highlightjs="snippit.code">
          <code class="javascript"></code>
        </pre>
      </v-card-media>

      <v-card-title>
        <h5>{{snippit.title}}</h5>
      </v-card-title>

      <v-card-actions>
        <router-link :to="{ name: 'practice', params: { snippitId: this.snippit._id }}">
          <v-btn dark primary class="cyan">
            <v-icon>keyboard</v-icon> Practice
          </v-btn>
        </router-link>

        <router-link :to="{ name: 'progress', params: { snippitId: this.snippit._id }}">
          <v-btn dark primary class="cyan">
            <v-icon>show_chart</v-icon> Progress
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
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


<style scoped>
.icon {
  margin-right: 10px;
}

code {
  font-size: 18px;
  line-height: 24px;
  height: 240px;
  top: -20px;
  position: relative;
}

pre {
  height: 240px;
  margin: 0px;
}

.hljs {
  background-color: black;
  color: white;
}

.snippit .card {
  background-color: #404040;
}

h5 {
  color: white;
  margin-bottom: 0px;
}

.card__actions {
  padding-top: 0px;
}

</style>
