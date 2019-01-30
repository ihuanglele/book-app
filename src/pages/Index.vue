<template>
  <div class="app-content">
    <mu-appbar style="width: 100%;" color="primary">
      {{title}}
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
      },
      titles: [
        '来了官人',
        '爱你每一天',
        '想你哟'
      ]
    }
  },
  computed: {
    title () {
      return this.titles[Math.floor(Math.random() * this.titles.length)]
    }
  }
}
</script>

<style scoped>

</style>
