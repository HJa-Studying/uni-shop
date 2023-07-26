import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
import moduleShouCang from '@/store/shoucang.js'
import moduleSearch from '@/store/search.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        'm_cart':moduleCart,
        'm_user':moduleUser,
        'm_shoucang':moduleShouCang,
        'm_search':moduleSearch
    }
})

export default store