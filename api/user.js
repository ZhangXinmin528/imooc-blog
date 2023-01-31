import request from '../utils/request.js'

/**
 * 用户登录接口
 * @param {Object} data
 */
export function login(data) {
	return request({
		url: '/sys/login',
		method: 'POST',
		data
	});
}

/**
 * 关注用户
 * @param {Object} data
 */
export function userFollow(data) {
	return request({
		url: '/user/follow',
		data
	});
}

/**
 * 发表评论
 * @param {Object} data
 */
export function userArticleComment(data) {
	return request({
		url: '/user/article/comment',
		method: 'POST',
		data
	});
}
/**
 * 用户点赞
 * @param {Object} data
 */
export function userPraise(data) {
	return request({
		url: '/user/praise',
		data
	});
}

/**
 * 用户收藏
 * @param {Object} data
 */
export function userCollect(data) {
	return request({
		url: '/user/collect',
		data
	});
}
