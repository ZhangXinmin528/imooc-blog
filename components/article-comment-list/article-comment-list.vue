<template>
	<view class="comment-limit-container" v-if="!isShowAllComment">
		<view class="comment-title">精简评论</view>
		<block v-for="(item,index) in commentList.slice(0,2)" :key="index">
			<!-- item项 -->
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
		<!-- 查看更多 -->
		<view class="show-more" @click="onMoreClick">查看更多评论</view>
	</view>
	<!-- 展示全部评论 -->
	<view class="comment-all-container" v-else>
		<!-- 1.通过mescroll-body包裹列表，指定ref为scrollRef,监听@init,@down，@up事件 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="{use:false}"
			:up="{textNoMore:'--我也是有底线的！--'}">

			<view class="comment-title">全部评论</view>
			<block v-for="(item,index) in commentList" :key="index">
				<!-- item项 -->
				<article-comment-item :data="item.info"></article-comment-item>
			</block>
			<!-- 查看更多 -->
			<!-- <view class="show-more" @click="onMoreClick">查看更多评论</view> -->
		</mescroll-body>
	</view>
</template>

<script>
	import {
		getArticleCommentList
	} from 'api/article';

	//2.导入对应的mixins
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'

	export default {
		name: "article-comment-list",
		//3.注册 mixins
		mixins: [MescrollMixin],
		props: {
			//文章id
			articleId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				//当前页数
				page: 1,
				//每页评论数
				pageSize: 5,
				//数据源
				commentList: [],
				//是否展示全部数据
				isShowAllComment: false,
				//当页面为首次渲染时，不只会回调init方法，还会回调down和up方法。
				isInit: true,
				//mescroll实例
				mescroll: null,
				//评论总数量
				commentListTotal: 0
			};
		},
		created() {
			this.loadCommentList();
		},
		methods: {
			//首次加载
			async mescrollInit() {
				console.log("list size 1:" + this.commentList.length);
				await this.loadCommentList();
				this.isInit = false;
				//首次加载完成，关闭上拉加载更多动画；
				//endSuccess表示数据加载完成，动画关闭
				this.getMescroll().endSuccess();
				//判断数据是否加载完成
				this.getMescroll().endBySize(this.commentList.length, this.commentListTotal);
				console.log("list size 2:" + this.commentList.length);
			},
			//上拉加载更多
			async upCallback() {
				if (this.isInit)
					return;
				this.page += 1;
				await this.loadCommentList();
				this.getMescroll().endSuccess();
				//判断数据是否加载完成
				this.getMescroll().endBySize(this.commentList.length, this.commentListTotal);

			},
			//获取评论列表数据
			async loadCommentList() {
				const res = await getArticleCommentList({
					articleId: this.articleId,
					page: this.page,
					pageSize: this.pageSize
				});

				//评论总数
				this.commentListTotal = res.data.count;

				if (this.page === 1) {
					this.commentList = res.data.list;
				} else {
					this.commentList = [...this.commentList, ...res.data.list];
				}

			},
			//查看全部评论
			onMoreClick() {
				this.isShowAllComment = true;
			},
			//获取mescroll对象实例
			getMescroll() {
				if (!this.mescroll) {
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
				return this.mescroll;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-title {
		font-weight: bold;
		color: $uni-text-color-title;
		font-size: $uni-font-size-lg;
		margin: $uni-spacing-col-lg 0;
	}

	.show-more {
		color: $uni-text-color-more;
		font-size: $uni-font-size-base;
		margin: $uni-spacing-col-lg;
		text-align: center;
	}
</style>
