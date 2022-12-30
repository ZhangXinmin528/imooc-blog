<template>
	<view class="hot-container">
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit" />
		<view class="search-box">
			<my-searcher placeholderText="uni-app 自定义组件"></my-searcher>
		</view>
		<view>
			<my-tabs :tabData="tabData" :defaultIndex="currentIndex"
				:config="{textColor:'#333333',activeTextColor:'#f94d2a'}" @tabClick="onTabClick"></my-tabs>
		</view>
		<!-- current属性表示当前展示哪个page -->
		<swiper class="swiper" :current="currentIndex" :style="{height:currentSwiperHeight+'px'}">

			<swiper-item class="swiper-item" v-for="(tabItem,tabIndex) in tabData" :key="tabIndex">
				<!-- list视图 -->
				<view>
					<!-- 加载动画 -->
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<block v-else>
						<hot-list-item :class="'hot-list-item-'+tabIndex" v-for="(item,index) in listData[tabIndex]"
							:key="index" :data="item" :ranking="index+1"></hot-list-item>
					</block>

				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import MySearcher from '../../components/my-searcher.vue'
	import MyTabs from '../../components/my-tabs.vue'

	import {
		getHotTabs,
		getHostListFromTabType
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
				//loading
				isLoading: true,
				//以tab为key，以对应的list数据为value
				listData: {},
				//当前swiper高度
				currentSwiperHeight: 0,
				//缓存高度数据，以index为key.
				swiperHeightData: {}
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

				//获取文章列表
				this.loadHotListFromTab();
			},
			//获取文章列表数据
			async loadHotListFromTab() {

				if (!this.listData[this.currentIndex]) { //未缓存过数据
					this.isLoading = true;
					const id = this.tabData[this.currentIndex].id;
					const res = await getHostListFromTabType(id);
					// console.log(res);
					//数据缓存
					this.listData[this.currentIndex] = res.data.list;
					this.isLoading = false;
					//渲染完成之后，计算高度
					setTimeout(async () => {
						//获取到当前swiper的高度
						this.currentSwiperHeight = await this.getCurrentSwiperHeight();
						//放入缓存
						this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
					}, 0);

				}
				this.isLoading = false;
			},
			//tab点击事件
			onTabClick(index) {
				this.currentIndex = index;
				this.loadHotListFromTab();
			},
			//计算当前swiper高度
			getCurrentSwiperHeight() {
				let sum = 0;
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.selectAll(`.hot-list-item-${this.currentIndex}`)
						.boundingClientRect(res => {
							res.forEach((item) => {
								sum += item.height;
							})
							resolve(sum);
						}).exec();
				});
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
