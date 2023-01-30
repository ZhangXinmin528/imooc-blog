<template>
	<view class="comment-item-container">
		<!-- 头像 -->
		<view class="avatar-box">
			<image class="avatar" :src="data.avatar"></image>
		</view>
		<view class="info-box">
			<!-- 评论人 -->
			<text class="comment-user">{{data.nickName || data.userName}}</text>
			<!-- 评论内容 -->
			<text class="comment-info">{{data.content}}</text>
			<!-- 评论的时间 -->
			<text class="comment-time">{{data.postTime | realtiveTime}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "article-comment-item",
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
	.comment-item-container {
		padding: $uni-spacing-col-lg 0;
		display: flex;
	}

	.info-box {
		margin-left: $uni-spacing-row-sm;
		display: flex;
		flex-direction: column;
	}

	.comment-user {
		font-size: $uni-font-size-base;
		font-weight: bold;
		color: $uni-text-color;
	}

	.comment-info {
		margin-top: $uni-spacing-col-sm;
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}

	.comment-time {
		margin-top: $uni-spacing-col-sm;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-grey;
	}
</style>
