import * as types from './mutation-types'
// import {playMode} from 'assets/js/config'
// import {shuffle} from "assets/js/util";
//
// function findIndex(list,song) {
//   return list.findIndex((item) =>{
//     return item.id === song.id
//   })
// }
export const outLogin = function ({commit}) {
  commit(types.SET_LOGINSTATE,false);
}


