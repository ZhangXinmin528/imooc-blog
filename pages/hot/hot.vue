<template>
	<view class="hot-container">
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit" />
		<view class="search-box" @click="onToSearch">
			<my-searcher placeholderText="uni-app 自定义组件"></my-searcher>
		</view>
		<view class="tab-sticky">
			<my-tabs :tabData="tabData" :defaultIndex="currentIndex"
				:config="{textColor:'#333333',activeTextColor:'#f94d2a'}" @tabClick="onTabClick"></my-tabs>
		</view>
		<!-- current属性表示当前展示哪个page -->
		<swiper class="swiper" :current="currentIndex" :style="{height:currentSwiperHeight+'px'}"
			@animationfinish="onSwiperEnd" @change="onSwiperChange">

			<swiper-item class="swiper-item" v-for="(tabItem,tabIndex) in tabData" :key="tabIndex">
				<!-- list视图 -->
				<view>
					<!-- 加载动画 -->
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>

					<block v-else>
						<hot-list-item :class="'hot-list-item-'+tabIndex" v-for="(item,index) in listData[tabIndex]"
							:key="index" :data="item" :ranking="index+1" @click="onItemClick(item)"></hot-list-item>
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
				swiperHeightData: {},
				//当前的滚动距离
				currentPageScrollTop: 0,

			};
		},
		//组件实现配置完成，但是DOM未渲染，进行网络请求，配置响应式数据
		created() {
			this.loadHotTabs();

		},
		onPageScroll(res) {
			// console.log(res);
			this.currentPageScrollTop = res.scrollTop;
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

				// if (!this.listData[this.currentIndex]) { //未缓存过数据
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

				// }
				// this.isLoading = false;
			},
			//tab点击事件
			onTabClick(index) {
				// console.log("onTabClick1", index);
				this.currentIndex = index;
				// this.loadHotListFromTab();
			},
			//swiper切换事件
			onSwiperChange(e) {
				if (this.currentPageScrollTop > 130) {
					uni.pageScrollTo({
						scrollTop: 130
					});
				}
				this.currentIndex = e.detail.current;
			},
			//swiper动画完成，解决切换卡顿问题
			onSwiperEnd() {
				//判断缓存是否存在，不存在再去获取数据
				if (!this.listData[this.currentIndex]) {
					this.loadHotListFromTab();
					return;
				}
				//存在数据缓存，则获取swiper高度数据
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			//跳转到搜索页面
			onToSearch() {
				uni.navigateTo({
					url: "/subpkg/pages/search-blog/search-blog"
				})
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
			},
			//列表item点击事件
			onItemClick(item) {
				uni.navigateTo({
					url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`
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

	.tab-sticky {
		position: sticky;
		z-index: 99;
		top: 0;
	}
</style>
