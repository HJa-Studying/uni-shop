<template>
    <view>
        <view class="nothing" v-if="goodList.length == 0">
            暂无商品收藏
        </view>
        <view v-else>
            <view class="header">共{{goodList.length}}件</view>
            <scroll-view>
                <view class="good" v-for="(item,index) in goodList" :key="index" @longpress="handle(item)" @touchend="judge(item)">
                    <view class="good_img">
                        <image :src="item.img_url"></image>
                    </view>
                    <view class="good_text">
                        <text class="good_de">{{item.name}}</text>
                        <text class="good_price">￥{{(item.price).toFixed(2)}}</text>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import { BASE_URL } from "../../common/api.js"
    
    
    export default {
        data() {
            return {
                  goodList:[],
                  action:true, //true为点击，false为长按
                  user_id:null
                  
            };
        },
        computed:{
            ...mapState('m_shoucang',['shoucang'])
        },
        methods:{
            ...mapMutations('m_shoucang',['updateShouCang']),
            //跳转商品详情
            jumpGoodDetail(item){
                uni.navigateTo({
                    url:`/subPackages/goods_detail/goods_detail?id=${item.good_id}`
                })
            },
            //获取收藏商品列表
            getGoodList(user_id){
                uni.showLoading({
                    title:"加载中...",
                    mask:true
                })
                uni.request({
                    url: BASE_URL + "/api/getShouCangList",
                    method:"GET",
                    data:{user_id},
                    success:(res)=>{
                        this.goodList = res.data
                    },
                    fail: (err) => {
                        console.log("err",err)
                    },
                    complete: () => {
                        uni.hideLoading()
                    }
                })
            },
            handle(item){
                this.action = false
                uni.showActionSheet({
                    itemList:["取消收藏"],
                    success: (res) => {
                        uni.showModal({
                            content:"是否确认取消收藏该商品",
                            success: () => {
                                this.cancelShouCang(item)      
                            }
                        })
                    },
                    complete: () => {
                        
                    }
                })
            },
            judge(item){
                if(this.action){
                    this.jumpGoodDetail(item)
                }
                this.action = true
            },
            //取消收藏
            cancelShouCang(item){
                uni.showLoading({
                    mask:true
                })
                uni.request({
                    url: BASE_URL + "/api/cancelShouCangId",
                    method:"POST",
                    data:{
                        sc_id:item.sc_id
                    },
                    success:(res)=>{
                        this.updateShouCang(this.shoucang.filter(i=> i != item.good_id))
                        this.goodList = this.goodList.filter(i=>i.good_id!=item.good_id)
                    },
                    complete: () => {
                        uni.hideLoading()
                    }
                })
            }
        },
        onLoad(option){
            this.user_id = option.user_id
        },
        onShow() {
            console.log("onshow")
            this.getGoodList(this.user_id)
        }
    }
</script>

<style lang="scss">
 .nothing{
       width:100%;
       margin-top:500rpx;
       display: flex;
       align-items: center;
       justify-content: center;
    }
    .header{
        padding-left:10rpx;
        width:100%;
        height:70rpx;
        position:sticky;
        top:0;
        left:0;
        display: flex;
        align-items: center;
        background-color: white;
        z-index: 999;
    }
    .good{
        box-sizing: border-box;
        padding:5px;
        width:100%;
        height:200rpx;
        display:flex;
        flex-direction: row;
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
            width:70%;
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content: space-between; 
            .good_de{
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
</style>
