<template>
    <view>
        <view v-if="!cartList.length" class="first">
            <image src="/static/kongche.png"></image>
            <view style="font-size: 14px;color:gray;">购物车还空荡荡</view>
        </view>
        <view v-else>
              <view class="header">购物车({{cartList.length}})</view>
            <scroll-view class="scrollView">
              <view class="good" v-for="(item,index) in cartList" :key="index">
                    <view class="good_state" @click="updateGoodState(item.good_id)">
                        <van-icon size="40rpx" name="checked" color="orange" v-if="cart[index].good_state"/>
                        <van-icon size="40rpx" name="circle" v-else/>
                    </view>
                    <view class="good_img" @click="jumpGoodDetail(item)">
                        <image :src="item.good_url"></image>
                    </view>
                    <view class="good_text">
                        <text class="good_de" @click="jumpGoodDetail(item)">{{item.good_name}}</text>
                        <view style="display: flex;justify-content: space-between;align-items: center;">
                            <text class="good_price" @click="jumpGoodDetail(item)">￥{{(item.good_price).toFixed(2)}}</text>
                            <van-stepper v-model="item.amount" @change="updateGoodAmount($event,item)"/>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <view class="cart_foot">
                <view style="display:flex;align-items: center;" @click="updateAllState(!allSelect)">
                    <van-icon size="40rpx" name="checked" color="orange" v-if="allSelect" style="margin-right:15rpx;"/>
                    <van-icon size="40rpx" name="circle" v-else style="margin-right:15rpx;"/>
                    全选
                </view>
                <view style="font-size:12px;width:50%;text-align:end ;">
                    已选<span style="color:orange;font-size: 14px;display: inline-block;padding:5rpx;">{{selectNumer}}</span>件，合计：￥<span style="color:red;font-size: 16px;display: inline-block;padding:5rpx;">{{selectAllPrice.toFixed(2)}}</span>
                </view>
                <button style="margin:0;background-color: orange;color:white;font-weight: 700;">结算</button>
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
                cartList:[],
                checked:false
            };
        },
       computed:{
           ...mapState('m_cart',['cart']),
           ...mapState('m_user',['userInfo']),
           allSelect(){
               return (this.cart.filter(item=>item.good_state)).length === this.cart.length
           },
           selectNumer(){
               return (this.cart.filter(item=>item.good_state)).length
           },
           selectAllPrice(){
               return (this.cart.filter(item=>item.good_state)).reduce((n,item)=>{
                   return n = n + item.amount * item.good_price
               },0)
           }
       },
       methods:{
           ...mapMutations('m_cart',['addToCart','initCart','updateCartGoodState','updateAllState']),
           //跳转商品详情
           jumpGoodDetail(item){
               uni.navigateTo({
                   url:`/subPackages/goods_detail/goods_detail?id=${item.good_id}`
               })
           },
           //获取购物车列表
           getCartList(){
               uni.request({
                   url: BASE_URL + "/api/getCartList",
                   method:"GET",
                   data:{user_id:this.userInfo.userId},
                   success:(res)=>{
                       this.cartList = res.data
                       let cart = res.data.map(item=>{
                           return{
                               good_id:item.good_id,
                               good_price:item.good_price,
                               amount:item.amount
                           }
                       })
                       this.initCart(cart)
                   },
                   fail: (err) => {
                       console.log("err",err)
                   }
               })
           },
           //更改购物车商品数量
           updateGoodAmount(e,item){
               uni.request({
                   url: BASE_URL + "/api/updateCart",
                   method:"GET",
                   data:{
                       good_id:item.good_id,
                       user_id:this.userInfo.userId,
                       amount: e.detail
                   },
                  success:(res)=>{
                      this.addToCart({
                          good_id:item.good_id,
                          good_price:item.good_price,
                          amount: e.detail
                      })
                  },
                  fail: (err) => {
                      console.log("err",err)
                  }
               })
           },
           //勾选购物车
           updateGoodState(id){
               let arr = [id] || []
               this.updateCartGoodState(arr)
           },
           //删除购物车数据
           deleteCart(item){
               uni.request({
                   url: BASE_URL + "/api/deleteCart",
                   method:"GET",
                   data:{
                       // id:[ite]
                   }
               })
               
           }
       },
       onLoad(){
          
       },
       onShow() {
          if(!(this.userInfo && this.userInfo.userId)){
            
          }else{
              this.getCartList()
          } 
       }
    }
</script>

<style lang="scss">
    .header{
        width:100%;
        height:50rpx;
        display: flex;
        align-items: center;
        padding-left:10rpx;
        position: sticky;
        top:0;
        left:0;
        z-index: 999;
        background-color: white;
        font-weight: 700;
    }
.first{
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    image{
        margin-top:300rpx;
        margin-bottom:14rpx;
        width:230rpx;
        height:230rpx;
    }
}
    .good{
        box-sizing: border-box;
        padding:5px;
        width:100%;
        height:200rpx;
        display:flex;
        flex-direction: row;
        .good_state{
            width:10%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .good_img{
            width:30%;
            height:100%;
            image{
                width:100%;
                height:100%;
            }
        }
        .good_text{
            box-sizing: border-box;
            padding:5px;
            width:60%;
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content: space-between; 
            .good_de{
                font-size: 14px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;  
                -webkit-box-orient: vertical;
            }
            .good_price{
                font-weight:700;
                font-size:16px;
                color:#C00000;
            }
        }
    }
    .scrollView{
        padding-bottom:110rpx;
    }
    .cart_foot{
        position: fixed;
        z-index:999;
        bottom:0;
        left:0;
        width:100vw;
        height:110rpx;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: white;
    }
</style>
