<template>
	<view class="guide-content">
		<swiper   class="guide-scroll" >
			<swiper-item v-for="(item,index) in list" :key='index'>
				<image   class="guide-img" :src="item.src" mode=""></image>
				<button @tap="go" v-if="index == list.length - 1" type="primary" class="button-guide">立即体验</button>
			</swiper-item>
		</swiper>
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			showBtn:false,
			list:[
				{
					src:'../../static/img/guide/guide_1.jpg'
				},	{
					src:'../../static/img/guide/guide_2.jpg'
				},	{
					src:'../../static/img/guide/guide_3.jpg'
				},	{
					src:'../../static/img/guide/guide_4.jpg'
				},
				
			]
		};
	},
	methods: {

		go(){
			uni.setStorageSync('guide','true');
		
			uni.reLaunch({
				url:'/pages/main/main'
			})
		}
		
	}
};
</script>

<style>
	.guide-content{
		width: 100%;
		height: 100%;
		position: fixed;
	}
	.guide-scroll,.scroll-view-item{
		width: 100%;
		height:100%;
	}
	.guide-img{
		width: 100%;
		height: 100%;
		/* height: 100rpx; */
	}
	.button-guide{
		position: fixed;
		bottom: 20%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
	}
</style>
