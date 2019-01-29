<template>
  <div class="app-content">
    <div class="search-container">
      <mu-form class="form" @keyup.enter.native="search" :class="{active:searchFocus}" :model="form">
        <mu-text-field class="search-input"
                       placeholder="搜索"
                       :actionClick="search"
                       action-icon="search"
                       @focus="searchFocus=true"
                       @blur="searchFocus=false"
                       v-model="form.input"></mu-text-field>
      </mu-form>
    </div>
    <div class="main">
      <Loading v-show="isSearching"></Loading>
      <div v-show="!isSearching">
        <mu-grid-list :cell-height="240">
          <mu-grid-tile @click="viewBook(item.type,item.bookId)" class="book-item" v-for="(item, index) in dataList" :key="index">
            <!--<img :src="item.cover ? item.cover : getDefaultImg()" >-->
            <book-img
              width="100%" height="100%"
              :img="item.cover"
              :book-name="item.name"
              :author="item.author" />
            <span slot="title">{{item.name}}</span>
            <span slot="subTitle">作者 <b>{{item.author}}</b></span>
            <mu-button slot="action" icon>
              <!--<mu-icon value="star_border"></mu-icon>-->
            </mu-button>
          </mu-grid-tile>
        </mu-grid-list>
      </div>
    </div>
  </div>
</template>

<script>

import Loading from '../components/Loading'
import BookImg from '../components/BookImg'

export default {
  name: 'Search',
  components: {BookImg, Loading},
  data () {
    return {
      form: {
        input: ''
      },
      searchParams: {
        key: '',
        p: 1
      },
      searchFocus: true,
      dataList: [],
      isSearching: false
    }
  },
  methods: {
    async search () {
      const k = this.form.input
      if (k && k !== this.searchParams.key) {
        this.searchParams = {
          key: k,
          p: 1
        }
        this.isSearching = true
        const ret = await this.http_get('index/search', this.searchParams)
        this.isSearching = false
        if (ret.code === 200) {
          this.dataList = ret.data
        }
      }
    },
    viewBook (type, bookId) {
      this.$router.push({
        name: 'book',
        params: {type, bookId}
      })
    }
  },
  watch: {
    searchFocus (v) {
      if (v === false) {
        this.search()
        this.setTitle('搜索 - ' + this.form.input)
      }
    }
  }
}
</script>

<style scoped>
  .search-container{
    position: fixed;
    top:0;
    right: 0;
    left: 0;
    height: 63px;
    z-index: 999;
    background: white;
  }
  .form {
    position: relative;
    width: 90%;
    margin: 10px auto 5px;
    display: flex;
    animation: inputBlur 200ms ease-in-out;
  }
  .active {
    width: 80%;
    margin: 20px auto;
    animation: inputFocus 200ms ease-in-out;
  }
  @keyframes inputFocus {
    from {
      width: 90%;
      margin: 10px auto 5px;
    }
    to {
      width: 80%;
      margin: 20px auto;
    }
  }
  @keyframes inputBlur {
    from {
      width: 80%;
      margin: 20px auto;
    }
    to {
      width: 90%;
      margin: 10px auto 5px;
    }
  }
  .search-input {
    display: flex;
    margin-bottom: 0;
    flex: 1;
  }
  .main{
    margin-top: 65px;
    text-align: center;
  }
  .searching {
    margin: 5px 0 0 10px;
    display: inline-block;
  }
  .book-item {
    text-align: left;
  }
</style>
