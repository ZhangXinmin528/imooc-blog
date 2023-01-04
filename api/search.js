import request from '../utils/request.js'

/**
 * 获取默认搜索内容
 */
export function getDefaultText() {
	return request({
		url: '/search/default-text'
	});
}
