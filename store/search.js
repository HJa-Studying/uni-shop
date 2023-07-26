export default{
    namespaced:true,
    
    state:()=>({
        searchVal: JSON.parse(uni.getStorageSync('searchVal') || '""'),
    }),
    mutations:{
        getSearchVal(state,value){
            state.searchVal = value
            uni.setStorageSync('searchVal',JSON.stringify(state.searchVal))  
        }
    },
    
    getters:{
         
    }
    
    
}