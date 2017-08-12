<template>
  <div>
    <h1>Great Job!</h1>
    <md-layout md-gutter="40">

      <md-layout md-flex="50">
        <md-card>
          <md-card-header>
            <div class="md-title">Accuracy</div>
          </md-card-header>

          <md-card-media>
            <canvas id="accuracy"></canvas>
            <div class="center">{{result.accuracy}}%</div>
          </md-card-media>
        </md-card>
      </md-layout>

      <md-layout md-flex="50">
        <md-card>
          <md-card-header>
            <div class="md-title">CPM</div>
          </md-card-header>

          <md-card-media>
            <canvas id="cpm"></canvas>
            <div class="center">{{result.cpm}}%</div>
          </md-card-media>
        </md-card>
      </md-layout>
    </md-layout>

    <div id="info">
      <h1>Typing Summary</h1>
      <div class="flex-container">
        <div class="col text-right">typeable characters</div>
        <div class="col">{{result.total}}</div>
      </div>
      <div class="flex-container">
        <div class="col text-right">typed characters</div>
        <div class="col">{{result.typed}}</div>
      </div>
      <div class="flex-container">
        <div class="col text-right">elapsed time</div>
        <div class="col">{{result.time}} seconds</div>
      </div>
    </div>
  </div>

        <!--
      </div>

      <div class="col">
        <h2>CPM</h2>
        <canvas id="cpm"></canvas>
        <div class="center">{{result.cpm}}</div>
      </div>
    </div>

    <div id="info">
      <h1>Typing Summary</h1>
      <div class="flex-container">
        <div class="col text-right">typeable characters</div>
        <div class="col">{{result.total}}</div>
      </div>
      <div class="flex-container">
        <div class="col text-right">typed characters</div>
        <div class="col">{{result.typed}}</div>
      </div>
      <div class="flex-container">
        <div class="col text-right">elapsed time</div>
        <div class="col">{{result.time}} seconds</div>
      </div>
    </div>
  </div> -->
</template>

<script>
import ResultsService from '../../services/results'

export default {
  data () {
    return {
      result: {}
    }
  },
  props: [
    'snippitId'
  ],
  methods: {
  },
  mounted () {
    const results = ResultsService.findBySnippitId(this.snippitId);
    this.result = results[0];

    const accuracyContext = $('#accuracy')[0].getContext('2d');
    new Chart(accuracyContext).Doughnut([{
      value: this.result.accuracy,
      label: 'Accuracy',
      color: '#CF7F00'
    },{
      value: 100 - this.result.accuracy,
      label: '',
      color: '#E3E3E3'
    }], {
      showTooltips: false,
      responsive: true,
      percentageInnerCutout: 80,
      animationEasing: 'easeOutQuart',
      animateScale: false
    });

    const cpmContext = $('#cpm')[0].getContext('2d');
    new Chart(cpmContext).Doughnut([{
      value: this.result.cpm,
      label: 'CPM',
      color: '#CF7F00'
    },{
      value: 500 - this.result.cpm,
      label: '',
      color: '#E3E3E3'
    }], {
      showTooltips: false,
      responsive: true,
      percentageInnerCutout: 80,
      animationEasing: 'easeOutQuart',
      animateScale: false
    });
  }
}
</script>

<style scoped>

</style>
