<template>
    <view>
        <myBefore v-if="!token"></myBefore>
        <myAfter v-else></myAfter>
        
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                
            };
        },
        computed:{
            ...mapState('m_user',['token'])
        },
        methods:{
            
        },
        mounted(){
            
        },
        onLoad() {
           console.log("onLoad")
        },
        onHide() {
            console.log("onHide")
        },
        onReady() {
            console.log("Ready")
        }
    }
</script>

<style lang="scss">

</style>
