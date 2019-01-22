<template>
  <div class="app-content">
    <div class="search-container">
      <mu-form class="form" :class="{active:searchFocus}" :model="form">
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
      <div class="searching" v-show="isSearching">
        <mu-icon size="36" :value="loadingIcon" color="green"></mu-icon>
      </div>
      <div v-show="!isSearching">
        <mu-grid-list :cell-height="240">
          <mu-grid-tile @click="viewBook(item.link)" class="book-item" v-for="(item, index) in dataList" :key="index">
            <img :src="item.img ? item.img : getDefaultImg()" >
            <span slot="title">{{item.title}}</span>
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

export default {
  name: 'Search',
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
      isSearching: false,
      loadingIcon: 'border_bottom'
    }
  },
  methods: {
    async search () {
      console.log('search')
      const k = this.form.input
      if (k && k !== this.searchParams.key) {
        this.searchParams = {
          key: k,
          p: 1
        }
        this.isSearching = true
        const ret = await this.http_get('index/search', this.searchParams)
        if (ret.code === 200) {
          this.dataList = ret.data
          this.isSearching = false
        }
      }
    },
    viewBook (params) {
      console.log(params)
      this.$router.push({
        path: 'Book',
        params: params
      })
    }
  },
  watch: {
    searchFocus (v) {
      if (v === false) {
        this.search()
      }
    }
  },
  created () {
    let t = 0
    const arr = ['border_bottom', 'border_left', 'border_top', 'border_right', 'border_inner', 'border_outer']
    setInterval(() => {
      t++
      if (t === arr.length) {
        t = 0
      }
      this.loadingIcon = arr[t]
    }, 1000)

    console.log(this.$img)
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
