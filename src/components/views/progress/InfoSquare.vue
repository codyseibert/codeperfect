<template>
  <div class="info-square">
    <div class="numeric">
      <v-icon>{{icon}}</v-icon>
      {{value}}
    </div>

    <div class="subtitle">
      {{title}}
    </div>
  </div>
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
  width: 120px;
}

.numeric {
  font-size: 30px;
  color: #666;
}

.subtitle {
  font-size: 16px;
  position: relative;
  top: -10px;
  color: #666;
  left: 0px;
}
</style>
