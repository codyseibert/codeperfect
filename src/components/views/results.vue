<template>
  <v-layout column>
    <h3>Great Job!</h3>

    <v-layout class="mb-4">
      <v-flex xs4 offset-xs2>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Accuracy</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <canvas id="accuracy"></canvas>
            <div class="center">{{result.accuracy}}%</div>
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>CPM</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <canvas id="cpm"></canvas>
            <div class="center">{{result.cpm}} </div>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mb-4" row>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Typing Summary</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="text-center">
            <h4>Typeable Characters: {{result.total}}</h4>
            <h4>Typed Characters: {{result.typed}}</h4>
            <h4>Elasped Time: {{result.time}}</h4>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mb-4">
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-toolbar class="blue lighten-4">
            <v-toolbar-title>Typing Error Map</v-toolbar-title>
          </v-toolbar>

          <v-card-media class="keyboard-wrapper">
            <div id="keyboard" />
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ResultsService from '../../services/results'
import Keyboard from '../../responsive-keyboard'

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
    const keyboard = Keyboard({
      selector: '#keyboard',
      style: 'black'
    });
    keyboard.getKey('a').style.backgroundColor = 'red'

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
      responsive: false,
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
      responsive: false,
      percentageInnerCutout: 80,
      animationEasing: 'easeOutQuart',
      animateScale: false
    });
  }
}
</script>

<style>

h1, h2, h3, h4, h5, h6 {
  text-align: center;
}

.responsive-keyboard {
  border-radius: 10px;
  background-color: #cccfd5;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-family: 'Helvetica'
}

.responsive-keyboard .row {
  flex: 1;
  display: flex;
  padding-bottom: 10px;
}

.responsive-keyboard .key {
  display: flex;
  width: 6.896551724137931%;
  background-color: black;
  color: white;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.responsive-keyboard.white .key {
  color: black;
  background-color: white;
  border: 1px solid black;
}

.responsive-keyboard .key.delete {
  width: 13.793103448275862%;
}

.responsive-keyboard .key.tab {
  width: 14.793103448275862%;
}

.responsive-keyboard .key.caps {
  width: 16.493103448275862%;
}

.responsive-keyboard .key.return {
  width: 15.793103448275862%;
}

.responsive-keyboard .key.shift {
  width: 17.793103448275862%;
}

.responsive-keyboard .key.command {
  width: 7.793103448275862%;
}

.responsive-keyboard .key.space {
  width: 28%;
}

.responsive-keyboard .bottom .key {
  width: 6.5%;
}

.responsive-keyboard .bottom .key.command {
  width: 8%;
}

.responsive-keyboard .bottom .key.space {
  width: 33%;
}

.expand {
  width: 100%;
}

.full-width {
  width: 100%;
}

.mt {
  margin-top: 40px;
}

.md-card-media {
  padding: 20px;
}

canvas + .center {
  font-size: 30px;
  position: relative;
  top: -74px;
  text-align: center;
}

.text-center {
  text-align: center;
}

.keyboard-wrapper {
  padding: 20px;
  text-align: center;
}

.toolbar {
  box-shadow: none;
}

canvas {
  position: relative;
  top: 24px;
}
</style>
