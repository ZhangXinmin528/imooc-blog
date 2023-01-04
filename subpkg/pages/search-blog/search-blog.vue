<template>
	<div class="search-blog-container">
		<!-- 搜索 -->
		<view class="search-bar-box">
			<my-searcher :isShowInput="true" :placeholderText="defaultText" v-model="searchVal"
				:config="{backgroundColor:'#f1f0f3'}" @search="onSearchConfirm" @focus="onSearchFocus"
				@blur="onSearchBlur" @clear="onSearchClear" @cancel="onSearchCancel">

			</my-searcher>
		</view>

	</div>
</template>

<script>
	import MySearcher from '../../../components/my-searcher.vue'
	import {
		getDefaultText
	} from '../../../api/search.js'

	export default {
		components: {
			MySearcher,
		},
		data() {
			return {
				//输入框输入内容
				searchVal: '',
				//输入框placeholderText
				defaultText: '输入搜索关键字搜索'
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
				console.log('搜索内容：' + val);
			},
			//获取焦点
			onSearchFocus(val) {
				console.log('获取焦点。。');
			},
			//失去焦点
			onSearchBlur(val) {
				console.log('失去焦点');
			},
			//清空内容
			onSearchClear(val) {
				console.log('清空内容');
			},
			//取消按钮
			onSearchCancel(val) {
				console.log('取消按钮');
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
