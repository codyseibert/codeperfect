<template>
  <v-layout column>
    <h3>Progress</h3>

    <v-layout>
      <v-flex xs4>
        <pre v-highlightjs="snippit.code">
          <code class="javascript"></code>
        </pre>
      </v-flex>

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
      snippit: null,
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

<style>
h1, h2, h3, h4, h5, h6 {
  text-align: center;
}
</style>
