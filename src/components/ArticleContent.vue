<template>
  <div class="content-main">
    <h5 class="name" v-if="name" v-html="name"></h5>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
  props: [
    'name',
    'content'
  ],
}
</script>

<style scoped>
  .content-main{
    margin: 5px;
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
