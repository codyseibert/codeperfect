<template>
  <v-layout column>
    <v-layout>
      <v-flex xs12 md6>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Snippit</v-toolbar-title>
          </v-toolbar>

          <pre v-highlightjs="snippit.code">
            <code class="javascript"></code>
          </pre>
        </div>
      </v-flex>

      <v-flex xs12 md6>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Best Metrics</v-toolbar-title>
          </v-toolbar>

          <v-layout row wrap style="padding: 20px;">
            <v-flex sm6 xs12 class="text-xs-center mb-4">
              <InfoSquare
                icon="timer"
                :value="time + 's'"
                title="Best Time" />
            </v-flex>

            <v-flex sm6 xs12 class="text-xs-center">
              <InfoSquare
                icon="keyboard"
                :value="cpm"
                title="Best CPM" />
            </v-flex>

            <v-flex sm6 xs12 class="text-xs-center">
              <InfoSquare
                icon="track_changes"
                :value="accuracy"
                title="Best Accuracy" />
            </v-flex>

            <v-flex sm6 xs12 class="text-xs-center">
              <InfoSquare
                icon="error"
                :value="incorrect"
                title="Best Incorrect" />
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>

    <!-- <v-layout class="pt-5">
      <v-flex xs4 offset-xs4>
        <v-divider></v-divider>
      </v-flex>
    </v-layout> -->

    <v-layout class="mt-2" column>
      <v-layout>
        <v-flex xs4 class="text-xs-center">
          <div class="white elevation-2">
            <v-toolbar flat dense class="cyan" dark>
              <v-toolbar-title>Elasped Time</v-toolbar-title>
            </v-toolbar>
            <div class="p4">
              <cpm-chart ref="timeChart" :data="timeData" :options="options"/>
            </div>
          </div>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <div class="white elevation-2">
            <v-toolbar flat dense class="cyan" dark>
              <v-toolbar-title>CPM</v-toolbar-title>
            </v-toolbar>
            <div class="p4">
              <cpm-chart ref="cpmChart" :data="cpmData" :options="options"/>
            </div>
          </div>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <div class="white elevation-2">
            <v-toolbar flat dense class="cyan" dark>
              <v-toolbar-title>Accuracy</v-toolbar-title>
            </v-toolbar>
            <div class="p4">
              <cpm-chart ref="accuracyChart" :data="accuracyData" :options="options"/>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-layout class="mt-2">
      <v-flex xs12>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Reports</v-toolbar-title>
          </v-toolbar>

          <v-data-table
            :headers="[{
              text: 'Date',
              value: 'date'
            },{
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
            dark
          >
            <template slot="items" scope="props">
              <td class="text-xs-right">{{ props.item.date | moment("calendar") }}</td>
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
      reports: [],
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
    this.reports = await ReportsService.index({snippitId: this.snippitId});

    let bestCpm = 0;
    let bestTime = Infinity;
    let bestAccuracy = 0;
    let bestIncorrect = Infinity;
    this.reports.forEach((result, index) => {
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

.p4 {
  padding: 20px;
}

table {
  width: 100%;
}

td {
  text-align: center;
  padding: 20px;
}

.hljs {
  background-color: black;
  color: white;
  top: -21px;
  position: relative;
  border-radius: 0px;
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
