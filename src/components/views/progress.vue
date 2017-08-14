<template>
  <v-layout column>
    <v-layout>
      <v-flex xs3>
        <h4>Snippit Progress</h4>

        <pre v-highlightjs="snippit.code">
          <code class="javascript"></code>
        </pre>
      </v-flex>

      <v-flex xs9 class="snapshots">
        <v-layout class="snapshot-wrapper">
          <v-flex xs3>
            <div class="numeric">
              <v-icon>replay</v-icon>
              5
            </div>
            <div class="snapshot-title">
              Attempts
            </div>
          </v-flex>

          <v-flex xs3>
            <div class="numeric">
              <v-icon>timer</v-icon>
              3:21
            </div>
            <div class="snapshot-title">
              Best Time
            </div>
          </v-flex>

          <v-flex xs3>
            <div class="numeric">
              <v-icon>keyboard</v-icon>
              430
            </div>
            <div class="snapshot-title">
              Best CPM
            </div>
          </v-flex>

          <v-flex xs3>
            <div class="numeric">
              <v-icon>track_changes</v-icon>
              95%
            </div>
            <div class="snapshot-title">
              Best Accuracy
            </div>
          </v-flex>
        </v-layout>

        <v-layout class="pt-4">
          <v-flex xs8 offset-xs2>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- <v-flex xs4 offset-xs4>
      <v-card>
        <v-toolbar class="blue lighten-4">
          <v-toolbar-title>Snippit</v-toolbar-title>
        </v-toolbar>

        <v-card-media class="text-center">
          <pre v-highlightjs="snippit.code">
            <code class="javascript"></code>
          </pre>
        </v-card-media>
      </v-card>
    </v-flex> -->

    <!-- <v-layout>
      <v-flex>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Your Best CPM</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <h1>450</h1>
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Your Best Accuracy</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <h1>95%</h1>
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Your Best Time</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <h1>3:24</h1>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout> -->

    <v-layout>
      <v-flex xs4>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Cpm</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <cpm-chart :data="cpmData" :options="options"/>
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Accuracy</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <cpm-chart :data="accuracyData" :options="options"/>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs8 offset-xs2>
        <h4>Your Attempts</h4>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>#3</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>#2</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>#1</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ResultsService from '../../services/results'
import Keyboard from '../../responsive-keyboard'
import CpmChart from './CpmChart'
import SnippitService from '../../services/snippit'

export default {
  data () {
    return {
      snippit: {},
      options: {
        showTooltips: false,
        responsive: false,
        percentageInnerCutout: 80,
        animationEasing: 'easeOutQuart',
        animateScale: false
      },
      accuracyData: {
        labels: ['a', 'b', 'c', 'd'],
        datasets: [{
          label: "CPM vs Attempt",
          data: [
            1,
            2,
            3,
            4
          ],
          fill: false,
        }]
      },
      cpmData: {
        labels: ['a', 'b', 'c', 'd'],
        datasets: [{
          label: "CPM vs Attempt",
          data: [
            1,
            2,
            3,
            4
          ],
          fill: false,
        }]
      }
    }
  },
  async mounted () {
    this.snippit = await SnippitService.findById(this.snippitId);
  },
  props: [
    'snippitId'
  ],
  methods: {
  },
  components: {
    CpmChart
  }
}
</script>

<style scoped>
.snapshots {
  padding-top: 40px;
  color: #666;
}

.material-icons {
  font-size: 30px;
  position: relative;
  top: -2px;
}

.numeric {
  font-size: 30px;
}

.snapshot-title {
  font-size: 16px;
  position: relative;
  top: -10px;
  left: 0px;
}

.snapshot-wrapper {
  padding-left: 100px;
}
</style>
