<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			//H5编译平台
			// #ifdef H5
			console.log('当前处于H5编译平台~');
			// #endif
			// #ifndef H5
			console.log('当前处于非H5编译平台~');
			// #endif

		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
