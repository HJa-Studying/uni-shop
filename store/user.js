export default{
    namespaced: true,
    
    state:()=>({
        userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
        token:JSON.parse(uni.getStorageSync('token') || '""'),
        // token:''
    }),
    
    mutations:{
        updateUserInfo(state,userInfo){
            state.userInfo = userInfo
            uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))  
        },
        updateToken(state,token){
            state.token = token
            uni.setStorageSync('token',JSON.stringify(state.token))  
        },
    },
    
    getters:{
         
    }
    
} 