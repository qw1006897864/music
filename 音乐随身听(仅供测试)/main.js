import Vue from 'vue'
import App from './App'

import store from './store'
Vue.prototype.$store = store
// import './plugin/mui/mui.min.js';
// import './plugin/mui/mui.min.css';
// import './plugin/mui/mui.ttf';
// console.log(mui)

import {Http} from './http/index.js'
Vue.config.productionTip = false;

Vue.prototype.$http = new Http();



// #ifdef APP-PLUS || MP
/**
 * 获取全局唯一的背景音频管理器 backgroundAudioManager
 * @uni.getBackgroundAudioManager
 */
Vue.prototype.audioCtx = uni.getBackgroundAudioManager();

// #endif

// #ifdef H5
Vue.prototype.audioCtx = uni.createInnerAudioContext();
// #endif


App.mpType = 'app';

const app = new Vue({
	store,
	...App
})
app.$mount()
