<template>
	<view class="recommend-content">
		<scroll-view   @scroll='scroll' scroll-y :style='"height:"+windowHeight+"px"'>
			<view class='wx-header' id='headerTitle'>
				<view class="bg" :style='"opacity:"+headerOpacity+ ";background-image:url("+header.backgroundUrl+");"'></view>
				<view class="bg-c" :style='"opacity:"+headerOpacity+ ";"'></view>
				<view class="text">
					<text class="header-title">{{header.title}}</text>
					<image @tap="back" src="/static/img/icon/list/left_arrow.png"></image>
				</view>
				
			</view>
			<view class='header-content' id='headerContent' >
				<view class='header-filter' :style='"background-image:url("+header.backgroundUrl+");"'></view>
				<view class='header-item-left'>
					<image class='header-image' :src='header.backgroundUrl'></image>
					<view class='header-listennum'>
						<image src='/static/img/icon/home/headset.png'></image>
						<text>{{header.listennum}}</text>
					</view>
		
				</view>
				<view class='header-item-right'>
					<text class='header-dissname'>{{header.dissname}}</text>
					<view class='header-logo'>
						<image class='header-scale-image' :src='header.logo'></image>
						<text class='header-scale-text'>{{header.nickname}}</text>
					</view>
				</view>
		
			</view>
			<view  class='scroll-view-content'>
				<view class='play-set'>
					<view class='play-left'>
						<image src='/static/img/icon/list/play-red.png' class='play'></image>
						<text> 全部播放({{songList.length}})</text>
					</view>
					<view class='play-right'>
						<!-- <image src='/static/img/icon/list/download.png' class='download'></image> -->
						<image src='/static/img/icon/list/play-list.png' class='play-list'></image>
					</view>
				
				</view>
				<view class='scroll-view-item' @tap='selectSong(item,index)' v-for='(item,index) in songList' :key='index'>
		
					<view class='scroll-item-left'>
						<text class='song-index'>{{index +1}}</text>
						<image lazy-load='true' class='recommendImage'  :src='item.imgurl' ></image>
					</view>
					<view class='scroll-item-right'>
		
						<view class='singer-content'>
							<text class='song-name'>{{item.songname}}</text>
		
							<text class='singer-name'>{{item.singer}}</text>
		
						</view>
						<image class='play-image' src='/static/img/icon/list/diandian.png'></image>
					</view>
				</view>
				<view v-if='songList.length == 0' class='song-num-zero'>
					<text>暂无数据</text>
				</view>
			
			</view>
			<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>

	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {uniLoadMore},
		data() {
			return {
				header: {
					backgroundUrl: "",
					dissname: "",
					logo: "",
					nickname: "",
					listennum: 0,
					title:'推荐歌曲'
				},
				windowHeight:500,
				headerOpacity:0,
				isLoading:false,
				songList: [],
				mid: '',
				headerContentHeight:0,
				headerTitleHeight:0,
				songmid:[],//歌曲id集合
			};
		},
	
		onLoad(opt) {
			var opt = JSON.parse(decodeURIComponent(opt.params))
		
			this.header.backgroundUrl = opt.imgurl
			this.header.dissname = opt.dissname
			this.header.listennum = opt.listennum
		
			this.getRecommendDetailList(opt.dissid)
		},
		methods: {
	
			/**
			 * 获取歌曲播放地址
			 * @params {
			 *  songmid:歌曲ID
			 * }
			 * @return {歌曲信息}
			 * @getAudioSrc
			 */
			getAudioSrcList(){
				this.$http.getAudioSrcList(this.songmid).then(res=>{
			
					if(res.code == 0){
						var data = res.url_mid.data.midurlinfo;
						var list = data.map(item=>{
							return item.purl;
						})
						this.$store.commit('SET_AUDIOSRC',list)
					}
				})
			},
	
			/**
			 * 获取推荐歌曲详细列表
			 * @param {dissid:歌曲id} 
			 * @return {}
			 * @getRecommendDetailList
			 */
			getRecommendDetailList: function(dissid) {
				this.isLoading = true;
				this.$http.getRecommendDetailList(dissid).then(res => {
					this.isLoading = false;
					this.header.logo = res.headurl;
					this.header.nickname = res.nickname;
					var songList = []
					var data =  res.songlist
					data.forEach((item, index) => {
						
						if(item.albummid){
							this.songmid.push(item.songmid)
							songList.push({
								songname: item.songname, //歌名
								interval: item.interval, //时长
								songmid: item.songmid, //歌曲音乐id
								songid: item.songid, //歌曲id
								albummid: item.albummid, //歌曲图片id
								singer: this.singer(item.singer), //歌手
								imgurl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.albummid +'.jpg?max_age=2592000'
							})
						}
					})
			
					this.getAudioSrcList()
					this.songList = songList;
					this.$store.commit('SET_AUDIOARR',songList)
					
				})
			},
			/**
			 * 设置歌手名称
			 * @param {Object} singArr
			 */
			singer: function(singArr) { //设置歌手名字
				var singers = []
				singArr.forEach(item => {
					singers.push(item.name)
				})
				return singers.join('、')
			},
			
			/**
			 * 页面滚动-动态修改title的透明度
			 * @param {Object} e
			 */
			scroll(e){
			
				var scrollTop = e.detail.scrollTop;
				var opcity = scrollTop / (this.headerContentHeight -this.headerTitleHeight);
				if(opcity >= 1){
					this.headerOpacity = 1;
				}else if(opcity < .2){
						this.header.title = '推荐歌曲';
						this.headerOpacity = 0;
				}else{
					this.headerOpacity = opcity;
				}
	
			},
			/**
			 * 选择歌曲 跳转播放页面
			 * @param {Object} item
			 */
			selectSong: function(item,index) { //选择歌曲
				item['index'] = index;
				this.$store.commit('SET_CURRENTAUDIOINDEX',index)
				var songData = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'/pages/playMusic/playMusic?songData='+songData
				})
			},
			/**
			 * 获取屏幕可用高度 == 总高度 - 头部导航 - 底部导航
			 * @setWindowHeight
			 */
			setWindowHeight(){
				uni.getSystemInfo({
				    success:res => {
						this.windowHeight = res.windowHeight
				    }
				});
			},
			/**
			 * 页面返回
			 */
			back(){
				uni.navigateBack()
			}
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
				query.select('#headerContent').boundingClientRect(data => {
					this.headerContentHeight = data.height;
				}).exec();	
				query.select('#headerTitle').boundingClientRect(data => {
					console.log(data)
					this.headerTitleHeight = data.height;
				}).exec();
					
			this.setWindowHeight()
		}
	}
</script>

<style scoped lang="less">
@import '../../static/less/recommendDetail.less';
</style>
