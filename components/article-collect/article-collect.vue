<template>
	<view class="collet-box">
		<image class="img" src="/static/images/un-collect.png"></image>
		<text class="txt">收藏</text>
	</view>
</template>

<script>
	export default {
		name: "article-collect",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.collet-box {
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.img {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
		color: $uni-text-color;
	}

	.txt {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}
</style>
