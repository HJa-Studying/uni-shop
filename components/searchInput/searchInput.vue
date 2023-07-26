<template>
    <view class="searchView">
        <input placeholder="搜索" :auto-focus="isFocus" class="searchI" v-model.trim()="searchValue" @input="input($event)"/>
        <button class="searchBtn" v-if="showSearchBtn" @click="search()">搜索</button>
    </view>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
    
    export default {
        name:"searchInput",
        props:{
          showSearchBtn:{
              type:Boolean,
              default:true
          },
          isFocus:{
              type:Boolean,
              default:false
          }  
        },
        data() {
            return {
                searchValue: JSON.parse(uni.getStorageSync('searchVal') || '""')
            };
        },
        computed:{
            ...mapState("m_search", ["searchVal"])
        },
        methods:{
            ...mapMutations("m_search",["getSearchVal"]),
            search(){
                this.$emit("search",this.searchValue)
            },
            input(e){
                this.getSearchVal(e.target.value)
            }
        }
    }
</script>

<style lang="scss">
.searchView{
    display:flex;
    box-sizing: border-box;
    width:100vw;
    justify-content: space-between;
    align-items: center;
}
.searchI{
    box-sizing: border-box;
    border:1px solid red;
    height:80rpx;
    flex:1;
    border-radius:50rpx;
    background-color: white;
    padding:10rpx 30rpx;
    margin:0rpx 30rpx;
}
.searchBtn{
    width:110rpx;
    size:16rpx;
    background-color: transparent;
    padding:0;
    color:white;
}
</style>