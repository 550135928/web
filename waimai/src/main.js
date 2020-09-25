// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/goods/goods.vue'
import Seller from './components/seller/seller.vue'
import Ratings from './components/ratings/ratings.vue'

import './common/stylus/all.styl'
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/goods', component: Goods },
  { path: '/seller', component: Seller },
  { path: '/ratings', component: Ratings }
]
const router = new VueRouter({
  routes
})
// router.go('/goods')
new Vue({
  template: '<App/>',
  router,
  components: {App},
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
