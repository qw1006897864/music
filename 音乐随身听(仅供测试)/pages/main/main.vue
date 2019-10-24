<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class='search-content'>
			<image class='search-img' src='/static/img/icon/search.png'></image>
			<input class='search-input' confirm-type='search' placeholder-class='search-placeholder' placeholder='搜索歌手、歌曲、专辑、歌单'></input>
		</view>
		
		<!-- 轮播 -->
		<swiper class='swiper-content' indicator-dots indicator-color='rgba(255,255,255,.5)'
		 indicator-active-color='rgba(255,255,255,.8)' autoplay circular interval='3000' duration='500'>
			<swiper-item v-for='(item,index) in carouselList' :key="index" @tap='selectRecommendList(item)'>
				<image class='image-auto' :src='item.picUrl'></image>
			</swiper-item>
		</swiper>
		
		<!-- 列表 -->
		<view class='list-type'>
			<view class='list-type-item' v-for="(item,index) in listType" :key='index' @tap='selectType(item)'>
				<image class='list-type-image' :src='item.src'></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 推荐 -->
		<view class='recommend'>
			<view class='recommend-title'>
				<text>歌单推荐</text>
				<text class='more' @tap='moreRecommend'>更多</text>
			</view>
			<view class='recommend-content'>
				<view class='recommend-item' @tap='selectRecommendSong(item)' v-for="(item,index) in recommendList" :key='index' >
					<image class='recommend-item-image' :src='item.imgurl' lazy-load='true'></image>
					<view class='recommend-listen-num'>
						<image src='/static/img/icon/home/headset.png'></image>
						<text>{{item.listennum}}</text>
					</view>
					<view class='recommend-item-title'>
						<text>{{item.dissname}} </text>
					</view>
				</view>
			</view>
			<view class='recommend-footer'>
				<text @tap='changeRecommend'> 换一批</text>
			</view>
		</view>
	</view>
</template>

<script>
import util from '../../utils/util.js'
	export default {
		data() {
			return {
				userInfo: {},
				hasUserInfo: false,
				/**
				 * @photoList sdadsa
				 */
				carouselList: [],//轮播列表
				songList: {},
				page: 1, //歌曲页数
				size: 20, //默认显示歌曲数量
				scrollHeight: 0, //列表高度
				songImageList: [], //预览图片列表
				isSongListLengthZero: false, //是否还有数据
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				listType: [{
						src: '/static/img/icon/home/songlist.png',
						name: '歌单',
						url: '/pages/recommend/recommend'
					},
					{
						src: '/static/img/icon/home/paihang.png',
						name: '排行',
						url: '/pages/rank/rank'
					},
					{
						src: '/static/img/icon/home/diantai.png',
						name: '电台',
						url: 'diantai'
					},
					{
						src: '/static/img/icon/home/singer.png',
						name: '歌手',
						url: 'singer'
					}
				],
				recommendList: [
					// {
					// 	imgurl: 'http://p.qpic.cn/music_cover/XkvoO3t2zBy0z9cupUMtqriaEsib3fiaia2CLJE5q4cPySIAKByPLeAQdw/600?n=1',
					// 	dissname: '撒发放阿瑟费是非得失 沈德符是多福多寿 是的',
					// 	listenNum: 53432235
					// }
				],
				recommendPage: 0 ,//歌单推荐当前显示的位置 （0-6） ：换一批 （7-12）
				recommendLimit: 6 //歌单推荐分页数量 
			}
		},
		methods: {
			/**
			 * 轮播
			 * @return [{picUrl: 图片,type: 类型,albummid: 歌曲id}]
			 * @getCarouselList
			 */
			getCarouselList() {
				var carouselList = [];
				this.$http.getCarouselList().then(res=>{
					var data = res.focus.data.content;
					data.forEach(item => {
						if (item.type == '10002') {
							carouselList.push({
								picUrl: item.pic_info.url,
								type: item.type,
								albummid: item.jump_info.url
							})
						}
					
					})
					this.carouselList = carouselList;
				})
			},
			/**
			 * 推荐歌曲
			 * @param {sin:开始位置，end:结束位置} 
			 * @return [{imgurl: 图片,dissname: 名称,listenNum: 歌曲播放数量，dissid:歌曲id}]
			 * @getRecommendList
			 */
			getRecommendList(){
				this.$http.getRecommendList(this.recommendPage,this.recommendLimit).then(res=>{
						this.recommendList = res.data.list.map(item =>{
							return {
								 imgurl:item.imgurl,
								 dissname:item.dissname,
								 listennum:util.listennum(item.listennum),
								 dissid:item.dissid,
							 }
						});
					})
			},
			/**
			 * 切换推荐歌曲
			 * @changeRecommend
			 */
			changeRecommend(){
				this.recommendPage ++;
				this.getRecommendList();
			},
			/**
			 * 更多歌曲
			 * @moreRecommend
			 */
			moreRecommend(){
				uni.switchTab({
					url:'/pages/recommend/recommend'
				})
			},
			/**
			 * 跳转
			 * 歌单：recommend； 排行 电台 歌手
			 * @selectType
			 */
			selectType(item){
				if(item.url == '/pages/recommend/recommend'){
					uni.switchTab({
						url:'/pages/recommend/recommend'
					})
				}else{
					if(item.url == '/pages/rank/rank'){
						uni.navigateTo({
							url:'/pages/rank/rank'
						})
					}
				}
			},
			/**
			 * 选择推荐歌曲-跳转到播放列表页面
			 * imgurl: 图片,dissname: 名称,listennum: 歌曲播放数量，dissid:歌曲id
			 * @selectRecommendSong
			 */
			selectRecommendSong(item){
				var url = encodeURIComponent('dissid='+item.dissid+'&imgurl='+item.imgurl+'&dissname='+item.dissname+'&listennum='+item.listennum);
				var params = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: '/pages/recommendDetail/recommendDetail?params='+params
				});
			}
		},
		onLoad() {
			this.getCarouselList();
			this.getRecommendList();
			
		}
	}
</script>

<style  lang="less">
	@import '../../static/less/main.less';
</style>
