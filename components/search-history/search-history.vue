<template>
	<view class="search-history-container">
		<!-- 测试Vuex是否导入成功 -->
		<!-- <view>{{msg}}</view> -->
		<!-- title -->
		<view class="search-history-title-box">
			<view class="search-history-title">搜索历史</view>
			<view v-if="!isShowClear">
				<uni-icons type="trash" @click="isShowClear = true"></uni-icons>
			</view>
			<view v-else>
				<text class="txt" @click="onClearAll">全部删除</text>
				<text class="txt" @click="isShowClear = false">完成</text>
			</view>
		</view>
		<view class="search-history-box">
			<block v-for="(item,index) in searchData" :key="index">
				<view class="search-history-item" @click="onHistoryItemClick(item,index)">
					<text class="history-txt line-clamp">{{item}}</text>
					<uni-icons v-show="isShowClear" type="clear"></uni-icons>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	//1.导入mapState函数；导入mapMutations函数，处理mutations问题
	import {
		mapState,
		mapMutations
	} from "vuex";

	export default {
		name: "search-history",
		data() {
			return {
				//是否展示清除
				isShowClear: false,

			};
		},
		computed: {
			//2.在computed中，通过mapState函数，注册state中的数据，导入之后的数据可以直接使用
			//mapState（模块名称，['字段名']）
			...mapState('search', ['searchData'])
		},
		methods: {
			//利用mapMutations函数，可以直接把vuex中的mutations合并到当前组件的methods中，合并进来之后
			//使用
			...mapMutations('search', ['removeSearchData', 'removeAllSearchData']),
			//全部删除
			onClearAll() {
				uni.showModal({
					title: '提示',
					content: '删除搜索历史记录？',
					showCancel: true,
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							// 删除 searchData
							this.removeAllSearchData();
							// 返回状态
							this.isShowClear = false;
						}
					}
				})
			},
			//item点击事件
			onHistoryItemClick(item, index) {
				if (this.isShowClear) {
					// 删除指定的 searchData
					this.removeSearchData(index);
				} else {
					//点击
					this.$emit('onItemClick', item);
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-history-container {
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;
	}

	.search-history-title-box {
		display: flex;
		justify-content: space-between;

	}

	.search-history-title {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
		padding: $uni-spacing-col-sm $uni-spacing-row-sm;

	}

	.txt {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
		padding: $uni-spacing-col-sm $uni-spacing-row-sm;

	}

	.search-history-box {
		margin-top: $uni-spacing-row-lg;
	}

	.search-history-item {
		width: 50%;
		box-sizing: border-box;
		display: inline-block;
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		position: relative;
	}

	.history-txt {
		width: 85%;
		display: inline-block;
		color: $uni-text-color;
		font-size: $uni-font-size-base;
	}

	.search-history-item:nth-child(odd):before {
		content: ' ';
		border-left: 1px solid #999;
		display: inline-block;
		height: 10px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
	}
</style>
