<template>
	<!--pages/player/player.wxml-->
	<view class='content'>

		<view class='audio-content'>
			<view class='wx-header'>

				<text class="text">{{songData.songname}}</text>
				<image @tap="back" src="/static/img/icon/list/left_arrow.png"></image>

			</view>
			<view class='audio-title'>{{songData.singer}}</view>
			<view class='audio-bg'>
				<image class='image-auto ' :src='songData.imgurl'></image>
			</view>

			<view class='audio-middle'>
				<view class='audio-rotate'>
					<view class='audio-rotate-bg'>
						<image class='audio-rotate-image image-auto' :class='playState ? "play":"play pause"' :src='songData.imgurl'></image>
					</view>

				</view>
				<view class='audio-lyric'>
					{{playingLyric}}
				</view>
			</view>
			<view class='audio-controls'>
				<view class='progress'>
					<text>{{startTime}}</text>
					<view class='progress-item'>
						<slider min='0' :max='songData.interval' step='1' :value='percent' backgroundColor='rgba(255,255,255,.7)'
						 block-color='rgb(222,222,222)' activeColor='#19be6b' block-size='16' @change='change' @changing='changing'></slider>

					</view>
					<text>{{endTime}}</text>
				</view>
				<view class='audio-controls-image-content'>
					<image class='audio-controls-scale-image' @tap='prevAudio' src='/static/img/icon/play/prev-audio.png'></image>
					<image class='audio-controls-image' @tap='playAudio' v-if='!playState' src='/static/img/icon/play/play-audio.png'></image>
					<image class='audio-controls-image' @tap='pauseAudio' v-if='playState' src='/static/img/icon/play/pause-audio.png'></image>
					<image class='audio-controls-scale-image' @tap='nextAudio' src='/static/img/icon/play/next-audio.png'></image>
				</view>
			</view>
		</view>
	

	</view>

</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import Lyric from '../../utils/lyric.js';
	export default {
		components: {uniSwipeAction},
		data() {
			return {
				songData: [
					// albummid: "001RbSnp1EqFfM"
					// imgurl: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001RbSnp1EqFfM.jpg?max_age=2592000"
					// index: 0
					// interval: 224
					// singer: "肥皂菌、cv王胖子、Mr.mo"
					// songid: 234847085
					// songmid: "001LlNNq1KfX28"
					// songname: "舌战江湖 (侠骨篇)"
				], //歌曲信息
			
				// playState: false, //是否正在播放
				startTime: '00:00',
				endTime: '00:00',
				percent: 0, //进度条-当前百分比 x%；
				isTouched: false, //是否按住滑动按钮
				playingLyric: "", //当前播放的歌词
				lyric: null,//歌词实例
			}
		},
		computed:{
			playState(){
				return this.$store.getters.playState;
			}
		},
		onLoad(opt) {
			var songData = JSON.parse(decodeURIComponent(opt.songData))
			// console.log(songData)
			this.songData = songData
			
			// #ifdef APP-PLUS || MP
			/**
			 * 获取全局唯一的背景音频管理器 backgroundAudioManager
			 * @uni.getBackgroundAudioManager
			 */
			// this.initAudio();
			// if(this.audioCtx.src && this.audioCtx.src == this.$store.getters.currentAudioSrc){
			// 	
			// }else{
			// 	
			// }
			this.setBackgroundAudio();
		

			// #endif

			// #ifdef H5
			this.createBackgroundAudio()
			// #endif

		},
		methods: {

			/**
			 * 获取歌曲播放歌词
			 * @params {
			 *  songmid:歌曲ID
			 * }
			 * @return {歌词信息}
			 * @getLyricList
			 */
			getLyric() {
				this.playingLyric = '';
				this.$http.getLyric(this.songData.songmid).then(res => {
				
					if(this.lyric){
						this.lyric.stop()
						this.lyric = null;
					}
					this.lyric = new Lyric(res,this.handleLyric); //初始化歌词
				
					if(this.lyric.lines.length){
						this.lyric.play()
					}else{
						this.playingLyric = '当前歌曲暂无歌词 (T＿T)'
					} 
				
				})
			},
			setLyric(){
				if(this.lyric){
					var currentTime = this.audioCtx.currentTime ? this.audioCtx.currentTime : 0;
					this.lyric.seek(currentTime * 1000);
				}
			
			},
			
			handleLyric({lineNum,txt}) {
				this.playingLyric = txt;
				// console.log(lineNum,txt)
				// const lyricListHeight = this.$refs.lyricList.$el.clientHeight;
				// const lyricHeight = this.$refs.lyricLine[0].clientHeight;
				// let middle = Math.ceil(lyricListHeight / lyricHeight / 2);

// 				this.currentlineNum = lineNum
// 				if (lineNum > middle) {
// 					let lineEl = this.$refs.lyricLine[lineNum - middle];
// 					this.$refs.lyricList.scrollToElement(lineEl, 1000);
// 
// 				} else {
// 					this.$refs.lyricList.scrollTo(0, 0, 1000)
// 				}
			},
			stopLyric(){
				if(this.lyric){
					this.lyric.stop()
				}
			},
			/**
			 * 设置时间
			 * @param time s:秒
			 * @return '00:00'
			 * @setTime
			 */
			setTime(time) {
				time = parseInt(time)
				var m = parseInt(time / 60);
				m = m < 10 ? '0' + m : m;
				var s = time % 60;
				s = s < 10 ? '0' + s : s;
				return m + ':' + s
			},
			/**
			 * 改变滑动条，设置当前时间
			 * this.audioCtx.seek(s) 设置歌曲时间 s:秒
			 * @param   e.detail.value : 当前进度
			 * @change
			 */
			change(e) {
				this.percent = e.detail.value;
				this.audioCtx.seek(e.detail.value)
				this.startTime = this.setTime(e.detail.value);
				this.lyric.seek(e.detail.value * 1000);
				this.isTouched = false;
				console.log(e)
			},
			/**
			 * 滑块滑动时，改变当前状态，
			 * 	isTouched ：true ,进度条不受音频自动播放控制
			 * @param  e.detail.value : 当前进度
			 * @changing
			 */
			changing(e) {
				this.lyric.seek(e.detail.value * 1000);
				this.startTime = this.setTime(e.detail.value);
				this.isTouched = true;
			},
			/**
			 * 返回上一级页面
			 * @back
			 */
			back() {
				this.stopLyric()
				uni.navigateBack()
			},
			/**
			 * 上一曲歌曲
			 *  this.$store.getters.currentAudioSrc ： 点击之后当前歌曲地址
			 * 	this.$store.getters.currentAudioIndex :当前歌曲播放索引 【0 - arr.length-1】
			 *  this.$store.getters.audioItem ：当前歌曲信息
			 * 	‘SET_CURRENTAUDIOINDEX’ ：设置歌曲的播放索引 【0 - arr.length-1】
			 * @prevAudio
			 */
			prevAudio() {
				if (this.$store.getters.currentAudioIndex > 0) {
					this.$store.commit('SET_CURRENTAUDIOINDEX', this.$store.getters.currentAudioIndex - 1);

				} else {
					this.$store.commit('SET_CURRENTAUDIOINDEX', this.$store.getters.audioSrc.length - 1);
				}
				this.songData = this.$store.getters.audioItem;
				this.setBackgroundAudio()
			},
			/**
			 * 下一曲歌曲
			 *  this.$store.getters.currentAudioSrc ： 点击之后当前歌曲地址
			 * 	this.$store.getters.currentAudioIndex :当前歌曲播放索引 【0 - arr.length-1】
			 *  this.$store.getters.audioItem ：当前歌曲信息
			 * 	‘SET_CURRENTAUDIOINDEX’ ：设置歌曲的播放索引 【0 - arr.length-1】
			 * @nextAudio
			 */
			nextAudio() {
				if (this.$store.getters.currentAudioIndex < this.$store.getters.audioSrc.length - 1) {
					this.$store.commit('SET_CURRENTAUDIOINDEX', this.$store.getters.currentAudioIndex + 1);
				} else {
					this.$store.commit('SET_CURRENTAUDIOINDEX', 0);
				}

				this.songData = this.$store.getters.audioItem;
				this.setBackgroundAudio()
			},
			/**
			 * 播放歌曲
			 * this.playState ： 当前播放状态
			 * @playAudio
			 */
			playAudio() {
				this.audioCtx.play()
			},
			/**
			 * 暂停当前播放歌曲
			 * @pauseAudio
			 */
			pauseAudio() {
				this.audioCtx.pause()
			},
			/**
			 * 设置歌曲基本信息
			 * src:歌曲播放地址--默认改变地址自动播放
			 * title:音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
			 * singer：歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
			 * coverImgUrl：封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
			 * @setBackgroundAudio
			 */
			setBackgroundAudio(isReset=false) {
				this.audioCtx.src = this.$store.getters.currentAudioSrc;
				this.audioCtx.title = this.songData.songname;
				this.audioCtx.singer = this.songData.singer;
				this.audioCtx.coverImgUrl = this.songData.imgurl;
				this.audioCtx.seek(0)
				this.startTime = this.setTime(0);
				this.endTime = this.setTime(this.songData.interval);
				this.getLyric();
			},
			/**
			 * 初始化歌曲信息
			 * @initAudio
			 */
			initAudio() {
				/**
				 * 背景音频播放事件
				 * @onPlay
				 */
				this.audioCtx.onPlay(() => {
					console.log('当前歌曲开始播放')
					// this.playState = true;
					this.$store.commit('SET_PLAYSTATE',true);
					this.setLyric();
				})
				/**
				 * 	背景音频播放进度更新事件
				 * @onTimeUpdate
				 */
				this.audioCtx.onTimeUpdate(() => {
					if (!this.isTouched) {
						this.percent = Math.floor(this.audioCtx.currentTime)
						this.startTime = this.setTime(this.audioCtx.currentTime);
					}
				})

				/**
				 * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
				 * @onWaiting
				 */
				this.audioCtx.onWaiting(() => {
					console.log('当前歌曲正在加载')
				})
				/**
				 * 背景音频暂停事件
				 * @onPause
				 */
				this.audioCtx.onPause(() => {
					console.log('当前歌曲已暂停')
					this.$store.commit('SET_PLAYSTATE',false);
					this.stopLyric()
				})
				/**
				 * 背景音频自然播放结束事件
				 * @onEnded
				 */
				this.audioCtx.onEnded(() => {
					console.log('当前歌曲播放完毕')
					this.$store.commit('SET_PLAYSTATE',false);
					this.nextAudio()
					this.stopLyric()
				})

				/**
				 * 背景音频停止事件
				 * @onStop
				 */
				this.audioCtx.onStop(() => {
					console.log('当前歌曲播放停止')
					this.$store.commit('SET_PLAYSTATE',false);
					this.stopLyric()
				})
				/**
				 * 背景音频播放错误事件
				 * @onError
				 */
				this.audioCtx.onError(() => {
					console.log('当前歌曲播放错误')
					this.$store.commit('SET_PLAYSTATE',false);
					this.stopLyric()
				})
				/**
				 * 用户在系统音乐播放面板点击上一曲事件（iOS only）
				 * @onPrev
				 */
				this.audioCtx.onPrev(() => {
					console.log('用户在系统音乐播放面板点击上一曲事件')
					this.prevAudio()
				})
				/**
				 * 用户在系统音乐播放面板点击下一曲事件（iOS only）
				 * @onNext
				 */
				this.audioCtx.onNext(() => {
					console.log('用户在系统音乐播放面板点击下一曲事件')
					this.nextAudio()
				})


			},
			/**
			 * 创建背景音频管理器 -- H5
			 * @createBackgroundAudio
			 */
			createBackgroundAudio() {
				this.audioCtx.autoplay = false;
				this.audioCtx.src = this.$store.getters.currentAudioSrc;;
				this.audioCtx.onPlay(() => {
					console.log('开始播放');
				});
				this.audioCtx.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			}
		},
		onReady() {

		}
	}
</script>

<style scoped lang="less">
	@import '../../static/less/playMusic.less';
</style>
