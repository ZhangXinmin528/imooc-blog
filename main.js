import App from './App'

// #ifndef VUE3
import Vue from 'vue'

//引入公共样式
import './styles/global.scss';

//注册过滤器最佳实践代码
import * as filters from './filters';

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
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
