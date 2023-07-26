<template>
    <view class="page">
        <view class="main">
            <view style="height:10%;text-align: center;padding:20rpx;font-weight: 700;box-sizing: border-box;">关于我们</view>
            <view style="height:80%;padding:40rpx 20rpx 20rpx;box-sizing: border-box;">
                此小程序仅作为个人作品展示
            </view>
            <view style="height:10%;text-align: center;box-sizing: border-box;background-color: lightgray;">
                <button @click="closed">知道了</button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name:"aboutWe",
        data() {
            return {
                
            };
        },
       methods:{
           closed(){
               this.$emit("close")
           }
       }
    }
</script>

<style lang="scss">
.page{
    width:100vw;
    height:100vh;
    position: absolute;
    z-index: 999;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    
    .main{
        border-radius: 20rpx;
        width:70%;
        height:70%;
        background-color: white;
    }
}
</style>