import {
	login
} from 'api/user';

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user-info';

export default {
	namespaced: true,
	state: () => ({
		//用户token
		token: uni.getStorageSync(TOKEN_KEY) || '',
		//用户信息
		userInfo: uni.getStorageSync(USER_INFO_KEY) || {}
	}),
	mutations: {
		//保存token到vuex
		setToken(state, token) {
			state.token = token;
			this.commit('user/saveToToken');
		},
		//保存userInfo 到vuex
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			this.commit('user/saveToUserInfo');
		},
		//保存token到本地存储
		saveToToken(state) {
			uni.setStorage({
				key: TOKEN_KEY,
				data: state.token
			});
		},
		//删除token
		removeToken(state) {
			state.token = '';
			this.commit('user/saveToToken');
		},
		//保存userinfo到本地储存
		saveToUserInfo(state) {
			uni.setStorage({
				key: USER_INFO_KEY,
				data: state.userInfo
			});
		},
		//删除用户信息
		removeUserInfo(state) {
			state.userInfo = '';
			this.commit('user/saveToUserInfo');
		}
	},
	//actions 中完成异步操作
	actions: {
		//完成登录
		async login(context, userProfile) {
			const userInfo = userProfile.userInfo;
			//调用登录接口
			const res = await login({
				signature: userProfile.signature,
				iv: userProfile.iv,
				nickName: userInfo.nickName,
				gender: userInfo.gender,
				city: userInfo.city,
				province: userInfo.province,
				avatarUrl: userInfo.avatarUrl
			});

			//TODO:完善登录逻辑
			this.commit('user/setToken', res.data.token);
			this.commit('user/setUserInfo', userInfo);
			// console.log(res);
		},
		//退出登录
		logout(context) {
			this.commit('user/removeToken');
			this.commit('user/removeUserInfo');
		},
		//判断用户登录状态
		async isLogin(context) {
			if (context.state.token)
				return true;
			//如果用户为登录，则引导用户进入登录页面
			const [error, res] = await uni.showModal({
				title: '登录之后才可以进行后续操作',
				content: '立即跳转到登录页面？（登录后会自动返回当前页面哦~）'
			});
			const {
				cancel,
				confirm
			} = res;
			if (confirm) {
				uni.navigateTo({
					url: '/subpkg/pages/login-page/login-page'
				});
			}
			// console.log(result);
			return false;
		}
	}
}
