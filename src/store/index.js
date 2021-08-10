import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Pid: "",
    Shop: "",
    Count: "",
    Token: "",
  },
  mutations: {
    getPid(state, payload){
      state.Pid = payload;
    },
    getShop(state, payload){
      state.Shop = payload;
    },
    getCount(state, payload){
      state.Count = payload;
    },
    getToken(state, payload){
      state.Token = payload;
    },
  }
})
