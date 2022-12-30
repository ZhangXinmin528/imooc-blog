<template>
	<view class="hot-container">
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit" />
		<view class="search-box">
			<my-searcher placeholderText="uni-app 自定义组件"></my-searcher>
		</view>
		<view>
			<my-tabs :tabData="tabData" :defaultIndex="currentIndex"
				:config="{textColor:'#333333',activeTextColor:'#f94d2a'}"></my-tabs>
		</view>
		<!-- list视图 -->
		<view>
			<hot-list-item v-for="(item,index) in 50" :key="index"></hot-list-item>
		</view>
	</view>
</template>

<script>
	import MySearcher from '../../components/my-searcher.vue'
	import MyTabs from '../../components/my-tabs.vue'

	import {
		getHotTabs
	} from 'api/hot'

	export default {
		components: {
			MySearcher,
			MyTabs
		},
		data() {
			return {
				//tab数据源
				tabData: [],
				//当前的切换Index
				currentIndex: 0,
			};
		},
		//组件实现配置完成，但是DOM未渲染，进行网络请求，配置响应式数据
		created() {
			this.loadHotTabs();

		},
		methods: {
			//获取热搜文章类型
			async loadHotTabs() {
				const res = await getHotTabs();

				this.tabData = res.data.list;

			}
		}
	}
</script>

<style lang="scss" scoped>
	//scoped：文件样式只在当前文件中生效，增加样式的隔离性
	.hot-container {
		background-color: $uni-bg-color;
	}

	.logo {
		width: 100%;
		height: 80px;
	}

	.search-box {
		padding: 0 16px;
		margin-bottom: $uni-spacing-col-base;
	}
</style>
