<template>
  <div id="panels">
    <start-panel></start-panel>
    <typing-panel :code="code"></typing-panel>
    <results-panel :results="results"></results-panel>
  </div>
</template>

<script>
import StartPanel from './components/panels/start.vue'
import TypingPanel from './components/panels/typing.vue'
import ResultsPanel from './components/panels/results.vue'

export default {
  data () {
    return {
      code: '',
      results: {}
    }
  },
  components: {
    StartPanel,
    TypingPanel,
    ResultsPanel
  },
  mounted () {
    let $currentPanel = $('#panel-start');

    function showPanel ($panel) {
      const tl = new TimelineLite();
      tl
        .set($panel, {
          left: -$panel.offset().left - $panel.width() - 50,
          zIndex: 1,
          opacity: 1
        })
        .to($currentPanel, 1.0, {
          left: $(window).width() - $currentPanel.offset().left,
          zIndex: 0
        })
        .to($currentPanel, 0, {
          opacity: 0,
        })
        .to($panel, 1.0, {
          left: 0
        }, '-=1.0');
      $currentPanel = $panel;
    }

    this.$on('practice.start', data => {
      console.log('start data', data);
      this.code = data.code;
      showPanel($('#panel-typing'));
    });

    this.$on('practice.done', data => {
      console.log('data', data);
      this.results = data;
      console.log('panel-results', $('#panel-results'))
      showPanel($('#panel-results'));
    });

    this.$on('practice.restart', data => {
      console.log('data', data);
      this.code = '';
      this.results = {};
      showPanel($('#panel-start'));
    });
  }
}
</script>

<style>
#panels {
  position: relative;
  width: 100%;
}

#panel-start {
  position: absolute;
  width: 100%;
}

#panel-typing {
  opacity: 0;
  position: absolute;
  width: 100%;
}

#panel-results {
  opacity: 0;
  position: absolute;
  width: 100%;
}
</style>

<style scoped>
#panels {
  width: 600px;
  margin: 0 auto;
}
</style>