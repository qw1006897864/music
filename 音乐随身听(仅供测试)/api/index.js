const apiRootUrl = 'http://94.191.117.92:8888';
// const apiRootUrl = 'http://192.168.31.216:8080';
// const apiRootUrl = 'http://192.168.43.217:8080';
const api = {
	carousel:apiRootUrl+'/api/getCarouselList',//首页热门歌手图片
	recommend:apiRootUrl+'/api/getRecommendList',//首页热门推荐
	recommendDetail:apiRootUrl+'/api/getRecommendDetailList',//首页热门推荐详细数据列表
	rank:apiRootUrl+'/api/getRankList',//首页排行列表
	audioSrc:apiRootUrl+'/api/getAudioSrcList',//歌曲播放地址
	audioLyric:apiRootUrl+'/api/getLyric',//歌曲播放歌词
}
export default api;