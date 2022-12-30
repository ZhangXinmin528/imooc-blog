//封装网络请求
const BASE_URL = "https://mock.mengxuegu.com/mock/63ac0a94fef1752f04c0030b";

/**
 * 封装网络请求
 * @param {*} param0 
 * @returns 
 */
function request({
	url,
	data,
	method
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data,
			method,
			header: {
				// Authorization: store.state.user.token
			},
			sslVerify: true,
			success: ({
				data,
				statusCode,
				header
			}) => {
				if (data.success) {
					// console.log(data.data)
					//请求成功
					resolve(data);
				} else {
					//请求失败，给用户提示
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					})
					reject(data.message)
				}
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

export default request;
