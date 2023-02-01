<template>
	<view class="my-container">
		<!-- 用户未登录 -->
		<block v-if="!token">
			<image class="avatar avatar-img" src="../../static/images/default-avatar.png"></image>
			<view class="login-desc">
				登陆后可同步数据
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="login-btn" type="primary" @click="getUserInfo">微信用户一键登录</button>
			<!-- #endif -->

			<!-- #ifndef MP-WEIXIN -->
			<button class="login-btn" type="primary" @click="onAutoLogin">一键登录</button>
			<!-- #endif -->
		</block>
		<!-- 用户已登录 -->
		<block v-else>
			<image class="avatar avatar-img" :src="userInfo.avatarUrl"></image>
			<view class="login-desc">
				{{userInfo.nickName}}
			</view>
			<button class="login-btn" type="default" @click="onLogoutClick">退出登陆</button>
		</block>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex';

	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['token', 'userInfo'])
		},
		methods: {
			...mapActions('user', ['login', 'logout']),

			//微信一键登录点击事件
			getUserInfo() {
				// 展示加载框
				uni.showLoading({
					title: '加载中'
				});
				uni.getUserProfile({
					desc: '登录后可同步数据',
					success: async (obj) => {
						// 调用 action ，请求登录接口
						await this.login(obj);
						console.log(obj);
						this.$emit('onLoginSuccess');
					},
					fail: () => {
						uni.showToast({
							title: '授权已取消',
							icon: 'error',
							mask: true
						});
					},
					complete: () => {
						// 隐藏loading
						uni.hideLoading();
					}
				});
			},
			//退出登录
			onLogoutClick() {
				uni.showModal({
					title: '提示',
					content: '推出登录将无法同步数据哦~~',
					success: (confirm, cancel) => {
						if (confirm) {
							this.logout();
						}
					}
				})
			},
			//非微信小程序一键登录
			//此处为模拟数据，方便就行开发调试；真是业务场景可以通过正常的注册以及登录逻辑进行处理
			async onAutoLogin() {
				// 展示加载框
				uni.showLoading({
					title: '加载中'
				});
				await this.login({
					encryptedData: 'BmGEMqpGI5w',
					errMsg: 'getUserProfile:ok',
					iv: 'c+NbINO4CuEWCBYGG2FxWw==',
					rawData: '{"nickName":"小慕同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"}',
					signature: '449a10f11998daf680fe546a5176e6e2973516ce',
					userInfo: {
						nickName: '小慕同学',
						gender: 1,
						language: 'zh_CN',
						city: '',
						province: ''
					}
				});
				this.$emit('onLoginSuccess');
				// 隐藏loading
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 25%;
	}

	.avatar-img {
		width: 78px;
		height: 78px;
	}

	.login-desc {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
		margin-top: $uni-spacing-col-big;
	}

	.login-btn {
		margin-top: $uni-spacing-col-big;
		width: 85%;
	}
</style>
