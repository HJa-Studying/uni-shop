<template>
    <view>
       <!-- 轮播图 -->
       <swiper class="banner" :indicator-dots="true" :interval="3000" :autoplay="true" :duration="1000" :circular="true">
           <swiper-item @click="preview(item.id)" class="banner_item" v-for="item in bannerImages" :key="item.id">
               <view class="banner_item_nav" :url="'/subPackages/goods_detail/goods_detail'">
                   <image :src="item.url"></image>
               </view>
           </swiper-item>
       </swiper>
       <view class="content">
           <view class="content_left">
               <view style="color:red;font-weight:500;font-size:24px;">￥{{good_detail.price | fixed}}</view>
               <view class="content_detail">{{ good_detail.name }}</view>
               <view style="font-size:12px;color:gray;">快递：免运费</view>
           </view>
           <view class="content_right" @click="shouchang()">
            <image v-if="!actived" src="../../static/xing.png"></image>
            <image v-else src="../../static/xing_actived.png"></image>
               <view style="font-size:14px;color:gray;">收藏</view>
            </view>
       </view>
    <!--  <view style="padding-bottom:120rpx;">
          <view>
              <image src="/static/goods/three.jpg"></image>
          </view>
          <view>
              <image src="/static/goods/three.jpg"></image>
          </view>
          <view>
              <image src="/static/goods/three.jpg"></image>
          </view>
      </view> -->
       <view class="foot" v-if="good_detail.isShow">
           <view class="left">
               <view class="left_item" @click="jumpShop">
                   <van-icon name="shop-o" class="left_item_image" size="50rpx"/>
                   <!-- <image src="/static/tab_icons/cart.png" class="left_item_image"></image> -->
                   <view style="text-align:center;font-size:14px;">店铺</view>
               </view>
               <view class="left_item" @click="jumpCart">
                   <van-icon name="cart-o" class="left_item_image" size="50rpx"/>
                   <!-- <image src="/static/tab_icons/cart.png" class="left_item_image"></image> -->
                   <view style="text-align:center;font-size:14px;">购物车</view>
               </view>
           </view>
           <view class="right">
           <button class="right_left" @click="insertCart">加入购物车</button>
           <button class="right_right">立即购买</button>
           </view>
       </view>
    </view>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import { BASE_URL } from "../../common/api.js"
    
    export default {
        data() {
            return {
                // actived:false,//收藏
                good_detail:{}
            };
        },
        computed:{
            ...mapState('m_user',['userInfo']),
            ...mapState('m_shoucang',['shoucang']),
            ...mapState('m_cart',['cart']),
            //过滤获取商品轮播图
            bannerImages(){
                return this.good_detail.img_url && ((this.good_detail.img_url).split(',')).map((item,index) => {
                    return { id:index,url:item}
                })
            },
            actived(){
                return this.shoucang && this.shoucang.indexOf(this.good_detail.id) != -1
            },
            goodCartAmount(){
                return this.cart && (this.cart.filter(item=>item.good_id == this.good_detail.id)).length && (this.cart.filter(item=>item.good_id == this.good_detail.id))[0].amount
            }
        },
        filters:{
            fixed(number){
                return number && number.toFixed(2)
            }
        },
        methods:{
            ...mapMutations('m_shoucang',['updateShouCang']),
            ...mapMutations('m_cart',['addToCart']),
            preview(i){
                uni.previewImage({
                    current:i,
                    urls:this.bannerImages.map(x=>x.url)
                })
            },
            //收藏
            shouchang(){
                if(!(this.userInfo && this.userInfo.userId)){
                    uni.showToast({
                        title:"请先登录",
                        icon:"error", 
                        duration:1500
                    })
                    return   
                }
                if(this.actived){
                    //取消
                    uni.request({
                        url: BASE_URL + "/api/cancelShouCang",
                        method:"POST",
                        data:{
                            user_id:this.userInfo.userId,
                            good_id:this.good_detail.id
                        },
                        success:(res)=>{
                            this.updateShouCang(this.shoucang.filter(item => item != this.good_detail.id))
                        },
                        fail: (err) => {
                            console.log("err",err)
                        }
                    })
                }else{
                    //加入
                   uni.request({
                       url: BASE_URL + "/api/insertShouCang",
                       method:"POST",
                       data:{
                           user_id:this.userInfo.userId,
                           good_id:this.good_detail.id
                       },
                       success:(res)=>{
                           this.updateShouCang([...this.shoucang,this.good_detail.id])
                       },
                       fail: (err) => {
                           console.log("err",err)
                       }
                   })
                }
            },
            //加入购物车
            insertCart(){
                if(!(this.userInfo && this.userInfo.userId)){
                    uni.showToast({
                        title:"请先登录",
                        icon:"error",
                        duration:1500
                    })
                    return   
                }
                let url = BASE_URL + this.goodCartAmount ? "/api/updateCart" : "/api/insertCart"
                uni.request({
                    url,
                    method:"GET",
                    data:{
                        good_id:this.good_detail.id,
                        user_id:this.userInfo.userId,
                        amount: this.goodCartAmount + 1
                    },
                    success:(res)=>{
                        uni.showToast({
                            title:"成功加入购物车",
                            position:"bottom",
                            icon:"none",
                            duration:1000
                        })
                        this.addToCart({
                            good_id:this.good_detail.id,
                            good_price:this.good_detail.price,
                            amount: this.goodCartAmount || 1
                        })
                    },
                    fail: (err) => {
                        console.log("err",err)
                    }
                })
            },
            //跳转店铺
            jumpShop(){
                uni.navigateTo({
                    url:"/subPackages/shop/shop"
                })
            },
            //跳转购物车
            jumpCart(){
                uni.navigateTo({
                    url:"/subPackages/cart_sub/cart_sub"
                })
            },
            //获取商品详情
            getGoodDetail(id){
                uni.showLoading({
                    title:"加载中...",
                    mask:true
                })
                uni.request({
                    url: BASE_URL + "/api/getGoodDetail",
                    method:"GET",
                    data:{id},
                    success:(res)=>{
                        this.good_detail = res.data[0]
                    },
                    fail: (err) => {
                        console.log("err",err)
                    },
                    complete: () => {
                        uni.hideLoading()
                    }
                })
            }
        },
        onLoad(option) {
            this.getGoodDetail(option.id)
        }
    }
</script>

<style lang="scss">
.banner{
    width:100%;
    height:420rpx;
    
   .banner_item {
        width:100%;
        height:100%;
        
        .banner_item_nav {
            width:100%;
            height:100%;
            
            image {
                width: 100%;
                height:100%;
            }
        }
    }
} 
.content{
    box-sizing: border-box;
    padding:15px 10px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content_left{
        width:80%;
        height:100%;
        .content_detail{
            margin:10rpx 0 30rpx;
            display:-webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size:16px;
        }
    }
    .content_right{
        width:20%;
        height:100%;
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        image{
            width:60rpx;
            height:60rpx;
            margin-bottom:5px;
        }
    }
}
.foot{
    width:100%;
    height:100rpx;
    position:fixed;
    bottom:0;
    background-color: white;
    display: flex;
    .left{
        width:30%;
        height:100%;
        display:flex;
        .left_item{
            dispaly:flex;
            width:50%;
            height:100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .left_item_image{
                margin-left:27rpx;
                width:50rpx;
                height:50rpx;
            }
        }
    }
    .right{
        width:70%;
        height:100%;
        display:flex;
        align-items: center;
        .right_left{
            width:50%;
            height:80%;
            color:white;
            background-color: red;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            display:flex;
            align-items: center;
            justify-content: center;
        }
        .right_right{
            width:50%;
            height:80%;
            color:white;
            background-color: orange;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            display:flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
