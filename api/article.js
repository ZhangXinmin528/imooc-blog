import request from '../utils/request.js'

/**
 * 获取文章详情
 * @param {Object} data 请求参数
 */
export function getArticleDetail(data) {
	return request({
		url: '/article/details',
		data
	});
}
