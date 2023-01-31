<template>
	<view class="hot-video-container">
		<!-- 1.导入mescroll -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<block v-for="(item,index) in videoList" :key="index">
				<hot-video-item :data="item" @click="onItemClick"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	//2.导入
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins'
	import {
		getHotVideoList
	} from 'api/video'
	import {
		mapMutations
	} from 'vuex'

	export default {
		//3.注册
		mixins: [MescrollMixin],
		data() {
			return {
				page: 1,
				size: 10,
				//是否首次加载
				isInit: true,
				//数据集合
				videoList: [],
				//实例
				mescroll: null
			};
		},
		created() {
			// this.loadHotVideoList();
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll;
		},
		methods: {
			...mapMutations('video', ['setVideoData']),
			//获取热播列表数据
			async loadHotVideoList() {
				const res = await getHotVideoList({
					page: this.page,
					size: this.size
				});
				// console.log(res);
				if (this.page === 1) {
					this.videoList = res.data.list;
				} else {
					this.videoList = [...this.videoList, ...res.data.list];
				}

			},
			//列表首次加载
			async mescrollInit() {
				await this.loadHotVideoList();
				this.isInit = false;
				//结束上拉加载和下拉刷新
				this.mescroll.endSuccess();
			},
			async downCallback() {
				if (this.isInit)
					return;
				this.page = 1;
				await this.loadHotVideoList();
				this.mescroll.endSuccess();
			},
			async upCallback() {
				if (this.isInit)
					return;
				this.page += 1;
				await this.loadHotVideoList();
				this.mescroll.endSuccess();
			},
			//点击事件
			onItemClick(data) {
				//跳转视频播放详情页，传递数据
				this.setVideoData(data);
				uni.navigateTo({
					url: '/subpkg/pages/video-detail/video-detail'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-video-container {
		background-color: $uni-bg-color-grey;
	}
</style>
