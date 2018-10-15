
import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions' //同步方法改变
import mutations from './mutations' //异步方法改变

Vue.use(Vuex)

const state = {
    show: true,
    count:0
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
