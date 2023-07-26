<template>
    <view>
        <view class="tou">
            <image src="../../static/rentou.png"></image>
            <button @click="login">一键登录</button>
            <text>登录后尽享更多权益</text>
        </view>
    </view>
</template>

<script>
     import { mapMutations } from 'vuex'
     import { BASE_URL } from "../../common/api.js"
     
    export default {
        data() {
            return {
                nickName:'',
                avatarUrl:"",
                code:''
            };
        }, 
        methods:{
             ...mapMutations('m_user',['updateToken','updateUserInfo']),
             ...mapMutations('m_shoucang',['updateShouCang']),
             ...mapMutations('m_cart',['initCart']),
            login(){
                let that = this
                uni.getUserProfile({
                    desc:'登录后可同步数据',
                    lang: 'zh_CN',
                    success:async(obj)=>{
                        that.nickName = obj.userInfo.nickName //微信昵称
                        that.avatarUrl = obj.userInfo.avatarUrl //微信头像
                        uni.login({
                            provider:'weixin',
                            success:(res)=>{
                                that.code = res.code
                                if(res.errMsg == 'login:ok'){
                                    let params = {
                                        code:that.code,
                                        nickName:that.nickName,
                                        avatarUrl:that.avatarUrl
                                    }
                                    uni.request({
                                        url: BASE_URL + '/api/login',
                                        method:'POST',
                                        data:{ ...params },
                                        success:(res) => {
                                            let data = res.data.data[0]
                                            this.updateToken(data.token)
                                            this.updateUserInfo({userId:data.id,nickName:that.nickName,avatarUrl:that.avatarUrl})
                                            this.getShouCang(data.id)
                                            this.getCartList(data.id)
                                        },
                                        fail:()=>{},
                                        complete: () => {}
                                    })
                                }
                            }
                        })
                    },
                    fail:()=>{
                        uni.showToast({
                            title:"授权已取消",
                            icon:'error',
                            mask:true
                        })
                    },
                    complete: () => {}
                })
            },
            //获取用户收藏数据，登录成功时调用
            getShouCang(user_id){
                uni.request({
                    url: BASE_URL + '/api/getShouCang',
                    method:'POST',
                    data:{ user_id },
                    success:(res) => {
                        let shoucang = (res.data && res.data.map(item=>item.good_id)) || []
                        this.updateShouCang(shoucang)
                    },
                    fail:()=>{},
                    complete: () => {}
                })
            },
            //获取用户购物车数据，登录成功时调用
            getCartList(user_id){
                uni.request({
                    url: BASE_URL + '/api/getCartList',
                    method:'get',
                    data:{ user_id },
                    success:(res) => {
                        let cart = res.data.map(item=>{
                            return{
                                good_id:item.good_id,
                                good_price:item.good_price,
                                amount:item.amount
                            }
                        })
                        this.initCart(cart)
                    },
                    fail:()=>{},
                    complete: () => {}
                })
            }
        }
    }
</script>

<style lang="scss">
.tou{
    margin-top:280rpx;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    image{
        margin:0 auto;
        width:180rpx;
        height:180rpx;
    }
    button{
        margin:60rpx 80rpx 10rpx;
        line-height:80rpx;
        border-radius:40rpx;
        color:white;
        background-color: #C00000;
    }
    text{
        text-align:center;
        font-size: 12px;
    }
}
</style>
