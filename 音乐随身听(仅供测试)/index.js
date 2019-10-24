import api from '../api/index.js';

const request = function(url, data = '', type = 'GET', jsonType = 'json') {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: url,
			method: type,
			data: data,
			header: {
				"content-type": jsonType
			},
			success: function(res) {
				// console.log(res)
				resolve(res.data)
			},
			fail: function(err) {
				console.log(err)
				reject(err)
			},
			complete(data) {

			}
		})
	})
}

export class Http {
	constructor() {

	}
	/**
	 * 轮播
	 * @return [{picUrl: 图片,type: 类型,albummid: 歌曲id}]
	 * @getCarouselList
	 */
	getCarouselList() { //首页热门歌手图片
		return Promise.resolve(
			request(api.carousel)
		)
	}
	/**
	 * 推荐歌曲
	 * @param {sin:开始位置，end:结束位置} 
	 * @return [{imgurl: 图片,dissname: 名称,listenNum: 歌曲播放数量，dissid:歌曲id}]
	 * @getRecommendList
	 */
	getRecommendList(page = 0, limit = 6) { //首页热门推荐
		var sin = page * limit;
		var end = (page + 1) * limit - 1;
		return Promise.resolve(
			request(api.recommend, {
				sin: sin,
				end: end
			})
		)
	}
	/**
	 * 获取推荐歌曲详细列表
	 * @param {dissid:歌曲id} 
	 * @return songlist:[]
	 * @getRecommendDetailList
	 */
	getRecommendDetailList(dissid) {
		return Promise.resolve(
			request(api.recommendDetail, {
				dissid: dissid
			})
		)
	}
	/**
	 * 排行榜
	 */
	getRankList() {
		return Promise.resolve(
			request(api.rank)
		)
	}
	/**
	 * 获取歌曲播放地址
	 * @params {
	 *  songmid:歌曲ID
	 * }
	 * @return {歌曲信息}
	 * @getAudioSrcList
	 */
	getAudioSrcList(songmid) {
		return Promise.resolve(
			request(api.audioSrc,{songmid:JSON.stringify(songmid)})
		)
	}
	/**
	 * 获取歌曲播放歌词
	 * @params {
	 *  songmid:歌曲ID
	 * }
	 * @return {歌词信息}
	 * @getLyric
	 */
	getLyric(songmid) {
		return Promise.resolve(
			request(api.audioLyric,{songmid:songmid})
		)
	}
}
