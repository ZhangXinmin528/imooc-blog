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

/**
 * 获取文章评论列表接口
 * @param {Object} data 请求参数
 */
export function getArticleCommentList(data) {
	return request({
		url: '/article/comment/list',
		data
	});
}
