<template>
	  <view class='recommend'>
		<scroll-view scroll-y class="scroll-view" :style='"height:"+windowHeight+"px"' @scrolltolower='scrolltolower'>
			<view class='recommend-title'>
			  <text>歌单推荐</text> 		    
			 </view>
			  <view class='recommend-content' >		     
			  <view class='recommend-item' @tap='selectRecommendSong(item)' v-for='(item,index) in recommendList' :key='index'>
			      <image class='recommend-item-image'  :src='item.imgurl' lazy-load='true'></image>
			      <view  class='recommend-listen-num'>
			        <image src='/static/img/icon/home/headset.png'></image>
			        <text>{{item.listennum}}</text>
			      </view>
			      <view class='recommend-item-title'>
			        <text >{{item.dissname}} </text>
			      </view>
			    
			  </view>
			 
			</view>
		
		</scroll-view>
		<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
       <!-- <i-toast id="toast" /> -->
    </view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import util from '../../utils/util.js'
	export default {
		components: {uniLoadMore},
		data() {
			return {
				isLoading:false,
				recommendList: [
					// {
					// 	imgurl: 'http://p.qpic.cn/music_cover/XkvoO3t2zBy0z9cupUMtqriaEsib3fiaia2CLJE5q4cPySIAKByPLeAQdw/600?n=1',
					// 	dissname: '撒发放阿瑟费是非得失 沈德符是多福多寿 是的',
					// 	listenNum: 53432235
					// }
				],
				recommendPage: 0 ,//歌单推荐当前显示的位置 （0-6） ：换一批 （7-12）
				recommendLimit: 60 ,//歌单推荐分页数量 
				windowHeight:0,//屏幕可用高度
			};
		},
		methods:{
			/**
			 * 推荐歌曲
			 * @return [{imgurl: 图片,dissname: 名称,listennum: 歌曲播放数量，dissid:歌曲id}]
			 * @getRecommendList
			 */
			getRecommendList(){
				this.isLoading = true;
				this.$http.getRecommendList(this.recommendPage,this.recommendLimit).then(res=>{
						this.isLoading = false;
						 res.data.list.forEach(item =>{
							 this.recommendList.push({
								 imgurl:item.imgurl,
								 dissname:item.dissname,
								 listennum:util.listennum(item.listennum),
								 dissid:item.dissid,
							 })
						 });
						
						
					})
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
			},
			/**
			 * 滚动底部加载更多
			 * @scrolltolower {Object} e
			 */
			scrolltolower(){
				this.recommendPage++;
				this.getRecommendList();
			},
			/**
			 * 获取屏幕可用高度 == 总高度 - 头部导航 - 底部导航
			 * @setWindowHeight
			 */
			setWindowHeight(){
				uni.getSystemInfo({
				    success:res => {
						this.windowHeight = res.windowHeight
						// this.windowHeight = 200
				    }
				});
			},
			
		},
		onLoad() {
			this.setWindowHeight();
			this.getRecommendList();
		}
	
	}
</script>

<style scoped lang="less">
@import '../../static/less/recommend.less';
</style>
