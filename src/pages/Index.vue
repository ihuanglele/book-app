<template>
  <div>
    <p>Search for You</p>
    <mu-form>
      <mu-form-item prop="input" label="Input">
        <mu-text-field v-model="key"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </div>
</template>

<script>
import MuForm from 'muse-ui/es5/Form/Form'
import MuFormItem from 'muse-ui/es5/Form/FormItem'

export default {
  components: {
    MuFormItem,
    MuForm},
  data () {
    return {
      key: ''
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
