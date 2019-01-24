<script>
export default {
  name: 'BookImg',
  data () {
    return {
      src: '',
      isImg: true
    }
  },
  props: [
    'img',
    'bookName',
    'author',
    'width',
    'height'
  ],
  render (createElement) {
    if (this.author || this.bookName) {
      this.isImg = false
    }
    let conf = {
      style: {
        width: this.width,
        height: this.height
      },
      on: {
        click: () => {
          this.$emit('click')
        }
      }
    }
    if (this.isImg) {
      let src = this.src
      if (!src) {
        src = this.getDefaultImg()
      }
      return createElement('img', {
        attrs: {
          src
        },
        ...conf
      })
    } else {
      let bookName = this.bookName ? this.bookName : ''
      let author = this.author ? this.author : '佚名'
      return createElement('div', {
        ...conf,
        'class': 'book'
      }, [
        createElement('p', {
          'class': 'name'
        }, `${bookName}`),
        createElement('p', {
          'class': 'author'
        }, `${author}`)
      ])
    }
  }
}
</script>

<style scoped>
.book{
  display: inline-block;
  text-align: center;
  background-color: #f1eace;
  border-color: antiquewhite;
  border-radius: 8px 2px 2px 5px;
  position: relative;
  box-shadow: 2px 2px #7d7c7759;;
}
  .book .name{
    width: 80%;
    margin: 10px auto;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
  }
  .book .author{
    position: absolute;
    bottom: 20px;
    right: 20px;
    margin: 0;
    font-style: italic;
    border-bottom: 1px solid gray;
    font-size: 12px;
    line-height: 14px;
  }
</style>
