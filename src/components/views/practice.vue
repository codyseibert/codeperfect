<template>
  <v-layout column>
    <v-flex v-if="!typing" class="mb-4 mt-4">
      <h4 class="text-xs-center">Start Typing to Begin</h4>
    </v-flex>

    <v-layout v-if="typing" class="mb-4">
      <v-flex xs8 offset-xs2>
        <v-layout elevation-4 class="white pt-4 pb-4">
          <v-flex xs4 class="text-xs-center">
            <InfoSquare
              icon="timer"
              :value="time"
              title="Elasped Time" />
          </v-flex>

          <v-flex xs4 class="text-xs-center">
            <InfoSquare
              icon="keyboard"
              :value="cpm"
              title="CPM" />
          </v-flex>

          <v-flex xs4 class="text-xs-center">
            <InfoSquare
              icon="track_changes"
              :value="accuracy"
              title="Accuracy" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-flex v-if="!done" xs6 offset-xs3>
      <typing-zone
        ref="typingZone"
        @typed="onTyped"
        @onResults="onResults"
        @update="update"
        :code="code" />
    </v-flex>

    <v-flex v-if="done" xs8 offset-xs2 class="mt-4 mb-4">
      <h4 class="text-xs-center">Error Heat Map</h4>
      <Keyboard :errorMap="errorMap" />
    </v-flex>

    <v-flex v-if="done" xs6 offset-xs3 class="text-xs-center">
      <h5 class="text-xs-center">Incorrect Keys</h5>

      <v-data-table
        :headers="[{
          text: 'Key',
          value: 'key'
        }, {
          text: 'Incorrect',
          value: 'incorrect'
        }]"
        :pagination.sync="pagination"
        :items="errors"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" scope="props">
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.incorrect }}</td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex v-if="done" xs6 offset-xs3 class="text-xs-center mt-5 mb-5">
      <router-link :to="{ name: 'progress', params: { snippitId: snippitId }}">
        <v-btn primary dark>
          <v-icon class="mr-2">show_chart</v-icon> View Progress
        </v-btn>
      </router-link>
    </v-flex>

  </v-layout>
</template>

<script>
import SnippitService from '../../services/snippit'
import ResultsService from '../../services/results'
import TypingZone from './practice/TypingZone.vue'
import InfoSquare from './progress/InfoSquare.vue'
import Keyboard from '../common/Keyboard.vue'

export default {
  data () {
    return {
      code: '',
      typing: false,
      done: false,
      results: null,
      time: '',
      accuracy: '',
      cpm: '',
      errors: [],
      errorMap: {},
      pagination: {
        sortBy: 'incorrect',
        descending: true
      }
    }
  },
  props: {
    snippitId: Number
  },
  components: {
    TypingZone,
    InfoSquare,
    Keyboard
  },
  methods: {
    update (event) {
      this.time = event.time;
      this.accuracy = (event.accuracy || 100) + "%";
      this.cpm = event.cpm;
    },
    onTyped () {
      this.typing = true;
    },
    onResults (results) {
      this.errorMap = results.errorMap;

      for (let [key, incorrect] of Object.entries(results.errorMap)) {
        key = key === " " ? "space" : key
        this.errors.push({
          key: key,
          incorrect: incorrect
        });
      }
      ResultsService.addResult(results);
      results.snippitId = this.snippitId;
      this.$store.dispatch('setResults', results);
      this.$router.push({
        name: 'results'
      });
      this.done = true;
    }
  },
  async mounted () {
    const snippit = await SnippitService.findById(this.snippitId);
    this.code = snippit.code;
    setTimeout(() => {
      this.$refs.typingZone.start();
    });
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
}

.hljs {
  background-color: black;
  color: white;
  font-size: 18px;
  height: 500px;
  overflow: auto;
  position: relative;
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

.white {
  background-color: white;
}
</style>
