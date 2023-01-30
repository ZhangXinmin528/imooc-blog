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
