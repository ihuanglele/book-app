<template>
  <div class="app-content">
    <mu-appbar class="topbar" color="primary">
      <mu-button @click="back" icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      {{book.name}}
      <mu-button @click="search" icon slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container>
      <span>字体</span>
      <mu-slider v-model="style.fontSize" :step="1" display-value :max="30" :min="12"></mu-slider>
      <div style="margin: 10px 0;border-bottom: 1px dotted #0097fa"></div>
      <span>行高</span>
      <mu-slider v-model="style.lineHeight" :step="1" display-value :max="30" :min="style.fontSize"></mu-slider>
      <mu-flex fill justify-content="between">
        <mu-button v-for="item in styleOptions"
                   small color="blue"
                   v-html="item.name"
                   style="min-width: 50px;line-height: 28px"
                   @click="style = item.value"
                   :key="item.name"></mu-button>
      </mu-flex>
      <div style="margin: 10px 0;border-bottom: 1px dotted #0097fa"></div>
      <span>颜色</span>
      <mu-flex fill justify-content="between">
        <mu-button v-for="item in colorOptions"
                   small :color="item.background"
                   :text-color="item.color"
                   v-html="'爱'"
                   style="min-width: 40px;line-height: 28px"
                   @click="color = item"
                   :key="item.name"></mu-button>
      </mu-flex>
    </mu-container>
    <article-content
      v-for="(article,index) in articles" :key="index"
      class="article-content"
      :style="articleStyle"
      :name="`第${index}章`"
      :content="article"/>
  </div>
</template>

<script>
  import BookImg from '../components/BookImg'
  import ArticleContent from '../components/ArticleContent'

  export default {
  name: 'Article',
  components: {ArticleContent, BookImg},
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
      },
      style: {
        lineHeight: 20,
        fontSize: 18
      },
      styleOptions: [
        {'name': '小号', value: {lineHeight: 14, fontSize: 12}},
        {'name': '正常', value: {lineHeight: 18, fontSize: 16}},
        {'name': '舒服', value: {lineHeight: 22, fontSize: 18}},
        {'name': '超大', value: {lineHeight: 30, fontSize: 24}}
      ],
      color: {
      },
      colorOptions: [
        {color: '#000', background: '#fff'},
        {color: '#333', background: '#f3f7f0'},
        {color: '#2f2f2f', background: '#f7f7f7'},
        {color: '#fefeff', background: '#c1bdd1'},
        {color: '#000', background: '#fff'}
      ]
    }
  },
  created () {
    if (!this.$route.params.type || !this.$route.params.bookId || !this.$route.params.articleId) {
      this.$toast.error('参数错误')
      this.back()
      return null
    }
    console.log('create')
    this.getArticle(this.$route.params)
  },
  methods: {
    _initFunc (to, from) {
      this.getArticle(to.params)
    },
    async getArticle (params) {
      const ret = await this.http_get('index/article', params)
      if (ret.code !== 200) {
        return null
      }
      this.articles.push(ret.data)
    },
    clickImg () {
      console.log('clickImg')
    }
  },
  computed: {
    articleStyle () {
      return {
        // ...this.style,
        lineHeight: this.style.lineHeight + 'px',
        fontSize: this.style.fontSize + 'px',
        ...this.color
      }
    }
  }
}
</script>

<style scoped>
  .topbar{
    width: 100%;
    display: none;
    position: absolute;
    top:0
  }
.book{
  width: 120px;
  max-height: 200px;
}
</style>
