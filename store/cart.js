export default {
    namespaced: true,
    
    state:()=>({
        cart:JSON.parse(uni.getStorageSync('cart') || '[]')
    }),
    
    mutations:{
        initCart(state,cart){
            cart.forEach(item=>item.good_state = false)
            console.log("cart",cart)
            state.cart = cart
            uni.setStorageSync('cart',JSON.stringify(state.cart))  
        },
        addToCart(state, good){
            let findResult = state.cart.find( x => x.good_id === good.good_id ) /* 浅拷贝 */
            if(!findResult){
                state.cart.push({...good,good_state:false})
            }else{
                findResult.amount = good.amount
            }
            uni.setStorageSync('cart',JSON.stringify(state.cart))  
        },
        updateCartGoodState(state,arr){
            state.cart.forEach((item,index)=>{
                if(arr.indexOf(item.good_id) != -1){
                    state.cart[index].good_state = !state.cart[index].good_state
                }
            })
            uni.setStorageSync('cart',JSON.stringify(state.cart))  
        },
        updateAllState(state,allState){
            state.cart.forEach((item,index)=>{
                state.cart[index].good_state = allState
            })
            uni.setStorageSync('cart',JSON.stringify(state.cart))  
        }
        
    },
    
    getters:{
      total(state){
          return state.cart.length
      }
    }
}