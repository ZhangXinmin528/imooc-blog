<template>
	<view class="search-result-list-container">
		<empty-data v-if="isEmpty"></empty-data>
		<!-- 1.通过mescroll-body包裹列表，指定ref为scrollRef,监听@init,@down，@up事件 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" v-else>

			<!-- 循环渲染 -->
			<block v-for="(item,index) in resultList" :key="index">
				<view class="search-result-item-box">
					<search-result-item-theme-1 :data="item" v-if="!item.pic_list || item.pic_list.length ===0">
					</search-result-item-theme-1>

					<search-result-item-theme-2 :data="item" v-else-if=" item.pic_list.length ===1">
					</search-result-item-theme-2>

					<search-result-item-theme-3 :data="item" v-else>
					</search-result-item-theme-3>
				</view>
			</block>

		</mescroll-body>
	</view>
</template>

<script>
	//2.导入对应的mixins
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {
		getSearchResult
	} from '../../api/search.js'

	export default {
		name: "search-result-list",
		//3.注册 mixins
		mixins: [MescrollMixin],
		props: {
			//搜索关键字
			queryStr: {
				type: String,
				required: true
			}

		},
		// created() {
		// this.loadSearchResult();
		// },
		//页面渲染完成之后回调，想要获取组件实例，可在该回调获取
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll;
		},
		data() {
			return {
				//页数
				page: 1,
				//数据请求结果
				resultList: [],
				//当页面为首次渲染时，不只会回调init方法，还会回调down和up方法。
				isInit: true,
				//mescroll实例
				mescroll: null,
				//是否无数据
				isEmpty: false
			};
		},
		methods: {
			//4.回调方法
			//首次加载
			async mescrollInit() {
				console.log('首次加载');
				await this.loadSearchResult();
				this.isInit = false;
				//首次加载完成，关闭上拉加载更多动画；
				//endSuccess表示数据加载完成，动画关闭
				this.mescroll.endSuccess();
			},
			//下拉刷新回调
			async downCallback() {

				if (this.isInit)
					return;
				console.log('下拉刷新回调');
				this.page = 1;
				await this.loadSearchResult();
				//endSuccess表示数据加载完成，动画关闭
				this.mescroll.endSuccess();
			},
			//上拉加载
			async upCallback() {

				if (this.isInit)
					return;
				console.log('上拉加载');
				this.page += 1;
				await this.loadSearchResult();
				//endSuccess表示数据加载完成，动画关闭
				this.mescroll.endSuccess();
			},
			async loadSearchResult() {
				const res = await getSearchResult({
					q: this.queryStr,
					p: this.page
				});

				res.data.list.forEach((item) => {
					item.title = item.title.replace(/<em>/g, "<em style='color:#f94d2a;margin: 0 2px'>");
					item.description = item.description.replace(/<em>/g,
						"<em style='color:#f94d2a;margin: 0 2px'>");
				});


				if (this.page === 1) {
					//下拉刷新
					this.resultList = res.data.list;
				} else {
					//上拉加载
					this.resultList = [...this.resultList, ...res.data.list];
				}

				if (this.resultList.length === 0) {
					this.isEmpty = true;
				}
			}

		}

	}
</script>

<style lang="scss" scoped>
	.search-result-list-container {
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;

	}

	.search-result-item-box {
		margin-bottom: $uni-spacing-col-big;
	}
</style>
