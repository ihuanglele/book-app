<template>
  <div class="app-content">
    <mu-appbar style="width: 100%;position: fixed;" color="primary">
      <mu-button @click="goBack" icon slot="left">
        <icon icon="back" />
      </mu-button>
      {{book.name}}
      <mu-button @click="search" icon slot="right">
        <icon icon="search" />
      </mu-button>
    </mu-appbar>
    <Loading style="margin-top: 80px;" v-if="!init"></Loading>
    <div v-else style="padding: 15px 10px;margin-top: 56px;">
      <div class="card">
        <div class="sub-title">
          <h3>基本信息</h3>
        </div>
        <mu-flex class="info">
          <mu-flex align-self="center">
            <img class="img" :src="book.cover ? book.cover : getDefaultImg()">
          </mu-flex>
          <mu-flex class="desc" fill direction="column">
            <h3 v-html="book.name"></h3>
            <ul>
              <li>作者： <span v-html="book.author"></span></li>
              <li>章节：<span v-html="book.chapters.length + '章'"></span></li>
            </ul>
            <mu-flex class="outline" fill>
              {{book.outline}}
            </mu-flex>
          </mu-flex>
        </mu-flex>
      </div>
      <div class="card">
        <div class="sub-title">
          <h3>章节列表</h3>
          <icon class="right-icon" @click="sortAsc = !sortAsc" icon="sort" />
        </div>
        <mu-list>
          <mu-list-item button :ripple="false"
                        v-for="(item,index) in chapters" :key="index"
                        @click="viewArticle(item.articleId,index)">
            <mu-list-item-title v-html="item.title"></mu-list-item-title>
            <mu-list-item-action>
              <icon icon="right" />
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import Icon from '../components/Icon'

export default {
  name: 'Book',
  components: {Icon, Loading},
  data () {
    return {
      init: false,
      sortAsc: true,
      link: {
        type: '',
        bookId: ''
      },
      book: {
        name: '',
        author: '',
        cover: '',
        type: '',
        bookId: '',
        chapters: []
      }
    }
  },
  methods: {
    _initFunc (to) {
      if (this.$route.name !== 'book') {
        return
      }
      if (!this.$route.params.type || !this.$route.params.bookId) {
        this.$toast.error('参数错误')
        this.goBack()
        return
      }
      this.link = this.$route.params
      this.getCat()
    },
    async getCat () {
      const ret = await this.http_get('index/cat', this.link)
      if (ret.code !== 200) {
        return null
      }
      this.book = ret.data
      this.init = true
    },
    viewArticle (articleId, index) {
      if (!this.sortAsc) {
        index = this.chapters.length - index - 1
      }
      this.$router.push({
        name: 'article',
        params: {
          type: this.book.type,
          bookId: this.book.bookId,
          articleId,
          index
        }
      })
    }
  },
  created () {
    this._initFunc(this.$route)
  },
  computed: {
    chapters () {
      let arr = this.book.chapters
      if (!this.sortAsc) {
        arr = arr.reverse()
      }
      return arr
    }
  }

}
</script>

<style scoped>
  .card{
    padding-bottom: 24px;
  }
  .sub-title{
    margin: 10px auto 5px;
    padding-bottom: 5px;
    border-bottom: 1px dashed cornflowerblue;
  }
  .sub-title h3{
    margin: 0;
    padding-left: 3px;
    display: inline-block;
  }
  .sub-title h3:before {
    display: inline-block;
    content: "》";
  }
  .sub-title .right-icon{
    float: right;
  }
.info{
  height: 200px;
  overflow: hidden;
}
.img{
  width: 120px;
  max-height: 200px;
}
  .desc{
    margin-left: 10px;
    height: 100%;
  }
  .desc h3{
    margin: 0;
  }
  .desc ul{
    list-style: none;
    padding-left: 20px;
  }
  .outline{
    overflow-y: auto;
  }
</style>
