<template>
	<view></view>
</template>
<script>
export default {
	data() {
		return {
	
		};
	},
	onLoad() {
		this.go()
	},
	methods: {
		
		go(){
				
			if(uni.getStorageSync('guide')){
				uni.reLaunch({
					url:'/pages/main/main'
				})
			}else{
				uni.reLaunch({
					url:'/pages/guide/guide'
				})
			}
		}
		
	}
};
</script>

<style>
</style>
