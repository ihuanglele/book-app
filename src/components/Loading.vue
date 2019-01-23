<template>
  <div class="box">
    <mu-icon size="36" :value="loadingIcon" color="green"></mu-icon>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      loadingIcon: 'border_bottom'
    }
  },
  created () {
    let t = 0
    const arr = ['border_bottom', 'border_left', 'border_top', 'border_right', 'border_inner', 'border_outer']
    setInterval(() => {
      t++
      if (t === arr.length) {
        t = 0
      }
      this.loadingIcon = arr[t]
    }, 1000)
  }
}
</script>

<style scoped>
.box{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
