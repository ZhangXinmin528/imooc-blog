<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video id="myVideo" class="video" :src="videoData.play_url" :danmu-list="danmuList" enable-danmu
				danmu-btn></video>
			<hot-video-info :data="videoData"></hot-video-info>
		</view>
		<!-- 弹幕模块 -->
		<view class="danmu-box">
			<!-- 弹幕列表 -->
			<view class="comment-container">
				 <view class="all-comment-title">全部弹幕</view>
				<view class="list">
					<block v-for="(item,index) in danmuList" :key="index">
						<article-comment-item :data="item"></article-comment-item>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		getVideoDanmuList
	} from 'api/video'

	export default {
		data() {
			return {
				danmuList: []
			};
		},
		computed: {
			...mapState('video', ['videoData'])
		},
		created() {
			this.loadVideoDanmuList();
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
				this.danmuList = res.data.list;
			}

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
