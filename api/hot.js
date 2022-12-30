import request from '../utils/request.js'

/**
 * 热搜文章类型
 */
export function getHotTabs() {
	return request({
		url: '/hot/tabs'
	});
}
/**
 * 请求热搜文章列表
 * @param {Object} type 文章类型
 */
export function getHostListFromTabType(type) {
	return request({
		url: '/hot/list',
		data: {
			type
		}
	});
}
