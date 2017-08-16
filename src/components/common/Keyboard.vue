<template>
  <div id="keyboard" />
</template>

<script>
import Keyboard from '../../responsive-keyboard'

export default {
  props: [
    'errorMap'
  ],
  mounted () {
    const keyboard = Keyboard({
      selector: '#keyboard'
    });

    for (let [key, value] of Object.entries(this.errorMap)) {
      const red = Math.min(255, value * 16 + 40);
      if (key === " ") {
        key = "space"
      }
      let $key = $(`#keyboard .key[data-key="${key}"]`);
      if ($key.length) {
        $key[0].style.backgroundColor = `rgb(${red}, 0, 0)`;
      }
    }
  }
}
</script>

<style>
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
</style>
