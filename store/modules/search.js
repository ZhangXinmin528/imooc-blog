const STORAGE_KEY = 'search-list';
//数据持久化
//1.数据的保存
//2.数据的读取
export default {
	//指定当前模块 独立命名空间
	namespaced: true,
	//通过state声明数据
	state: () => {
		return { //暴露数据
			//测试数据
			// msg: 'hello vuex'
			//搜索历史数据
			searchData: uni.getStorageSync(STORAGE_KEY) || []
		};
	},
	//state中的数据不能直接修改，可以通过提交一个mutations进行修改
	mutations: {

		/**保存数据到storage
		 * @param {Object} state
		 */
		saveToStorage(state) {
			uni.setStorage({
				key: STORAGE_KEY,
				data: state.searchData,
			})
		},

		/**添加数据
		 * @param {Object} state 必须参数，表示当前模块的参数
		 * @param {Object} val 
		 */
		addSearchData(state, val) {
			if (!val)
				return;
			const index = state.searchData.findIndex((item) => item === val);
			if (index !== -1) { //关键词不存在
				state.searchData.splice(index, 1);
			}
			//添加数据
			state.searchData.unshift(val);
			//在vuex 模块中，通过this.commit函数调用mutation
			//this.commit 函数接收一个字符串为当前mutation的路径this.commit('模块名/mutation名')
			this.commit('search/saveToStorage');
		},
		/**
		 * 删除指定数据
		 * @param {Object} state
		 * @param {Object} index
		 */
		removeSearchData(state, index) {
			state.searchData.splice(index, 1);
			this.commit('search/saveToStorage');
		},
		/**删除所有数据
		 * @param {Object} state
		 */
		removeAllSearchData(state) {
			state.searchData = [];
			this.commit('search/saveToStorage');
		}
	},

};
