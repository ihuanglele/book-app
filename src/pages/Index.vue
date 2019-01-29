<template>
  <div class="app-content">
    <mu-appbar style="width: 100%;" color="primary">
      来了官人
      <mu-button @click="search" icon slot="right">
        <icon icon="search" />
      </mu-button>
    </mu-appbar>
  </div>
</template>

<script>

import Icon from '../components/Icon'

export default {
  components: {Icon},
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
