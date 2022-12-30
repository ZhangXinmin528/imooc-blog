<template>
	<view class="item-container">
		<view class="item-box">
			<!-- left -->
			<view class="item-box-left">
				<hot-ranking>

				</hot-ranking>
			</view>
			<!-- right -->
			<view class="item-box-right">
				<!-- 标题 -->
				<view class="item-title">标题</view>
				<!-- 简介 -->
				<view class="item-desc">简介</view>
				<view class="item-botom-box">
					<!-- 作者 -->
					<text class="item-author">作者</text>
					<!-- 热度 -->
					<view class="hot-box">
						<image class="hot-icon" src="../../static/images/hot-icon.png"></image>
						<text class="hot-text">1000热度</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "hot-list-item",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
