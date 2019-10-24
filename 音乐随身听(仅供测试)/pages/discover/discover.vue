<template>
	<view class="dis-content">
		<view @tap="scanCode" class="btn">扫码</view>
		<view @tap="wxLogin" class="btn">微信登录</view>
		<view @tap="shareText" class="btn">分享文字</view>
		<view @tap="sharePhoto" class="btn">分享图片</view>
		<view @tap="share" class="btn">分享图文</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			scanCode() {
				//扫码
				uni.scanCode({
					onlyFromCamera: true, // 是否允许从相机和相册扫码
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.authResult);
					}
				});
			},
			shareText() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			sharePhoto() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			share() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>

<style scoped>
	.dis-content {
		width: 100%;
		padding: 20rpx;
		;
	}

	.btn {
		box-sizing: border-box;
		display: block;
		margin-bottom: 20px;
		padding: 5px 10px;
		border-radius: 10px;
		width: 100%;
		color: #fff;
		font-size: 20px;
		text-align: center;
		background: linear-gradient(270deg, rgba(255, 56, 64, 1) 0%, rgba(255, 123, 85, 1) 100%);
		box-shadow: 0px 8px 20px 0px rgba(255, 188, 188, 1);
	}
</style>
