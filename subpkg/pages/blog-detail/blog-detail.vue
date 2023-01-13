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
				articleId: ''
			};
		},
		onLoad(options) {
			this.author = options.author;
			this.articleId = options.articleId;
			console.log(this.author);
			console.log(this.articleId);
		}
	}
</script>

<style lang="scss">

</style>
