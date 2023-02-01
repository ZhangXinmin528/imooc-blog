import App from './App'

// #ifndef VUE3
import Vue from 'vue'

//导入store实例
import store from './store'
//引入公共样式
import './styles/global.scss';
//引入文章详情样式
import './styles/article-detail.scss';

//注册过滤器最佳实践代码
import * as filters from './filters';

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	//挂载实例
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
