<template>
  <v-layout column>
    <v-layout>
      <v-flex xs4 offset-xs4>
        <h4 class="text-xs-center">Snippit Progress</h4>

        <pre v-highlightjs="snippit.code">
          <code class="javascript"></code>
        </pre>
      </v-flex>
    </v-layout>

    <v-layout class="pt-5">
      <v-flex xs4 offset-xs4>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <v-layout class="pt-5">
      <v-flex xs3 class="text-xs-center">
        <InfoSquare
          icon="replay"
          value="5"
          title="Attempts" />
      </v-flex>

      <v-flex xs3 class="text-xs-center">
        <InfoSquare
          icon="timer"
          value="3:21"
          title="Best Time" />
      </v-flex>

      <v-flex xs3 class="text-xs-center">
        <InfoSquare
          icon="keyboard"
          value="430"
          title="Best CPM" />
      </v-flex>

      <v-flex xs3 class="text-xs-center">
        <InfoSquare
          icon="track_changes"
          value="95%"
          title="Best Accuracy" />
      </v-flex>
    </v-layout>

    <v-layout class="pt-5">
      <v-flex xs4 offset-xs4>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <v-layout class="pt-5" column>
      <v-layout>
        <v-flex xs6 class="text-xs-center">
          <div class="inline-block chart-wrapper">
            <h5 class="text-xs-center">CPM</h5>
            <cpm-chart :data="cpmData" :options="options"/>
          </div>
        </v-flex>

        <v-flex xs6 class="text-xs-center">
          <div class="inline-block chart-wrapper">
            <h5 class="text-xs-center">Accuracy</h5>
            <cpm-chart :data="accuracyData" :options="options"/>
          </div>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-layout class="pt-5">
      <v-flex xs4 offset-xs4>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <v-layout class="attempts">
      <v-flex xs8 offset-xs2>
        <h5 class="text-xs-center">Your Attempts</h5>

        <table>
          <tr>
            <th>Attempt</th>
            <th>Time</th>
            <th>Accuracy</th>
            <th>CPM</th>
          </tr>
          <tr v-for="attempt in attempts">
            <td>{{attempt.number}}</td>
            <td>{{attempt.time}}</td>
            <td>{{attempt.accuracy}}</td>
            <td>{{attempt.cpm}}</td>
          </tr>
        </table>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ResultsService from '../../services/results'
import Keyboard from '../../responsive-keyboard'
import CpmChart from './CpmChart'
import SnippitService from '../../services/snippit'
import InfoSquare from './progress/InfoSquare.vue'

export default {
  data () {
    return {
      attempts: [
        {
          id: 1,
          number: 1,
          cpm: 430,
          accuracy: 85,
          time: '3:21'
        },
        {
          id: 2,
          number: 2,
          cpm: 230,
          accuracy: 99,
          time: '3:01'
        }
      ],
      snippit: {},
      options: {
        showTooltips: false,
        responsive: true,
        percentageInnerCutout: 80,
        animationEasing: 'easeOutQuart',
        animateScale: false
      },
      accuracyData: {
        labels: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8'],
        datasets: [{
          label: "CPM vs Attempt",
          data: [
            1,
            2,
            3,
            4,
            5,
            3,
            4,
            5
          ],
          fill: false,
        }]
      },
      cpmData: {
        labels: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8'],
        datasets: [{
          label: "CPM vs Attempt",
          data: [
            1,
            2,
            3,
            4,
            5,
            3,
            4,
            5
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
    CpmChart,
    InfoSquare
  }
}
</script>

<style scoped>

pre {
}

code {
  height: 300px;
  text-align: left;
}

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
  color: #666;
}

.snapshot-title {
  font-size: 16px;
  position: relative;
  top: -10px;
  color: #666;
  left: 0px;
}

.snapshot-wrapper {
  padding-left: 100px;
}

.chart-wrapper {
  padding-left: 100px;
  padding-right: 100px;
}

table {
  width: 100%;
}

td {
  text-align: center;
  padding: 20px;
}

.attempts {
  margin-top: 50px;
}

.attempts h5 {
  margin-bottom: 40px;
}

.hljs {
  background-color: black;
  color: white;
}

pre {
  height: 240px;
  margin: 0px;
}

code {
  font-size: 18px;
  line-height: 24px;
  height: 240px;
}

</style>
