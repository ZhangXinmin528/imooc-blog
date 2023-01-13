//1.导入dayjs
import dayjs from 'dayjs';
//2.dayjs默认是英文，需要把语言配置成中文，导入中文语言包
import 'dayjs/locale/zh-cn';
//3.导入relativeTime模块
import rTime from 'dayjs/plugin/relativeTime';
//4.加载中中文语言包到dayjs中
dayjs.locale('zh-cn');
//5.加载相对时间模块
dayjs.extend(rTime);
//6.
/**
 * 定义过滤器，把当前时间处理为相对时间
 * @param {Object} val
 */
export function realtiveTime(val) {
	//to()是将当前时间转化为相对时间的方法；
	return dayjs().to(dayjs(val));
}


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
