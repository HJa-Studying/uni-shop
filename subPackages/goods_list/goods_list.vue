<template>
    <view>
       <!-- 搜索组件 -->
       <view class="search"> 
           <searchInput/>
       </view>
       <scroll-view>
           <view class="good" v-for="(item,index) in goodList" :key="index" @click="jumpGoodDetail(item)">
               <view class="good_img">
                   <image :src="item.img_url"></image>
               </view>
               <view class="good_text">
                   <text class="good_de">{{item.name}}</text>
                   <text class="good_price">￥{{(item.price).toFixed(2)}}</text>
               </view>
           </view>
           <view class="nothing" v-if="goodList.length == 0">
               暂无商品
           </view>
       </scroll-view>
    </view>
</template>

<script>
    import { BASE_URL } from "../../common/api.js"
    
    export default {
        data() {
            return {
                goodList:[]
            };
        },
        methods:{
            //跳转商品详情
            jumpGoodDetail(item){
                uni.navigateTo({
                    url:`/subPackages/goods_detail/goods_detail?id=${item.id}`
                })
            },
            //获取商品列表
            getGoodList(cate_id){
                uni.request({
                    url: BASE_URL + "/api/getGoodList",
                    method:"GET",
                    data:{cate_id},
                    success:(res)=>{
                        this.goodList = res.data
                    },
                    fail: (err) => {
                        console.log("err",err)
                    }
                })
            }
        },
        onLoad(option){
            console.log("option",option)
            this.getGoodList(option.cate_id)
        },
        //下拉
        onPullDownRefresh() {
            this.goodList = [...new Set(this.goodList)]
             uni.stopPullDownRefresh()
        },
        //上拉
        onReachBottom(){
            this.goodList = [...this.goodList,...this.goodList]
        }
    }
</script>

<style lang="scss">
    .search{
        height:100rpx;
        width:100%;
        position:sticky;
        z-index:999;
        top:0;
        left:0;
        background-color:#C00000;
        display:flex;
        justify-content: center;
        align-items:center;
    }
    .nothing{
       width:100%;
       margin-top:500rpx;
       display: flex;
       align-items: center;
       justify-content: center;
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
