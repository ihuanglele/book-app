<template>
  <div @click="clickPage">
    <mu-appbar class="topbar" color="primary" :class="{active:topbarActive}">
      <mu-button @click="goBack" icon slot="left">
        <icon icon="back"></icon>
      </mu-button>
      {{book.name}}
      <div slot="right">
        <mu-button small @click.stop="showChaptersDrawer = true" icon >
          <icon icon="listcolumn"></icon>
        </mu-button>
        <mu-button small @click.stop="showSettingDialog = true" icon >
          <icon icon="setting"></icon>
        </mu-button>
        <mu-button small @click.stop="goIndex" icon >
          <icon icon="home"></icon>
        </mu-button>
      </div>
    </mu-appbar>

    <mu-container style="padding: 0">
      <mu-load-more @load="loadMore" :loading="loading" :loaded-all="loadedAll">
        <mu-list style="padding: 0;">
          <article-content
            v-for="(item,index) in articles" :key="index"
            class="article-content"
            :style="articleStyle"
            :name="item.title"
            :content="item.content" />
        </mu-list>
      </mu-load-more>
    </mu-container>

    <mu-dialog title="设置" width="80%"
               scrollable :open.sync="showSettingDialog">
      <mu-container>
        <span>字号</span>
        <mu-slider v-model="style.fontSize" :step="1" display-value :max="30" :min="12"></mu-slider>
        <div style="margin: 10px 0;border-bottom: 1px dotted #0097fa"></div>
        <span>行高</span>
        <mu-slider v-model="style.lineHeight" :step="1" display-value :max="80" :min="(style.fontSize) * 1.3"></mu-slider>
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
        <mu-flex fill justify-content="start" wrap="nowrap" style="overflow-x: auto;padding-bottom: 5px">
          <mu-button v-for="item in colorOptions"
                     small :color="item.background"
                     :text-color="item.color"
                     v-html="'爱'"
                     fab
                     style="min-width: 40px;line-height: 28px;margin: 3px 8px 0"
                     @click="color = item"
                     :key="item.name"></mu-button>
        </mu-flex>
      </mu-container>
      <mu-button slot="actions" flat color="primary" @click="showSettingDialog = false">关闭</mu-button>
    </mu-dialog>

    <mu-drawer :open.sync="showChaptersDrawer" :docked="false" width="200px" :right="true">
      <mu-list>
        <mu-list-item button :ripple="false"
                      v-for="(item,index) in chapters" :key="index"
                      @click="jumpChapter(index)">
          <p class="chapter-list-title" :class="{active:currentChapterIndex === index}" v-html="item.title"></p>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import BookImg from '../components/BookImg'
import ArticleContent from '../components/ArticleContent'
import Icon from '../components/Icon'

export default {
  name: 'Article',
  components: {Icon, ArticleContent, BookImg},
  data () {
    return {
      showSettingDialog: false,
      topbarActive: false,
      loading: false,
      loadedAll: false,
      showChaptersDrawer: false,
      book: {
        name: '',
        author: '',
        cover: '',
        type: '',
        bookId: '',
        chapters: []
      },
      currentChapterIndex: 0,
      articles: [], // {title,content,index}
      style: {lineHeight: 30, fontSize: 18},
      styleOptions: [
        {'name': '小号', value: {lineHeight: 14, fontSize: 12}},
        {'name': '正常', value: {lineHeight: 18, fontSize: 16}},
        {'name': '舒服', value: {lineHeight: 22, fontSize: 18}},
        {'name': '超大', value: {lineHeight: 30, fontSize: 24}}
      ],
      color: {}, // {color,background}
      colorOptions: [
        {color: '#000', background: '#fff'},
        {color: '#333', background: '#f3f7f0'},
        {color: '#2f2f2f', background: '#f7f7f7'},
        {color: '#333', background: '#fdf6ee'},
        {color: '#fefeff', background: '#c1bdd1'},
        {color: '#000', background: '#c7edff'}
      ]
    }
  },
  created () {
    this.initConf()
    this._initFunc(this.$route, 'created')
  },
  methods: {
    async _initFunc (to, from) {
      if (to.name !== 'article') {
        return
      }
      console.log('_initFunc', from)
      if (!to.params.type || !to.params.bookId || !to.params.articleId) {
        this.$toast.error('参数错误')
        this.goBack()
        return
      }
      if (typeof to.params.index !== 'undefined') {
        this.currentChapterIndex = to.params.index
      }
      await this.initCat()
      this.getArticle(to.params)
    },
    clickPage () {
      if (this.showChaptersDrawer) {
        this.showChaptersDrawer = false
      } else {
        this.topbarActive = !this.topbarActive
      }
    },
    sortArticle (arr) {
      return arr.sort((a, b) => {
        return a.index - b.index
      })
    },
    async getArticle (params) {
      const ret = await this.http_get('index/article', params)
      if (ret.code !== 200) {
        return null
      }
      let item = {}
      let exist = false
      // 查询 章节名称
      for (let i in this.chapters) {
        if (this.chapters[i].articleId === params.articleId) {
          item = {...this.chapters[i]}
          item['index'] = i
          item['content'] = ret.data
          exist = true
          break
        }
      }
      // 没有匹配到内容
      if (!exist) {
        item['index'] = -1
        item['content'] = ret.data
        console.log('没有找到')
      }
      let arr = [
        ...this.articles,
        item
      ]
      arr = this.sortArticle(arr)
      let articles = []
      for (let i in arr) {
        articles.push(arr[i])
        if (arr[i]['articleId'] === params['articleId']) {
          break
        }
      }
      this.articles = articles
      this.currentChapterIndex = articles[articles.length - 1]['index']
      if (this.currentChapterIndex === (this.chapters.length - 1)) {
        this.loadedAll = true
      }
    },
    async initCat () {
      // 判断书是否变化
      if (this.$route.params.type === this.book.type &&
          this.$route.params.bookId === this.book.bookId) {
        return
      }
      const ret = await this.http_get('index/cat', {
        type: this.$route.params.type,
        bookId: this.$route.params.bookId
      })
      if (ret.code === 200) {
        this.book = ret.data
        this.articles = []
      }
    },
    async loadMore () {
      this.loading = true
      // 获取下一篇
      let i = 1 + (Number)(this.currentChapterIndex)
      try {
        await this.getArticle(this.chapters[i])
      } catch (err) {

      }
      this.loading = false
    },
    jumpChapter (index) {
      this.getArticle(this.chapters[index])
    },
    initConf () {
      let style = this.getConf('article_style', false)
      if (style) {
        try {
          this.style = JSON.parse(style)
        } catch (e) {
          console.log(e)
        }
      }
      let color = this.getConf('article_color', false)
      if (color) {
        try {
          this.color = JSON.parse(color)
        } catch (e) {

        }
      }
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
    },
    chapters () {
      return this.book.chapters
    }
  },
  watch: {
    style (v) {
      this.setConf('article_style', JSON.stringify(v))
    },
    color (v) {
      this.setConf('article_color', JSON.stringify(v))
    }
  }
}
</script>

<style scoped>
  .topbar{
    width: 100%;
    position: fixed;
    top:-60px;
    transition: top 300ms ease-in-out;
  }
  .topbar.active{
    top:0;
  }
.book{
  width: 120px;
  max-height: 200px;
}
.article-content{
  font-family: "Microsoft YaHei";
}
  .chapter-list-title{
    overflow: hidden
  }
</style>
