<template>
	<view class='rank-content'>
		<view class='rank-item' @tap='selectRank(item)'
		 v-for='(item,index) in rankList' :key='index'>
			<view class='rank-image-content'>
				<image :src='item.picUrl' lazy-load='true'></image>
			</view>
			<view class='right-item'>
				<view class='song-list' v-for='(child,childIndex) in item.songList' :key='childIndex'>

					<text class='song-index'>0{{childIndex+1}}</text>
					<text class='song-item'>{{child.songname}}-{{child.singername}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
		rankList:[],
		rankPic: [{ "headerPic": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64072.png", "headerBg": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64065.png", "name": "巅峰榜·流行指数", "id": "4" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172909.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172810.jpg", "name": "巅峰榜·热歌", "id": "26" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172435.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172242.jpg", "name": "巅峰榜·新歌", "id": "27" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/701148.png", "headerBg": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/701148.png", "name": "说唱榜", "id": "58" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/368732.png", "headerBg": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/368732.png", "name": "电音榜", "id": "57" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/47905.png", "headerBg": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/47895.png", "name": "巅峰榜·网络歌曲", "id": "28" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519103525.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519103301.jpg", "name": "巅峰榜·内地", "id": "5" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104205.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104015.jpg", "name": "巅峰榜·欧美", "id": "3" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/1246130.png", "headerBg": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/1246130.png", "name": "香港地区榜", "id": "59" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519105107.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519105037.jpg", "name": "巅峰榜·韩国", "id": "16" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/1234167.png", "headerBg": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/1234167.png", "name": "抖音排行榜", "id": "60" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20151028110641.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20151028110527.jpg", "name": "巅峰榜·影视金曲", "id": "29" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519105848.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519105750.jpg", "name": "巅峰榜·日本", "id": "17" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519111257.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519111157.jpg", "name": "巅峰榜·MV", "id": "201" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/141219.jpg", "headerBg": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/141213.jpg", "name": "巅峰榜·腾讯音乐人原创榜", "id": "52" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/34151.png", "headerBg": "http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/34143.png", "name": "巅峰榜·K歌金曲", "id": "36" }, { "headerPic": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/1246134.png", "headerBg": "http://y.gtimg.cn/music/common/upload/test_order_channel_hitlist_con/1246134.png", "name": "台湾地区榜", "id": "61" }]
			};
		},
		methods:{
			getRankList(){
				this.$http.getRankList().then(res=>{
					console.log(res)
					var rankList = []
					res.data.topList.forEach(item => {
					  this.rankPic.forEach(child => {
						if (item.id == child.id) {
						  rankList.push({
							id: item.id,
							songList: item.songList,
							listennum: item.listenCount,
							picUrl: child.headerPic,
							headerBg: child.headerBg,
							name: child.name
						  })
						}
					  })
					})
					this.rankList = rankList;
				})
			}
		},
		onReady() {
			this.getRankList()
		}
	}
</script>

<style scoped lang="less">
	@import '../../static/less/rank.less';
</style>
