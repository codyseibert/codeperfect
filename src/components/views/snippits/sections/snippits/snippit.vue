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
        <v-btn dark primary @click="gotoRoute('practice')">
          <v-icon>keyboard</v-icon> Practice
        </v-btn>

        <v-btn dark primary @click="gotoRoute('progress')">
          <v-icon>show_chart</v-icon> Progress
        </v-btn>
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
  methods: {
    gotoRoute (name) {
      this.$router.push({
        name: name,
        params: {
          snippitId: this.snippit.id
        }
      });
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

<style scoped>
.icon {
  margin-right: 10px;
}
</style>
