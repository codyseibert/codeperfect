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

    <v-layout row wrap>
      <v-flex elevation-2 md3 sm6 xs12 class="text-xs-center red white-text">
        <InfoSquare
          icon="timer"
          :value="time + 's'"
          title="Best Time" />
      </v-flex>

      <v-flex elevation-2 md3 sm6 xs12 class="text-xs-center blue white-text">
        <InfoSquare
          icon="keyboard"
          :value="cpm"
          title="Best CPM" />
      </v-flex>

      <v-flex elevation-2 md3 sm6 xs12 class="text-xs-center yellow white-text">
        <InfoSquare
          icon="track_changes"
          :value="accuracy"
          title="Best Accuracy" />
      </v-flex>

      <v-flex elevation-2 md3 sm6 xs12 class="text-xs-center green white-text">
        <InfoSquare
          icon="error"
          :value="incorrect"
          title="Best Incorrect" />
      </v-flex>
    </v-layout>

    <v-layout class="pt-5">
      <v-flex xs4 offset-xs4>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <v-layout class="pt-5" column>
      <v-layout>
        <v-flex xs4 class="text-xs-center">
          <div class="inline-block chart-wrapper">
            <h5 class="text-xs-center">Elapsed Time</h5>
            <cpm-chart ref="timeChart" :data="timeData" :options="options"/>
          </div>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <div class="inline-block chart-wrapper">
            <h5 class="text-xs-center">CPM</h5>
            <cpm-chart ref="cpmChart" :data="cpmData" :options="options"/>
          </div>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <div class="inline-block chart-wrapper">
            <h5 class="text-xs-center">Accuracy</h5>
            <cpm-chart ref="accuracyChart" :data="accuracyData" :options="options"/>
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
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Reports</v-toolbar-title>
          </v-toolbar>

          <v-data-table
            :headers="[{
              text: 'Time',
              value: 'time'
            }, {
              text: 'CPM',
              value: 'cpm'
            }, {
              text: 'Accuracy',
              value: 'accuracy'
            }, {
              text: 'Incorrect',
              value: 'incorrect'
            }]"
            :pagination.sync="pagination"
            :items="reports"
            hide-actions
            dark
          >
            <template slot="items" scope="props">
              <td class="text-xs-right">{{ props.item.time }}</td>
              <td class="text-xs-right">{{ props.item.cpm }}</td>
              <td class="text-xs-right">{{ props.item.accuracy }}</td>
              <td class="text-xs-right">{{ props.item.incorrect }}</td>
            </template>
          </v-data-table>
        </div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ReportsService from '../../services/reports_service'
import SnippitService from '../../services/snippits_service'
import CpmChart from './CpmChart'
import InfoSquare from './progress/InfoSquare.vue'

export default {
  data () {
    return {
      results: [],
      cpm: null,
      time: null,
      accuracy: null,
      incorrect: null,
      reports: [],
      pagination: {
        sortBy: 'date',
        descending: true
      },
      snippit: {},
      options: {
        showTooltips: true,
        responsive: true,
        legend: false,
        percentageInnerCutout: 80,
        animationEasing: 'easeOutQuart',
        animateScale: false
      },
      timeData: {
        labels: [],
        datasets: [{
          label: "Time",
          data: [],
          fill: true,
        }]
      },
      accuracyData: {
        labels: [],
        datasets: [{
          label: "Accuracy",
          data: [],
          fill: true,
        }]
      },
      cpmData: {
        labels: [],
        datasets: [{
          label: "CPM",
          data: [],
          fill: true,
        }]
      }
    }
  },
  async mounted () {
    this.snippit = await SnippitService.show(this.snippitId);
    this.results = await ReportsService.index({snippitId: this.snippitId});
    this.reports = this.results;

    let bestCpm = 0;
    let bestTime = Infinity;
    let bestAccuracy = 0;
    let bestIncorrect = Infinity;
    this.results.forEach((result, index) => {
      this.timeData.labels.push(index + 1);
      this.timeData.datasets[0].data.push(result.time);
      this.accuracyData.labels.push(index + 1);
      this.accuracyData.datasets[0].data.push(result.accuracy);
      this.cpmData.labels.push(index + 1);
      this.cpmData.datasets[0].data.push(result.cpm);

      bestCpm = Math.max(bestCpm, result.cpm)
      bestTime = Math.min(bestTime, result.time)
      bestAccuracy = Math.max(bestAccuracy, result.accuracy)
      bestIncorrect = Math.min(bestIncorrect, result.incorrect)
    });

    this.$refs.timeChart.render();
    this.$refs.cpmChart.render();
    this.$refs.accuracyChart.render();

    this.cpm = bestCpm;
    this.time = bestTime;
    this.accuracy = bestAccuracy;
    this.incorrect = bestIncorrect;
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
  padding-left: 50px;
  padding-right: 50px;
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
