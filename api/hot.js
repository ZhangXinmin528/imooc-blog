import request from '../utils/request.js'

/**
 * 热搜文章类型
 */
export function getHotTabs() {
	return request({
		url: '/hot/tabs'
	});
}
