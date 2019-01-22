import Vue from 'vue'
import axios from 'axios'

const baseURL = 'http://book.me'

Vue.mixin({
  methods: {

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
      return await this.http_http(config, cb)
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
      return await this.http_http(config, cb)
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
        console.log(E)
        this.$toast.error('网络错误')
      }
    }
  }
})
