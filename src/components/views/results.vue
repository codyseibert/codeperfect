<template>
  <v-layout column>
      <v-flex xs12>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Reports</v-toolbar-title>
          </v-toolbar>

          <v-layout row wrap>
          <v-flex md3 sm6 xs12 class="text-xs-center">
            <InfoSquare
              icon="timer"
              :value="results.time + 's'"
              title="Elasped Time" />
          </v-flex>

          <v-flex md3 sm6 xs12 class="text-xs-center">
            <InfoSquare
              icon="keyboard"
              :value="results.cpm"
              title="CPM" />
          </v-flex>

          <v-flex md3 sm6 xs12 class="text-xs-center">
            <InfoSquare
              icon="track_changes"
              :value="results.accuracy"
              title="Accuracy" />
          </v-flex>

          <v-flex md3 sm6 xs12 class="text-xs-center">
            <InfoSquare
              icon="error"
              :value="results.incorrect"
              title="Incorrect" />
          </v-flex>
        </v-layout>
      </div>
    </v-flex>

    <v-layout row wrap class="mt-4">
      <v-flex xs12 md6>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Error Heat Map</v-toolbar-title>
          </v-toolbar>

          <div class="keyboard-wrapper">
            <Keyboard :errorMap="results.errorMap" />
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md6>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Incorrect Keys</v-toolbar-title>
          </v-toolbar>

          <div class="keyboard-wrapper">
            <v-data-table
              :headers="[{
                text: 'Key',
                value: 'key'
              }, {
                text: 'Incorrect',
                value: 'incorrect'
              }, {
                text: 'Percent Err',
                value: 'percent'
              }]"
              :pagination.sync="pagination"
              :items="errors"
              hide-actions
              dark
              class="elevation-1"
            >
              <template slot="items" scope="props">
                <td class="text-xs-right">{{ props.item.key }}</td>
                <td class="text-xs-right">{{ props.item.incorrect }}</td>
                <td class="text-xs-right">{{ props.item.percent }}</td>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-flex>
    </v-layout>

    <v-flex v-if="$store.state.token" xs6 offset-xs3 class="text-xs-center mt-3">
      <router-link :to="{ name: 'progress', params: { snippitId: this.results.snippitId }}">
        <v-btn primary dark class="cyan">
          <v-icon class="mr-2">show_chart</v-icon> View Progress
        </v-btn>
      </router-link>
    </v-flex>

  </v-layout>
</template>

<script>
import InfoSquare from './progress/InfoSquare.vue'
import Keyboard from '../common/Keyboard.vue'

import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      errors: [],
      pagination: {
        sortBy: 'incorrect',
        descending: true
      }
    }
  },
  computed: mapState([
    'results'
  ]),
  components: {
    InfoSquare,
    Keyboard
  },
  mounted () {
    if (_.isEmpty(this.results)) {
      this.$router.push({
        name: 'snippits'
      });
      return;
    }
    let total = 0;
    for (let [key, incorrect] of Object.entries(this.results.errorMap))
      total += incorrect;

    for (let [key, incorrect] of Object.entries(this.results.errorMap)) {
      key = key === " " ? "space" : key
      this.errors.push({
        key: key,
        incorrect: incorrect,
        percent: parseInt(incorrect / total * 100) + "%"
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

.red {
  color: red;
  background-color: yellow;
}

.white {
  background-color: white;
}

.red {
  background-color: #e57373;
}

.blue {
  background-color: #64b5f6;
}

.green {
  background-color: #81c884;
}

.yellow {
  background-color: #ffd54f;
}

.keyboard-wrapper {
  padding: 20px;
}
</style>
