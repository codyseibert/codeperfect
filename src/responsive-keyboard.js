
var template = `
  <div class="responsive-keyboard">
    <div class="row">
      <div class="key" data-key="\`">\`</div>
      <div class="key" data-key="1">1</div>
      <div class="key" data-key="2">2</div>
      <div class="key" data-key="3">3</div>
      <div class="key" data-key="4">4</div>
      <div class="key" data-key="5">5</div>
      <div class="key" data-key="6">6</div>
      <div class="key" data-key="7">7</div>
      <div class="key" data-key="8">8</div>
      <div class="key" data-key="9">9</div>
      <div class="key" data-key="0">0</div>
      <div class="key" data-key="-">-</div>
      <div class="key" data-key="+">+</div>
      <div class="key delete" data-key="delete">delete</div>
    </div>

    <div class="row">
      <div class="key tab" data-key="tab">tab</div>
      <div class="key" data-key="q">Q</div>
      <div class="key" data-key="w">W</div>
      <div class="key" data-key="e">E</div>
      <div class="key" data-key="r">R</div>
      <div class="key" data-key="t">T</div>
      <div class="key" data-key="y">Y</div>
      <div class="key" data-key="u">U</div>
      <div class="key" data-key="i">I</div>
      <div class="key" data-key="o">O</div>
      <div class="key" data-key="p">P</div>
      <div class="key" data-key="[">[</div>
      <div class="key" data-key="]">]</div>
      <div class="key" data-key="\">\</div>
    </div>

    <div class="row">
      <div class="key caps" data-key="caps-lock">caps lock</div>
      <div class="key" data-key="a">A</div>
      <div class="key" data-key="s">S</div>
      <div class="key" data-key="d">D</div>
      <div class="key" data-key="f">F</div>
      <div class="key" data-key="g">G</div>
      <div class="key" data-key="h">H</div>
      <div class="key" data-key="j">J</div>
      <div class="key" data-key="k">K</div>
      <div class="key" data-key="l">L</div>
      <div class="key" data-key=";">;</div>
      <div class="key" data-key="'">'</div>
      <div class="key return" data-key="return">return</div>
    </div>

    <div class="row">
      <div class="key shift" data-key="shift">shift</div>
      <div class="key" data-key="z">Z</div>
      <div class="key" data-key="x">X</div>
      <div class="key" data-key="c">C</div>
      <div class="key" data-key="v">V</div>
      <div class="key" data-key="b">B</div>
      <div class="key" data-key="n">N</div>
      <div class="key" data-key="m">M</div>
      <div class="key" data-key=",">,</div>
      <div class="key" data-key=".">.</div>
      <div class="key" data-key="/">/</div>
      <div class="key shift" data-key="shift">shift</div>
    </div>

    <div class="row bottom">
      <div class="key" data-key="fn">fn</div>
      <div class="key" data-key="control">control</div>
      <div class="key" data-key="alt">alt</div>
      <div class="key command" data-key="command-left">command</div>
      <div class="key space" data-key="space">space</div>
      <div class="key command" data-key="command-right">command</div>
      <div class="key" data-key="alt">alt</div>
    </div>
  </div>
`;

export default function(options) {
  document.querySelector(options.selector).innerHTML = template;

  if (options.style === 'white') {
    document.querySelector(options.selector + ' .responsive-keyboard').className += ' white'
  }

  function getParentWidth(elem) {
    return elem.parentElement.clientWidth;
  }

  function refresh() {
    var k = document.querySelector(options.selector + ' .responsive-keyboard');
    var parentWidth = getParentWidth(k);
    k.style.width = parentWidth - 20 + 'px';
    k.style.height = ((parentWidth - 20) / 2.54) + 'px';
    k.style.fontSize = parentWidth / 50 + 'px';
  }
  refresh();

  window.addEventListener('resize', refresh);

  return {
    getKey: function(key) {
      return document.querySelector(options.selector + ' .responsive-keyboard .key[data-key="' + key + '"]')
    }
  }
}
