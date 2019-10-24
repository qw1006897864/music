import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGINSTATE](state, loginState) {
    state.loginState = loginState
  },

  [types.SET_ISLOGINSHOW](state, isLoginShow) {
    state.isLoginShow = isLoginShow
  },
  [types.SET_ISAUTH](state, isAuth) {
    state.isAuth = isAuth
  },
  [types.SET_WXSHARESTATUS](state, wxShareStatus) {
    state.wxShareStatus = wxShareStatus
  },

}
export default mutations
