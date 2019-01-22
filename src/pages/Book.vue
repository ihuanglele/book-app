<template>
  <div></div>
</template>

<script>
export default {
  name: 'Book',
  data () {
    return {
      link: {
        type: '',
        params: ''
      }
    }
  },
  methods: {
  },
  created () {
    console.log(this.$route.params)
  }

}
</script>

<style scoped>

</style>
