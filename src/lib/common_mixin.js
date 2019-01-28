import Vue from 'vue'
import axios from 'axios'

const baseURL = 'http://book.me'

const img = require('@/assets/book.png')

Vue.mixin({
  methods: {
    /**
     * 获取默认图片
     * @returns {*}
     */
    getDefaultImg () {
      return img
    },

    search () {
      this.$router.push({
        name: 'search'
      })
    },

    /**
     * 获取本地配置
     * @param key string 键
     * @param def 默认值
     * @returns {string}
     */
    getConf (key, def = '') {
      const r = window.localStorage.getItem(key)
      if (r) {
        return r
      } else {
        return def
      }
    },

    /**
     * 设置本地存储
     * @param key
     * @param value
     */
    setConf (key, value) {
      window.localStorage.setItem(key, value)
    },

    /**
     * 返回上一页
     */
    goBack () {
      this.$router.back()
    },

    goIndex () {
      this.$router.push({
        path: '/'
      })
    },

    setTitle (title) {
      document.title = title
    },

    /**
     * get 请求
     * @param path uri
     * @param data 参数
     */
    async http_get (path, data = {}, cb = null) {
      let config = {
        method: 'get',
        url: path,
        params: data
      }
      return this.http_http(config, cb)
    },

    /**
     * post 请求
     * @param path
     * @param data
     * @param cb
     */
    async http_post (path, data, cb = null) {
      let config = {
        method: 'post',
        url: path,
        data: data
      }
      return this.http_http(config, cb)
    },

    async http_http (config, cb) {
      config.baseURL = baseURL
      config.responseType = 'json'
      config.headers = {
        'Accept': 'application/json'
      }

      try {
        const response = await axios(config)

        if (response.status === 200) {
          let ret = response.data
          // 判断是否有 code
          if (typeof ret.code !== 'undefined') {
            switch (ret.code) {
              case 200: {
                if (typeof cb === 'function') {
                  cb(response.data)
                } else {
                  // 返回promise
                  return new Promise((resolve, reject) => {
                    resolve(response.data)
                  })
                }
                break
              }
              default: {
                if (typeof ret.msg !== 'undefined') {
                  this.$toast.error(ret.msg)
                }
              }
            }
          } else {
            // 没有状态码 直接处理回调函数
            if (typeof cb === 'function') {
              cb(response.data)
            } else {
              // 返回promise
              return new Promise((resolve, reject) => {
                console.log(response.data)
                resolve(response.data)
              })
            }
          }
        } else {
          this.$toast.error('Http 状态码错误')
        }
      } catch (E) {
        this.$toast.error({
          message: JSON.stringify(E),
          time: 100000000
        })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (typeof this._initFunc === 'function') {
        this._initFunc(to, from)
      }
    }
  }
})
