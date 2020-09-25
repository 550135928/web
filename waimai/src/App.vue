<template>
  <div id='app'>
     <v-header :seller='seller'></v-header>
     <div class='tab border-1px'>
       <router-link to="/goods">商品</router-link>
       <router-link to="/ratings">评价</router-link>
       <router-link to="/seller">商家</router-link>
     </div>
     <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
 import header from './components/header/header.vue'
 export default {
   data () {
     return {
       seller: {}
     }
   },
   created () {
     this.$http.get('/api/seller').then((response) => {
       response = response.body
       if (response.errno === 0) {
         this.seller = response.data
       }
     })
   },
   components: {
     'v-header': header
   }
}
</script>

<style lang='stylus' type='stylesheet/stylus'>
  @import "./common/stylus/mixin.styl"
  .tab
    width:100%
    display:flex
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,.1))
    a
      flex:1
      text-align:center
      font-size:14px
      color:rgb(77,85,93)
      display:block
    a.router-link-active
      color:rgb(240,20,20)
</style>
