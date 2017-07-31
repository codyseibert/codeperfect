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
      const left = -$panel.offset().left - $panel.width() - 50;
      const right = $(window).width() - $currentPanel.offset().left;
      tl
        .set($panel, {
          left: right,
          zIndex: 1,
          opacity: 1
        })
        .to($currentPanel, 0.7, {
          left: left,
          zIndex: 0
        })
        .set($currentPanel, {
          opacity: 0,
          left: 0
        })
        .to($panel, 0.7, {
          left: 0
        }, '-=0.7');
      $currentPanel = $panel;
    }

    this.$on('practice.start', data => {
      this.code = data.code;
      showPanel($('#panel-typing'));
    });

    this.$on('practice.done', data => {
      this.code = '';
      this.results = data;
      showPanel($('#panel-results'));
    });

    this.$on('practice.restart', data => {
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