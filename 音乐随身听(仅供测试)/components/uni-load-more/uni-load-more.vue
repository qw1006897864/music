<template>
  <view class="uni-load-more">
    <view
      v-show="status === 'loading' && showIcon"
      class="uni-load-more__img">
      <view class="load1 load">
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
      </view>
      <view class="load2 load">
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
      </view>
      <view class="load3 load">
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
        <view
          :style="{ background: color }"
          class="uni-load-view_wrapper" />
      </view>
    </view>
    <text
      :style="{ color: color }"
      class="uni-load-more__text">
		{{contentText.loadText}}
   </text>
  </view>
</template>

<script>
export default {
  name: 'UniLoadMore',
  props: {
    status: {
      type: String,
      default: 'more'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#fff'
    },
    contentText: {
      type: Object,
      default () {
        return {
			loadText:'加载中'
  
        }
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.uni-load-more {
	display: flex;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: -webkit-translate(-50%,-50%);
	transform: -moz-translate(-50%,-50%);
	transform: -o-translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: rgba(0,0,0,.5);
	z-index: 100;
	color: #fff;
	flex-direction: column;
	width:100px;
	height: 100px;
	align-items: center;
	justify-content: center;
	border-radius: 12rpx;

	&__text {
		font-size: 28upx;
		color: $uni-text-color-grey;
	}

	&__img {
		height: 60rpx;
		width: 60rpx;
		margin-bottom: 20rpx;
		& > .load {
			position: absolute;

			.uni-load-view_wrapper {
				width: 6px;
				height: 2px;
				border-top-left-radius: 1px;
				border-bottom-left-radius: 1px;
				background: $uni-text-color-grey;
				position: absolute;
				opacity: 0.2;
				transform-origin: 50%;
				animation: load 1.56s ease infinite;

				&:nth-child(1) {
					transform: rotate(90deg);
					top: 2px;
					left: 9px;
				}

				&:nth-child(2) {
					transform: rotate(180deg);
					top: 11px;
					right: 0px;
				}

				&:nth-child(3) {
					transform: rotate(270deg);
					bottom: 2px;
					left: 9px;
				}

				&:nth-child(4) {
					top: 11px;
					left: 0px;
				}
			}
		}
	}
}

.load1,
.load2,
.load3 {
	height: 28px;
	width: 28px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}
.load1 .uni-load-view_wrapper:nth-child(1) {
	animation-delay: 0s;
}

.load2 .uni-load-view_wrapper:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 .uni-load-view_wrapper:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 .uni-load-view_wrapper:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 .uni-load-view_wrapper:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 .uni-load-view_wrapper:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 .uni-load-view_wrapper:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 .uni-load-view_wrapper:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 .uni-load-view_wrapper:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 .uni-load-view_wrapper:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 .uni-load-view_wrapper:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 .uni-load-view_wrapper:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
</style>
