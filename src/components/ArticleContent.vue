<template>
  <div class="content-main" @click="$emit('click')">
    <h5 class="name" v-if="name" v-html="name"></h5>
    <div class="content" v-html="formatText(content)"></div>
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
  props: [
    'name',
    'content'
  ],
  methods: {
    formatText (text) {
      return text.replace(/\r+/g, '<br/>')
    }
  }
}
</script>

<style scoped>
  .content-main{
    padding: 5px;
    text-indent: 2px;
    font-size: 18px;
    line-height: 24px;
  }
  .content-main .name{
    margin: 0 0 8px 0;
    padding-bottom: 5px;
    border-bottom: 1px dotted;
  }
</style>
