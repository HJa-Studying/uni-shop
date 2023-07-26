<template>
    <view>
        <!-- 搜索组件 -->
        <view class="search"> 
            <searchInput @search="search" :isFocus="true"/>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        methods:{
            search(searchValue){
                console.log("searchValue",searchValue)
                uni.navigateTo({
                    url:`/subPackages/goods_list/goods_list?goodNameLike=${searchValue}`
                })
            }
        }
    }
</script>

<style lang="scss">
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
</style>
