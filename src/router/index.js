import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Search from '@/pages/Search'
import Book from '@/pages/Book'
import Article from '@/pages/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/book/:type/:id',
      name: 'book',
      component: Book
    },
    {
      path: '/article/:type/:bookId/:articleId',
      name: 'article',
      component: Article
    }
  ]
})
