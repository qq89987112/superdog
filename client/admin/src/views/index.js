import Vue from 'vue'
import Router from 'vue-router'
import product from './product'

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/product"
    },

    {
      path: '/product',
      name: 'product',
      component: product
    },
  ]
})
