<template>
  <div class="goods">
     <div class="menu-wrap" ref='menuWrap'>
     	<ul>
     		<li v-for='(item,index) in goods' class="menu-item" :class="{'current':index===currentIndex}" v-on:click='selectMenu(index,$event)'>
     			<span class="text">
     			<span class="icon" v-if='item.type > 0' :class='classMap[item.type]'></span>
     			{{item.name}}</span>
     		</li>
     	</ul>
     </div>
     <div class="foods-wrap" ref='foodsWrap'>
     	<ul>
     		<li v-for='item in goods' class="food-list food-list-hook">
     			<h1 class="title">{{item.name}}</h1>
     			<ul class="item-wrap">
     				<li v-for='food in item.foods' class="food-item" @click='selectFood(food,$event)'>
     					<div class="icon">
     						<img :src="food.icon" width="57" height="57">
     					</div>
     					<div class="content">
     						<h2 class="name">{{food.name}}</h2>
     						<p class="desc">{{food.description}}</p>
     						<div class="extra">
     							<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
     						</div>
     						<div class="price">
     							<span class="newPrice">￥{{food.price}}</span><span v-show='food.oldPrice' class="oldPrice">￥{{food.oldPrice}}</span>
     						</div>
     						<div class="cart-wrap">
     							  <cartcontrol :food='food'></cartcontrol>
     						</div>
     					</div>
     				</li>
     			</ul>
     		</li>
     	</ul>
     </div>
     <shopcart ref='shopcart' :select-foods='selectFoods' :delivery='seller.deliveryPrice' :minPrice='seller.minPrice'></shopcart>
     <food :food='selectedFood' ref='food'></food>
  </div>
</template>

<script>
 import BScroll from 'better-scroll'
 import shopcart from '../shopcart/shopcart'
 import cartcontrol from '../cartcontrol/cartcontrol'
 import food from '../food/food'
 export default {
   props: {
     seller: {
       type: Object
     }
   },
   data () {
     return {
       goods: [],
       listHeight: [],
       scrollY: 0,
       selectedFood: {}
     }
   },
   created () {
     this.classMap = ['decrease', 'discount', 'special', 'invoice', 'special']
     this.$http.get('/api/goods').then((response) => {
       response = response.body
       if (response.errno === 0) {
         this.goods = response.data
         this.$nextTick(() => {
           this._initScroll()
           this._calculateHeight()
         })
       }
     })
     this.$root.eventHub.$on('cartAdd', this._drop)
   },
   methods: {
     _initScroll () {
       this.menuScroll = new BScroll(this.$refs.menuWrap, {
         click: true
       })
       this.foodScroll = new BScroll(this.$refs.foodsWrap, {
         click: true,
         probeType: 3
       })
       this.foodScroll.on('scroll', (pos) => {
         this.scrollY = Math.abs(Math.round(pos.y)) + 1
       })
     },
     selectFood (food, event) {
       if (!event._constructed) {
         return
       }
       this.selectedFood = food
       this.$refs.food.show()
     },
     _drop (target) {
       this.$nextTick(() => {
         this.$refs.shopcart.drop(target)
       })
     },
     _calculateHeight () {
       let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook')
       let height = 0
       this.listHeight.push(height)
       for (let i = 0; i < foodList.length; i++) {
         let item = foodList[i]
         height += item.clientHeight
         this.listHeight.push(height)
       }
     },
     selectMenu (index, event) {
       if (!event._constructed) {
         return
       }
       let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook')
       let el = foodList[index]
       this.foodScroll.scrollToElement(el, 300)
     }
   },
   computed: {
     currentIndex () {
       for (let i = 0; i < this.listHeight.length; i++) {
         let height1 = this.listHeight[i]
         let height2 = this.listHeight[i + 1]
         if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
           return i
         }
       }
       return 0
     },
     selectFoods () {
       let foods = []
       this.goods.forEach((good) => {
         good.foods.forEach((food) => {
           if (food.count) {
             foods.push(food)
           }
         })
       })
       return foods
     }
   },
   components: {
     shopcart,
     cartcontrol,
     food
   }
 }
</script>

<style lang='stylus' type='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl'
  .goods
    position:absolute
    top:174px
    bottom:58px
    overflow:hidden
    display:flex
    .menu-wrap
      flex:0 0 80px
      width:80px
      background:#f3f5f7
      .menu-item
        width:56px
        display:table
        height:54px
        padding:0 12px
        &.current
          position:relative
          margin-top:-1px
          z-index:10
          background:#fff
          font-weight:700
        .text
          border-1px(rgba(7,17,27,.1))
          font-size:12px
          line-height:14px
          font-weight:200
          display:table-cell
          vertical-align:middle
          color:rgb(77,85,93)
          .icon
            display: inline-block
            vertical-align: middle
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')  
    .foods-wrap
      flex:1
      .title
        height:26px
        line-height:26px
        font-size:12px
        color:rgb(147,153,159)
        padding-left:14px
        border-left:2px solid #d9dde1
        background:#f3f5f7
      .item-wrap
        padding:0 18px    
        .food-item
          padding:18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          display:flex
          &:last-child
            border-none()
          .icon
            flex:0 0 57px
            margin-right:10px
          .content  
            flex:1
            .name
              color:rgb(7,17,27)
              font-size:14px
              line-height:14px
              margin-top:2px
            .desc
              margin:8px 0
              font-size:10px
              line-height:12px
              color:rgb(147,153,159)
            .extra
              font-size:10px
              line-height:10px
              color:rgb(147,153,159)
              .count
                margin-right:12px
            .price
              line-height:24px
              .newPrice
                font-size:14px
                color:rgb(240,20,20)
                font-weight:700
                margin-right:8px
              .oldPrice 
                font-size:10px
                color:rgb(147,153,159)
                font-weight:normal
                text-decoration:line-through   
            .cart-wrap
              position: absolute
              right: 0
              bottom: 12px       
</style>