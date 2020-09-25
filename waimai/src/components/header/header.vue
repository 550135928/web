<template>
  <div class="header">
    <div class="content-wrap">
    	<div class="avatar">
    		<img :src='seller.avatar' width="64" height="64">
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="detail">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div class="support" v-if='seller.supports'>
    			<span class="icon" :class='classMap[seller.supports[0].type]'></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<div class="contentNumber" v-if='seller.supports' v-on:click='showMoreInfo'>
    	  <span>{{seller.supports.length}}个</span>
    	  <i class="icon-keyboard_arrow_right"></i>
    	</div>
    </div>
    <div class="announce" v-on:click='showMoreInfo'> 
    	<span class="announce-image"></span><span class="announce-text">{{seller.bulletin}}</span>
    	<i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background"><img :src="seller.avatar" width="100%" height="100%"></div>
    <transition name='fade'>
    	<div v-if='moreInfoShow' class="moreInfo">
    		<div class="moreInfo-wrap clearfix">
    			<div class="moreInfo-main">
    				<h1>{{seller.name}}</h1>
    				<div class="star-wrap"><star :size='48' :score='seller.score'></star></div>
    				<div class="title">
    					<div class="line"></div>
    					<div class="text">优惠信息</div>
    					<div class="line"></div>
    				</div>
    				<ul class="supports" v-if='seller.supports'>
    					<li v-for='item in seller.supports' class="support-item">
    						<span class='icon' :class='classMap[item.type]'></span>
    						<span class='text'>{{item.description}}</span>
    					</li>
    				</ul>
    				<div class="title">
    					<div class="line"></div>
    					<div class="text">商家公告</div>
    					<div class="line"></div>
    				</div>
    				<div class="moreInfo-announce"><p>{{seller.bulletin}}</p></div>
    			</div>
    		</div>
    		<div class="moreInfo-close" v-on:click='hideMoreInfo'>
    			<i class="icon-close"></i>
    		</div>
    	</div>
    </transition>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        moreInfoShow: false
      }
    },
    methods: {
      showMoreInfo () {
        this.moreInfoShow = true
      },
      hideMoreInfo () {
        this.moreInfoShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'special']
    },
    components: {
      star
    }
  }
</script>

<style lang='stylus' type='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl'
  .header
    color:#fff
    position:relative
    background: rgba(7, 17, 27, 0.5)
    overflow:hidden
    .background
      width:100%
      height:100%
      position:absolute
      top:0
      left:0
      filter:blur(10px)
      z-index:-1
    .fade-enter-active, .fade-leave-active
      transition: all .5s
    .fade-enter, .fade-leave-active 
      opacity: 0
      background:rgba(7,17,27,0)
    .moreInfo
      background:rgba(7,17,27,.8)
      position:fixed
      top:0
      left:0
      backdrop-filter: blur(10px)
      z-index:100
      width:100%
      height:100%
      .moreInfo-wrap
        min-height:100%
        width:100%
        .moreInfo-main
          margin-top:64px
          padding-bottom:64px
          h1
            font-size:16px
            line-height:16px
            font-weight:700
            text-align:center
          .star-wrap
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            margin:28px auto 24px
            width:80%
            .line
              position:relative
              flex:1
              top:-6px
              border-bottom:1px solid rgba(255,255,255,.2)
            .text
              padding:0 12px
              font-weight: 700
              font-size: 14px 
           .supports
             width:80%
             margin:0 auto
             .support-item
               padding:0 12px
               margin-bottom:12px
               &:last-child
                 margin-bottom:0
               .icon
                 display:inline-block
                 width:16px
                 background-size:16px 16px
                 background-repeat:no-repeat
                 height:16px 
                 margin-right:6px
                 &.decrease
                  bg-image('decrease_2')
                 &.discount
                  bg-image('discount_2')
                 &.guarantee
                  bg-image('guarantee_2')
                 &.invoice
                  bg-image('invoice_2')
                 &.special
                  bg-image('special_2')
               .text
                 font-size:12px
                 vertical-align:top
                 line-height:12px
                 font-weight:200 
           .moreInfo-announce
             width:80%
             margin:0 auto
             p
               padding:0 12px
               font-size:12px
               line-height:24px
               font-weight:200                
      .moreInfo-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0
        font-size:32px
        clear:both
    .content-wrap
      padding:24px 12px 18px 24px
      position:relative
      font-size:0
      .avatar
        vertical-align:top
        display:inline-block
        border-radius:2px
      .content
        display:inline-block
        margin-left:16px  
        .title
          margin-top:2px
          .brand
            bg-image('brand')
            vertical-align:top
            width:30px
            height:18px
            background-size:30px 18px
            background-repeat:no-repeat
            display:inline-block
          .name
            display:inline-block
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight:bold
        .detail
          font-size:12px
          margin-top:8px
          font-weight:bold
          line-height:12px
        .support
          margin-top:10px
          font-size:10px
          .icon
            width:12px
            height:12px
            display:inline-block
            background-size:12px 12px
            background-repeat:no-repeat
            vertical-align:top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.invoice
              bg-image('invoice_1')
     	    &.special
              bg-image('special_1')
            &.guarantee
              bg-image('guarantee_1')
          .text
            margin-left:4px
            font-weight:200
            line-height:12px
      .contentNumber
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        background:rgba(0,0,0,.2)
        text-align:center
        border-radius:14px
        span
          font-size:10px
          font-weight:200
          vertical-align:top
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .announce
      position:relative
      height:28px
      line-height:28px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      padding:0 22px 0 12px
      background:rgba(7,17,27,.2)
      .announce-image
        display:inline-block
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repeat
      .announce-text
        font-size:10px
        font-weight:200
        vertical-align:top
        margin:0 4px
      .icon-keyboard_arrow_right
        position:absolute
        font-size: 10px
        right:12px
        top:8px
</style>