import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from  './mutations'
import * as actions from './actions'
import * as getters from  './getters'

import  createLogger from 'vuex/dist/logger' //state状态改变，打印日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  state ,
  mutations,
  strict:debug ,//开启调试模式
  plugins:debug ? [createLogger()] :[]
})
