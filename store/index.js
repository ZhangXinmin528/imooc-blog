//全局状态管理工具
//1.导入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';
//导入search.js 暴露数据对象
import search from './modules/search'
import user from './modules/user'

//2.安装 vuex插件
Vue.use(Vuex);

//3.创建 store实例
const store = new Vuex.Store({
	modules: {
		search,
		user
	}
});

export default store;
