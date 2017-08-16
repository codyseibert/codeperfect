<template>
  <v-layout style="align-items: center; justify-content: center;">
    <v-flex xs6 class="text-xs-right">
      <div class="numeric">
        {{value}}
      </div>

      <div class="subtitle">
        {{title}}
      </div>
    </v-flex>

    <v-flex xs6 class="text-xs-left">
      <v-icon class="info-icon">{{icon}}</v-icon>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: [
    'icon',
    'value',
    'title'
  ]
}
</script>

<style scoped>
.info-square {
  display: inline-block;
  text-align: left;
  width: 120px;
  text-shadow: 1px 1px 1px #666;
  position: relative;
}

.numeric {
  font-size:calc(12px + 2vw);
  font-weight: bold;
  color: white;
}

.subtitle {
  font-size:calc(6px + 1.2vw);
  position: relative;
  top: -10px;
  color: white;
  left: 0px;
}

.info-icon {
  font-size:calc(12px + 5vw);
  color: white;
  text-shadow: 1px 1px 1px #666;
}
</style>
