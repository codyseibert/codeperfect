<template>
  <div id="panel-results">
    <h1>Great Job!</h1>

    <div class="flex">
      <div class="col">
        <h2>Accuracy</h2>
        <canvas id="accuracy"></canvas>
        <div class="center">{{results.accuracy}}%</div>
      </div>

      <div class="col">
        <h2>CPM</h2>
        <canvas id="cpm"></canvas>
        <div class="center">{{results.cpm}}</div>
      </div>
    </div>

    <div id="info">
      <h1>Typing Summary</h1>
      <div class="flex-container">
        <div class="col text-right">typeable characters</div>
        <div class="col">{{results.total}}</div>
      </div>
      <div class="flex-container">
        <div class="col text-right">typed characters</div>
        <div class="col">{{results.typed}}</div>
      </div>
      <div class="flex-container">
        <div class="col text-right">elapsed time</div>
        <div class="col">{{results.time}} seconds</div>
      </div>
    </div>

    <button class="restart" v-on:click="restart">RESTART</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  props: [
    'results'
  ],
  methods: {
    restart () {
      this.$parent.$emit('practice.restart');
    }
  },
  watch: {
    results () {
      const accuracyContext = $('#accuracy')[0].getContext('2d');
      new Chart(accuracyContext).Doughnut([{
        value: this.results.accuracy,
        label: 'Accuracy',
        color: '#CF7F00'
      },{
        value: 100 - this.results.accuracy,
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
        value: this.results.cpm,
        label: 'CPM',
        color: '#CF7F00'
      },{
        value: 500 - this.results.cpm,
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
}
</script>

<style scoped>
  h1, h2 {
    text-align: center;
  }

  .text-right {
    text-align: right;
    padding-right: 20px;
  }

  .flex {
    display: -webkit-flex;
    display: flex;
  }

  .center {
    position: relative;
    top: -125px;
    font-size: 40px;
    text-align: center;
  }

  button {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 70px;
    margin-top: 20px;
    border: none;
    background-color: #dcedc1;
    cursor: pointer;
    font-size: 40px;
    font-family: 'VT323', monospace;
    border-radius: 5px;
  }

  button:hover {
    background-color: #a8e6cf;
  }

  .flex-container {
    font-size: 30px;
    display: flex;
  }

  .col {
    flex: 1;
  }
</style>
