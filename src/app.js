
new Vue({
  el: '#app',
  template: '<start-panel></start-panel>',
  render: (createElement) =>
    createElement('start-panel')
});

$(document).ready(() => {


  const panels = {
    $start: $('#panel-start'),
    $type: $('#panel-type'),
    $results: $('#panel-results')
  };
  
  const snippit = CodeMirror($('.snippit')[0], {
    value: 'v',
    mode: 'javascript',
    lineNumbers: true
  });

  let $currentPanel = panels.$start;
  
  function showPanel($panel) {
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
      }, '-=1.0') 
    $currentPanel = $panel;
  }

  $('.practice').click(function() {
    $(this).blur()
    $('.type-zone').html(snippit.doc.getValue());
    startPractice()
  });

  $('.restart').click(function() {
    $(document).unbind('keypress');
    showPanel(panels.$start);
  });

  function setCharacterAsRed(code, i) {
    if (i >= code.length) return;
    let char = code[i];
    if (char === '\n') {
      char = '&#8629;\n';
    }
    return code.substring(0, i) + 
      `<span class="cursor">${char}</span>` + 
      code.substring(i + 1);
  }

  function startPractice() {
    showPanel(panels.$type);
    const $typeZone = $('.type-zone');
    const code = $typeZone.html();
    let i = 0;
    let typed = 0;
    let correct = 0;
    const start = new Date();
    $typeZone.html(setCharacterAsRed(code, i));
    
    $(document).keypress((event) => {
      if(event.keyCode === 32) {
        event.preventDefault();
      }

      let char = code[i];
      if (char === '\n') {
        char = 'Enter'
      }

      typed++;
      
      if (event.key === char) {
        correct++;
        i++;
        $typeZone.html(setCharacterAsRed(code, i));
      }

      if (i === code.length) {
        const seconds = Math.floor((new Date() - start) / 1000);
        endPractice({
          time: seconds,
          cpm: Math.floor((correct / seconds) * 60),
          accuracy: Math.floor(correct / (typed * 1.0) * 100),
          correct: correct,
          typed: typed,
          total: code.length
        });
      }
    })
  }

  function endPractice(results) {
    showPanel(panels.$results);
    $(document).unbind('keypress');
    const $center = $('#accuracy-center');
    const $cpmCenter = $('#cpm-center');
    const $cpm = $('.cpm');
    const $accuracy = $('.accuracy');
    const $correct = $('.correct');
    $cpm.html(`${results.cpm} CPM`);
    $accuracy.html(`${results.accuracy}% Accuracy`);
    $correct.html(`${results.correct} / ${results.typed} Correct Keystrokes`);

    $('#typable').html(results.total);
    $('#typed').html(results.typed);
    $('#time').html(results.time + ' seconds');

    const accuracyContext = $('#accuracy')[0].getContext('2d');
    new Chart(accuracyContext).Doughnut([{
      value: results.accuracy,
      label: 'Accuracy',
     	color: '#CF7F00'
    },{
      value: 100 - results.accuracy,
      label: '',
	    color: '#E3E3E3'
    }], {
      showTooltips: false,
      responsive: true,
      percentageInnerCutout: 80,
      animationEasing: 'easeOutQuart',
      animateScale: false
    });
    $center.html(`${results.accuracy}%`);

    const cpmContext = $('#cpm')[0].getContext('2d');
    new Chart(cpmContext).Doughnut([{
      value: results.cpm,
      label: 'CPM',
     	color: '#CF7F00'
    },{
      value: 500 - results.cpm,
      label: '',
	    color: '#E3E3E3'
    }], {
      showTooltips: false,
      responsive: true,
      percentageInnerCutout: 80,
      animationEasing: 'easeOutQuart',
      animateScale: false
    });
    $cpmCenter.html(`${results.cpm}`);
    
  }

})