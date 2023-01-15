<template>
	<view>

	</view>
</template>

<script>
	import {
		getArticleDetail
	} from '../../../api/article.js'

	export default {
		data() {
			return {
				//作者
				author: '',
				//文章Id
				articleId: '',
				//文章详情数据
				articleData: null
			};
		},
		onLoad(options) {
			this.author = options.author;
			this.articleId = options.articleId;

			this.loadArticleDetail();
		},
		methods: {
			async loadArticleDetail() {
				//展示loading
				uni.showLoading({
					title: '加载中',
				});
				const res = await getArticleDetail({
					author: this.author,
					articleId: this.articleId,
				});

				this.articleData = res.data;

				console.log(this.articleData);
			}
		},
	}
</script>

<style lang="scss">

</style>
