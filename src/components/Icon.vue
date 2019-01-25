<template>
    <i class="iconfont" :style="iconStyle" :class="`icon-${icon}`"></i>
</template>

<script>
export default {
  name: 'Icon',
  props: [
    'icon',
    'size',
    'color'
  ],
  computed: {
    iconStyle () {
      let s = {}
      if (this.size) {
        s['font-size'] = this.size + 'px'
      }
      if (this.color) {
        s['color'] = this.color
      }
      console.log(s)
      return s
    }
  }
}
</script>

<style scoped>

</style>
