<template>
    <view>
        <!-- 搜索组件 -->
        <view class="search"> 
            <view  @click="jumpSearch()">
                <searchInput :showSearchBtn="false"/>
            </view>
        </view>
        <!-- 轮播图 -->
        <swiper class="banner" :indicator-dots="true" :interval="3000" :autoplay="true" :duration="1000" :circular="true">
            <swiper-item class="banner_item" v-for="item in bannerImages" :key="item.id">
                <navigator class="banner_item_nav" :url="`/subPackages/goods_detail/goods_detail?id=${item.id}`">
                    <image :src="item.url"></image>
                </navigator>
            </swiper-item>
        </swiper>
        <!--  分类栏目  -->
        <view class="nav_name">
            <view class="nav_item" v-for="(item,index) in navName" :key="index" @click="jump(index)">
                <image :src="item.url"></image>
                <h1>{{item.name}}</h1>
            </view>
        </view>
        <!-- 商品栏目 -->
        <view v-for="(item,index) in titleName" :key="index" >
            <h1 class="title_name">{{item.name}}</h1>
            <view class="goods"> 
                <view class="goods_left">
                     <image :src="item.url[0].url" @click="jumpGoodDetail(item.url[0].id)"></image>
                </view>
                <view class="goods_right">
                    <image :src="item.url[1].url" @click="jumpGoodDetail(item.url[1].id)"></image>
                    <image :src="item.url[2].url" @click="jumpGoodDetail(item.url[2].id)"></image>
                    <image :src="item.url[3].url" @click="jumpGoodDetail(item.url[3].id)"></image>
                    <image :src="item.url[4].url" @click="jumpGoodDetail(item.url[4].id)"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default {
        data() {
            return {
                bannerImages:[
                    {
                        id:3,
                        url:"https://img.zcool.cn/community/01a2655aa62341a801206d96f2b565.JPG@3000w_1l_2o_100sh.jpg"
                    },
                    {
                        id:4,
                        url:"https://img.zcool.cn/community/012a5c5c74acf7a801203d226c61d0.jpg@1280w_1l_2o_100sh.jpg"
                    },
                    {
                        id:5,
                        url:"https://img.zcool.cn/community/01081955f1397932f875a132fbdecb.jpg@1280w_1l_2o_100sh.jpg"
                    }
                ],
                titleName:[
                    {
                        name:"时尚女装",
                        url:[
                            { id:1, url:"https://i03.c.aliimg.com/img/ibank/2014/354/714/1273417453_1648721337.jpg" },
                            { id:6, url:"https://pic.jvrong.com/31106d035486395b9e25a9cb0bdaf371.jpg" },
                            { id:7, url:"https://img11.360buyimg.com/n1/jfs/t1/131789/40/25553/167713/62261280Ecf8c2274/8bb8e979a1c645f6.jpg" },
                            { id:8, url:"https://gd1.alicdn.com/imgextra/i3/1087419723/O1CN01zJ6DGD2LhBnqGDvSh_!!1087419723.jpg_400x400.jpg" },
                            { id:9, url:"https://gd3.alicdn.com/imgextra/i2/2215616269717/O1CN01RlarLE2LeRQWWosjQ_!!2215616269717.jpg_400x400.jpg" }
                        ]
                    },
                    {
                        name:"潮流男装",
                        url:[
                            { id:1, url:"https://n.sinaimg.cn/sinakd20116/115/w2048h2867/20200714/0fcb-iwhseiu3497743.jpg" },
                            { id:10, url:"https://img10.360buyimg.com/imgzone/jfs/t1/201887/31/5829/57538/6139d5f1Ec4a0683e/06b7de667e613a91.jpg" },
                            { id:11, url:"https://gd2.alicdn.com/imgextra/i1/3914079562/O1CN01QPTTNs2KVS1r854iL_!!3914079562.jpg" },
                            { id:12, url:"https://gd4.alicdn.com/imgextra/i3/1012918518/O1CN01LOc8xe2CnIWdkMxoJ_!!1012918518.jpg_400x400.jpg" },
                            { id:13, url:"https://gd1.alicdn.com/imgextra/i1/264612641/O1CN01y08BSE1VNcrNKK770_!!264612641.jpg_400x400.jpg" }
                        ]
                    },
                    {
                        name:"家用电器",
                        url:[
                            { id:14, url:"https://img1.baidu.com/it/u=3896849360,1561887679&fm=253&fmt=auto&app=138&f=JPEG?w=307&h=500.jpg" },
                            { id:15, url:"https://gd2.alicdn.com/imgextra/i2/2215942875148/O1CN01ahMU1V1ntpnEFvXpd_!!2215942875148.jpg_400x400.jpg" },
                            { id:16, url:"https://gd1.alicdn.com/imgextra/i4/2215777169737/O1CN01InAPT72LnbLlA1PdM_!!2215777169737.jpg_400x400.jpg" },
                            { id:17, url:"https://gd3.alicdn.com/imgextra/i4/2215474651598/O1CN01WoMSPs1NfvlXKA7Eo_!!2215474651598.jpg_400x400.jpg" },
                            { id:18, url:"https://gd4.alicdn.com/imgextra/i4/3616501207/O1CN01dXg92Q1KmquPI8piZ_!!3616501207.jpg_400x400.jpg" }
                        ]
                    },
                    {
                        name:"电子设备",
                        url:[
                            { id:19, url:"https://imgservice.suning.cn/uimg1/b2c/image/0TlLcIYm0p90QU0wxaxxnw.jpg_800w_800h_4e.jpg" },
                            { id:20, url:"https://img2.baidu.com/it/u=2681036219,3688932884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=370.jpg" },
                            { id:21, url:"https://gd3.alicdn.com/imgextra/i2/1775567470/O1CN01nAFIzO253JSCC4UlA_!!1775567470.jpg_400x400.jpg" },
                            { id:22, url:"https://gd4.alicdn.com/imgextra/i2/2215968343783/O1CN01ybcc3B1dofAeRlJIC_!!2215968343783.jpg_400x400.jpg" },
                            { id:23, url:"https://gw.alicdn.com/imgextra/i1/2216048760199/O1CN01YVUtuN1DLBfc7LLUB_!!0-item_pic.jpg_Q75.jpg_.webp" }
                        ]
                    }
                ],
                navName:[
                    {
                        name:"分类",
                        url:"/static/fenlei.png"
                    },
                    {
                        name:"秒杀拍",
                        url:"/static/miaosha.png"
                    },
                    {
                        name:"超市购",
                        url:"/static/shopping.png"
                    },
                    {
                        name:"母婴品",
                        url:"/static/muying.png"
                    }
                ]
                
            }
        },
        computed:{
            ...mapState('m_cart',['test'])
        },
        methods:{
            jump(index){
                if(index === 0){
                 uni.switchTab({
                     url:"/pages/cate/cate"
                 })   
                }else if(index === 2){
                    uni.switchTab({
                        url:"/pages/cate/cate"
                    })   
                }
                console.log("index",index)
            },
            jumpGoodDetail(id){
                uni.navigateTo({
                    url:`/subPackages/goods_detail/goods_detail?id=${id}`
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

<style lang="scss" scoped>
.search{
    height:120rpx;
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
.banner{
    width:100%;
    height:340rpx;
    
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
.nav_name{
    margin-top:5px;
    height:100rpx;
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content:space-around;
    align-items:center;
    
    .nav_item{
        width:22%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
        image{
            width:50rpx;
            height:50rpx;
        }
        
        h1{
            margin-top:3px;
            text-align:center;
            font-size:12px;
        }
    }
}
.title_name{
    margin:15px 0 5px 5px;
}
.goods{
    width:100%;
    height:500rpx;
    display: flex;
    flex-direction: row;
    
    .goods_left{
        width:280rpx;
        height:100%;
        
        image{
            display: inline-block;
            box-sizing: border-box;
            padding:5px;
            width:100%;
            height:100%;
        }
    }
    .goods_right{
        display: flex;
        flex:1;
        height:100%;
        // box-sizing: border-box;
        // padding:5px 5px 5px 0;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        
        image{
            width:50%;
            height:50%;
            box-sizing: border-box;
            padding:5px 5px 5px 0;
        }
    }
}
</style>
