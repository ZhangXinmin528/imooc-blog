import request from '../utils/request'

/**
 * 获取热播列表
 * @param {Object} data
 */
export function getHotVideoList(data) {
	return request({
		url: '/video/list',
		data
	});
}

/**
 * 获取视频弹幕数据
 * @param {Object} data
 */
export function getVideoDanmuList(data) {
	return request({
		url: '/video/danmu',
		data
	});
}
