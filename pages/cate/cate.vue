<template>
    <view>
        <!-- 搜索组件 -->
        <view class="search">
            <view  @click="jumpSearch()">
                <searchInput :showSearchBtn="false"/>
            </view>
        </view>
        <view class="cate">
            <view class="left">
                <view v-for="(item,index) in goodKind" :key="index" :class="['left_name',index == cateIndex ? 'left_border' : '']" @click="setBorderColor(index)">{{item.kind_name}}</view>
            </view>
            <scroll-view class="right" scroll-y="true" :scroll-top="scrollTop">
              <view class="scrollView" v-for="(item,index) in goodKind" :key="index">  
                  <view class="titleName">/{{item.kind_name}}/</view>
                  <view class="right_item">
                      <view class="item" v-for="(item2,index2) in item.kind_cate" :key="index2" @click="jumpShopList(item2)">
                          <image :src="item2.cate_url"></image>
                          <text>{{item2.cate_name}}</text>
                      </view>
                  </view>
              </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import { BASE_URL } from "../../common/api.js"
    export default {
        data() {
            return {
                cateIndex:0,//当前左侧导航位置
                searchWidth:320,
                scrollTop:0,
                scrollItemTop:[],
                goodKind:[]
            };
        },
        mounted(){
            // this.getSystemInfo()     
            this.getScrollItemTop()
        },
        onLoad() {
            this.getCate()
            this.getSystemInfo()
            // this.getScrollItemTop()
        },
        onshow(){
            // this.getScrollItemTop()
        },
        methods:{
            //获取分类数据
            getCate(){
                uni.request({
                    url: BASE_URL + '/api/cate',
                    method:'GET',
                    success:(res)=>{
                        this.handleCate(res && res.data)
                    }
                })
            },
            //整理分组分类数据
            handleCate(arr){
                if(!arr){
                    this.goodKind = []
                    return
                }
                let kindNames = [...new Set(arr.map(item => item.kind_name ))]
                let kind = []
                kindNames.forEach( nameItem => {
                    kind.push(
                        {
                            kind_name:nameItem,
                            kind_cate: arr.filter( arrItem => arrItem.kind_name == nameItem )
                        }
                    )
                })
                this.goodKind = kind
            },
            getSystemInfo(){
                let sysWidth = uni.getSystemInfoSync()
                this.searchWidth = sysWidth.windowWidth
            },
            // 点击左侧导航，高亮
            setBorderColor(index){
                this.cateIndex = index
                this.scrollTop = this.scrollItemTop[index].top - this.scrollItemTop[0].top
            },
            getScrollItemTop(){
                let a = uni.createSelectorQuery().selectAll('.scrollView')
                a.boundingClientRect((res)=>{
                    this.scrollItemTop = res
                }).exec()
            },
            //跳转商品列表
            jumpShopList(item){
                uni.navigateTo({
                    url:`/subPackages/goods_list/goods_list?cate_id=${item.cate_id}`
                })
            },
            jumpSearch(){
                uni.navigateTo({
                    url:"/subPackages/search/search"
                })
            }
        }
    }
</script>

<style lang="scss">
    text{
        text-align:center;
    }
    .left_border{
        border-left: 10rpx solid #c00000;
    }
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
.cate{
    display: flex;
    width:100%;
    height:100%;
    position:fixed;
    top:100rpx;
    left:0;
    
    .left{
        flex:0.25;
        overflow: auto;
        padding-bottom:110rpx;
    
        .left_name{
            line-height: 80rpx;
            text-align: center;
            margin-bottom:40rpx;
            font-size: 12px;
        }
    }
    .right{
        flex:0.75; 
        padding-bottom:110rpx;
        
        .titleName{
            text-align:center;
            margin:5px 0 12px;
            font-size: 14px;
            font-weight: 700;
        }
        .right_item{
            display: flex;
            flex-wrap: wrap;
            
            .item{
                display:flex;
                box-sizing: border-box;
                padding:5px;
                width:33%;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                image{
                    max-width:140rpx;
                    max-height:130rpx;
                    // margin:4rpx 4rpx 4rpx 0;
                };
                text{
                    margin-top:5px;
                    text-align:center;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
