<template>
	<div class="search-blog-container">
		<!-- 搜索 -->
		<view class="search-bar-box">
			<my-searcher :isShowInput="true" :placeholderText="defaultText" v-model="searchVal"
				:config="{backgroundColor:'#f1f0f3'}" @search="onSearchConfirm" @focus="onSearchFocus"
				@blur="onSearchBlur" @clear="onSearchClear" @cancel="onSearchCancel">

			</my-searcher>
		</view>

		<!-- 热搜列表 -->
		<!-- 在 HTML中，只可以访问data中定义的数据-->
		<view class="search-hot-list-box card" v-if="showType === HOT_LIST">
			<search-hot-list @onSearch="onSearchConfirm"></search-hot-list>
		</view>

		<!-- 热搜历史 -->
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
			<search-history></search-history>
		</view>

		<!-- 搜索结果 -->
		<view class="search-result-list-box" v-else>
			<search-result-list></search-result-list>
		</view>

	</div>
</template>

<script>
	import MySearcher from '../../../components/my-searcher.vue'
	import {
		getDefaultText
	} from '../../../api/search.js'

	//热搜列表
	const HOT_LIST = '0'
	//搜索历史
	const SEARCH_HISTORY = '1'
	//搜索结果
	const SEARCH_RESULT = '2'

	export default {
		components: {
			MySearcher,
		},
		data() {
			return {
				//输入框输入内容
				searchVal: '',
				//输入框placeholderText
				defaultText: '输入搜索关键字搜索',
				//默认情况下 或者 用户点击搜索框取消按钮时，显示「热搜列表」
				//当搜索框获取焦点时 或者 点击输入框清空按钮时，显示【搜索历史】
				//用户点击热搜列表item 或者用户点击搜索历史item时，显示【搜索结果列表】
				showType: HOT_LIST,
				//定义类型常量，简写
				HOT_LIST,
				SEARCH_HISTORY,
				SEARCH_RESULT,
			}
		},
		created() {
			this.loadDefaultText();
		},
		methods: {
			//获取推荐搜索文本
			async loadDefaultText() {
				const res = await getDefaultText();
				this.defaultText = res.data.defaultText;
			},
			//搜索内容
			onSearchConfirm(val) {
				console.log('搜索内容。。' + val);
				//没有输入搜索内容，则使用推荐文本
				this.searchVal = val ? val : this.defaultText;
				//当用户输入包含内容时
				if (this.searchVal) {
					this.showType = SEARCH_RESULT;
				}
			},
			//获取焦点
			onSearchFocus(val) {
				// console.log('获取焦点。。');
				this.showType = SEARCH_HISTORY;
			},
			//失去焦点
			onSearchBlur(val) {},
			//清空内容
			onSearchClear(val) {
				this.showType = SEARCH_HISTORY;
			},
			//取消按钮
			onSearchCancel(val) {
				this.showType = HOT_LIST;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-blog-container {}

	.search-bar-box {
		background-color: $uni-bg-color;
		padding: $uni-spacing-row-sm;
		position: sticky;
		top: 0px;
		z-index: 9;
	}
</style>
