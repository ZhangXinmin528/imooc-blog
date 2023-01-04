/**字符串格式化
 * @param {Object} val
 */
export function hotNumber(val) {
	const num = parseInt(val);
	if (num < 1000)
		return val;
	else {
		val = val + "";
		return val.substring(0, val.length - 3) + 'k';
	}

}
