export default{
    namespaced:true,
    
    state:()=>({
        shoucang:JSON.parse(uni.getStorageSync('shoucang') || '[]'),
    }),
    mutations:{
        updateShouCang(state,shoucang){
            state.shoucang = shoucang
            uni.setStorageSync('shoucang',JSON.stringify(state.shoucang))  
        }
    },
    
    getters:{
         
    }
    
    
}