<template>
  <div>
    <div v-for="(article,index) in articles" :key="index" v-html="article"></div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      book: {
        name: '',
        author: '',
        cover: '',
        type: '',
        bookId: '',
        chapters: []
      },
      currentChapter: 0,
      articles: [

      ],
      params: {
      }
    }
  },
  created () {
    if (!this.$route.params.type || !this.$route.params.bookId || !this.$route.params.articleId) {
      this.$toast.error('参数错误')
      this.back()
      return null
    }
    this.params = this.$route.params
    this.getArticle(this.params)
  },
  methods: {
    async getArticle (params) {
      const ret = await this.http_get('index/article', params)
      if (ret.code !== 200) {
        return null
      }
      this.articles.push(ret.data)
    }
  }
}
</script>

<style scoped>

</style>
