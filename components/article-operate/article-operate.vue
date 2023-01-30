<template>
	<view class="operate-container">
		<!-- 输入框 -->
		<view class="comment-box">
			<my-searcher placeholderText="评论一句,前排打call..." :config="{
				height:28,
				backgroundColor:'#eeedf4',
				icon:'/static/images/input-icon.png',
				textColor:'#a6a5ab',
				border:'none'
			}"></my-searcher>
		</view>
		<!-- 点赞 -->
		<view class="options-box">
			<article-praise></article-praise>
		</view>
		<!-- 收藏 -->
		<view class="options-box">
			<article-collect></article-collect>
		</view>
	</view>
</template>

<script>
	import MySearcher from '../../components/my-searcher.vue'
	export default {
		name: "article-operate",
		components: {
			MySearcher,
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.operate-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $uni-bg-color;
		padding: 4px 6px 32px 6px;
		display: flex;
		border-top: 1px solid $uni-bg-color-grey;
		align-items: center;
	}

	.comment-box {
		flex-grow: 2;
	}

	.options-box {
		flex-grow: 1;
	}
</style>
