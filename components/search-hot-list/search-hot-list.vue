<template>
	<view class="search-hot_list-container">
		<view class="search-hot-title">慕课热搜 - 全网技术，一网打尽</view>
		<!-- 列表 -->
		<block v-for="(item,index) in hotList" :key="index">
			<view class="search-hot-item" @click="onItemClick(item)">
				<!-- 序号 -->
				<hot-ranking :ranking="index+1"></hot-ranking>
				<!-- titel -->
				<text class="title line-clamp">{{item.label}}</text>
				<!-- icon -->
				<image class="search-hot-icon" src="../../static/images/hot-icon.png" v-if="index<=2"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		getSearchHotList
	} from '../../api/search.js'

	export default {
		name: "search-hot-list",
		created() {
			this.loadSearchHotList();
		},
		data() {
			return {
				hotList: [],
			};
		},
		methods: {
			async loadSearchHotList() {
				const res = await getSearchHotList();
				this.hotList = res.data.list;
				// console.log(res.data);
			},
			//item的点击事件
			onItemClick(item) {
				console.log("onItemClick：" + item.label);
				this.$emit('onSearch', item.label);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-hot_list-container {}

	.search-hot-title {
		font-weight: bold;
		font-size: $uni-font-size-base;
		color: $uni-text-color-hot;
		padding: 0 $uni-spacing-col-lg $uni-spacing-col-lg $uni-spacing-col-lg;
		margin: 0 -12px $uni-spacing-col-lg -12px;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
	}

	.search-hot-item {
		display: flex;
		align-items: center;
		padding: $uni-spacing-col-lg 0;

	}

	.title {
		color: $uni-text-color;
		font-size: $uni-font-size-base;
		margin: 0 $uni-spacing-row-base;
	}

	.search-hot-icon {
		width: 14px;
		height: 14px;
	}
</style>
