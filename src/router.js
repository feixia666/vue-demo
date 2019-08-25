import Vue from 'vue'
import Router from 'vue-router'


import Goodslist from './views/GoodsList.vue'
import GoodsInfo from './views/GoodsInfo.vue'
import Shopcar from './views/ShopcarContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: Goodslist },
    { path: '/home/goodsinfo/:id', component: GoodsInfo },
    { path: '/shopcar', component: Shopcar }
  

  ]
})
