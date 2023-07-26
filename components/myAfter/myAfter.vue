<template>
    <view class="pageBox">
        <view class="head">
            <image :src="userInfo && userInfo.avatarUrl" class="touxiang"></image>
            <view class="nickName">{{userInfo && userInfo.nickName}}</view>
        </view>
        <view class="content">
           <view class="first">
               <view class="first_item" @click="jumpGuanZhu">
                   <text class="textNumber">0</text>
                   <text class="textName">关注的店铺</text>
               </view>
               <view class="first_item" @click="jumpShouCang">
                   <text class="textNumber">{{ shoucang&&shoucang.length || 0}}</text>
                   <text class="textName">收藏的商品</text>
               </view>
           </view>
           <view class="second">
               <text style="width:100%;border-bottom:1px solid lightgray;font-size:14px;display:inline-block;margin-bottom:26px;">我的订单</text>
               <view class="second_content">
                   <view class="secondItem">
                       <image src="/static/daifukuan.png"></image>
                       <text>待付款</text>
                   </view>
                   <view class="secondItem">
                       <image src="/static//daishouhuo.png"></image>
                       <text>待收货</text>
                   </view>
                   <view class="secondItem">
                       <image src="/static/tui.png"></image>
                       <text>退款/退货</text>
                   </view>
                   <view class="secondItem">
                       <image src="/static//dingdan.png"></image>
                       <text>全部订单</text>
                   </view>
               </view>
           </view>
           <view class="third">
               <view class="third_item">
                   <text>收货地址</text>
                   <text>&gt;</text>
               </view>
               <view class="third_item" @click="open">
                   <text>关于我们</text>
                   <text>&gt;</text>
               </view>
               <view class="third_item">
                   <text>联系我们</text>
                   <text>&gt;</text>
               </view>
               <view class="third_item" @click="loginOUt">
                   <text>退出登录</text>
                   <text>&gt;</text>
               </view>
           </view>
        </view>
        <aboutWe v-if="showText" @close="close"/>
    </view>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    
    export default {
        data() {
            return {
                showText:false
            }
        },
        computed:{
            ...mapState('m_user',['userInfo']),
            ...mapState('m_shoucang',['shoucang'])
        },
        methods: {
            ...mapMutations('m_user',['updateToken','updateUserInfo']),
            ...mapMutations('m_shoucang',['updateShouCang']),
            ...mapMutations('m_cart',['initCart']),
            async loginOUt(){
                let  [err,success] = await uni.showModal({
                    title:"提示",
                    content:"是否确认退出登录？"
                }).catch(err => err)
                if(success && success.confirm){
                    this.updateToken('')
                    this.updateUserInfo({})
                    this.updateShouCang([])
                    this.initCart([])
                }
            },
            //跳转收藏的商品列表
            jumpShouCang(){
                uni.navigateTo({
                    url:`/subPackages/shoucang_list/shoucang_list?user_id=${this.userInfo.userId}`
                })
            },
            //跳转关注的店铺列表
            jumpGuanZhu(){
                uni.navigateTo({
                    url:`/subPackages/guanzhu_list/guanzhu_list?user_id=${this.userInfo.userId}`
                })
            },
            open(){
                this.showText = true
            },
            //关闭
            close(){
                this.showText = false
            }
        }
    }
</script>

<style lang="scss">
    .pageBox{
        height:100vh;
        background-color: ghostwhite;
    }
   .head{
        width:100%;
        height:400rpx;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #c00000;
        .touxiang{
            width:160rpx;
            height:160rpx;
            border-radius:50%;
        }
        .nickName{
            margin-top:10rpx;
            font-size: 14p;
            color:white;
        }
    }
    .content{
        margin:0 50rpx;
        word-break: break-all;
        position:relative;
        top:-50rpx;
        // background-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .first{
            width:100%;
            height:100rpx;
            border-radius: 10px;
            background-color: white;
            display: flex;
            justify-content: space-around;
            align-items:center;
            .first_item{
                display:flex;
                flex-direction: column;  
                align-items:center;
                .textNumber{
                    font-size:12px;
                }
                .textName{
                    font-size:12px;
                }
            }
        }
        .second{
            box-sizing:border-box;
            margin:10px 0;
            background-color: white;
            width:100%;
            padding:5px;
            .second_content{
                display:flex;
                width:100%;
                height:120rpx;
                .secondItem{
                    display:flex;
                    font-size:12px;
                    justify-content:space-around;
                    align-items: center;
                    width:25%;
                    flex-direction: column;
                    image{
                        width:70rpx;
                        height:70rpx;
                        margin-bottom:5px;
                    }
                }
            }
        }
        .third{
            padding:5px;
            box-sizing: border-box;
            background-color: white;
            width:100%;
            .third_item{
                display:flex;
                justify-content:space-between;
                width:100%;
                line-height:80rpx;
                font-size:14px;
            }
        }
    }

</style>
