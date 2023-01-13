<template>
	<view class="search-result-item-box">

		<!-- 标题 -->
		<rich-text :nodes="data.title" class="item-title .line-clamp-2"></rich-text>
		<!-- 内容 -->
		<rich-text :nodes="data.description" class="item-desc .line-clamp-2"></rich-text>
		<!-- 底部 -->
		<view class="item-desc-bottom">
			<!-- 作者 -->
			<view class="item-author">{{data.nickname}}</view>
			<!-- 发布时间 -->
			<view class="item-update-time">
				<uni-icons class="read-update-time-icon" type="compose" color="#999999"></uni-icons>
				<text>{{data.updateTime | realtiveTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search-result-item-theme-1",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.search-result-item-box {
		margin-bottom: $uni-spacing-col-big;

	}

	.item-title {
		font-size: $uni-font-size-base;
		font-weight: bold;
		color: $uni-text-color-title;

	}

	.item-desc {
		margin-top: $uni-spacing-col-base;
		font-size: $uni-font-size-base;
		color: $uni-color-subtitle;
	}

	.item-desc-bottom {
		margin-top: $uni-spacing-col-base;
		display: flex;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;

	}

	.item-author {
		margin-right: $uni-spacing-col-lg;
	}

	.item-update-time-icon {
		color: $uni-text-color-grey;
		margin-right: $uni-spacing-row-sm;
	}
</style>
