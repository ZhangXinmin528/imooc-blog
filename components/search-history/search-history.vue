<template>
	<view class="search-history-container">
		<!-- title -->
		<view class="search-history-title-box">
			<view class="search-history-title">搜索历史</view>
			<view v-if="!isShowClear">
				<uni-icons type="trash" @click="isShowClear = true"></uni-icons>
			</view>
			<view v-else>
				<text class="txt">全部删除</text>
				<text class="txt" @click="isShowClear = false">完成</text>
			</view>
		</view>
		<view class="search-history-box">
			<block v-for="(item,index) in searchData" :key="index">
				<view class="search-history-item">
					<text class="history-txt- line-clamp">{{item}}</text>
					<uni-icons v-show="isShowClear" type="clear"></uni-icons>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search-history",
		data() {
			return {
				//是否展示清除
				isShowClear: false,
				searchData: ['java', 'android', 'uniapp']
			};
		}
	}
</script>

<style lang="scss">

</style>
