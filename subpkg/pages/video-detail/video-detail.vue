<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video id="myVideo" class="video" :src="videoData.play_url" :danmu-list="danmuList" enable-danmu
				danmu-btn></video>
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
		<!-- 弹幕模块 -->
		<view class="danmu-box">
			<!-- 数据加载中 -->
			<uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
			<!-- 无数据 -->
			<empty-data v-else-if="commentList.length ===0"></empty-data>
			 <!-- 弹幕列表 -->
				<view class="comment-container" v-else>
					<view class="all-comment-title">全部弹幕</view>
					<view class="list">
						<block v-for="(item,index) in commentList" :key="index">
							<article-comment-item :data="item"></article-comment-item>
						</block>
					</view>
				</view>
		</view>
		<!-- 底部功能区 -->
		<article-operate placeholderText="发个弹幕开心一下..." @commitClick="onCommit"></article-operate>
		<!-- popup -->
		<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
			<article-comment-commit v-if="isShowCommit" :articleId="videoData.id" @success="onSendDanmu">
			</article-comment-commit>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		getVideoDanmuList
	} from 'api/video'
	import {
		getRandomColor
	} from 'utils/index'

	export default {
		data() {
			return {
				//弹幕数据源
				danmuList: [],
				//评论数据源
				commentList: [],
				isShowCommit: false,
				videoContext: null,
				//弹幕数据获取状态
				isLoadingComment: true
			};
		},
		computed: {
			...mapState('video', ['videoData'])
		},
		created() {
			this.loadVideoDanmuList();
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {

			/**
			 * 获取视频弹幕数据
			 */
			async loadVideoDanmuList() {
				const res = await getVideoDanmuList({
					videoId: this.videoData.id
				});
				// console.log(res);
				res.data.list.forEach((item) => {
					item.color = getRandomColor();
				});
				this.danmuList = [...res.data.list];
				this.commentList = [...res.data.list];
				this.isLoadingComment = false;

			},
			//发送弹幕点击事件
			onCommit() {
				this.$refs.popup.open();
			},
			//popup发生变化
			onCommitPopupChange(e) {
				if (e.show) {
					this.isShowCommit = e.show;
				} else {
					setTimeout(() => {
						this.isShowCommit = e.show;
					}, 200);
				}

			},
			//发送弹幕
			onSendDanmu(data) {
				this.videoContext.sendDanmu({
					text: data.content,
					color: getRandomColor()
				});
				//添加弹幕到列表
				this.commentList.unshift(data);
				//关闭popup
				this.$refs.popup.close();
				//更新标记
				this.isShowCommit = false;
				//提示用户
				uni.showToast({
					title: '发表成功',
					icon: 'success'
				});
			},


		}
	}
</script>

<style lang="scss" scoped>
	.video-detail-container {
		.video-box {
			background-color: $uni-bg-color;
			position: sticky;
			top: 0;
			z-index: 9;

			.video {
				width: 100%;
				height: 230px;
			}
		}

		.danmu-box {
			border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
			margin-bottom: 36px;

			.comment-container {
				padding: $uni-spacing-col-lg $uni-spacing-row-lg;

				.all-comment-title {
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
			}
		}
	}
</style>
