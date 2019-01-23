<template>
  <div>
    {{this.$route.params}}
  </div>
</template>

<script>
export default {
  name: 'Article',
  created () {
    console.log(this.$route.params)
  }
}
</script>

<style scoped>

</style>
