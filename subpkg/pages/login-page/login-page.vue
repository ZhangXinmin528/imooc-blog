<template>
	<my-login @onLoginSuccess="onLoginSuccess"></my-login>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			//用户登陆成功后的事件回调
			onLoginSuccess() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
