<template>
  <div class="app-content">
    <mu-appbar style="width: 100%;" color="primary">
      Search for You
      <mu-button @click="search" icon slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      form: {
        input: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
