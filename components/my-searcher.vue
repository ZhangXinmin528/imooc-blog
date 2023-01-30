<template>
	<!-- 搜索输入框 -->
	<view class="my-search-container">
		<uni-search-bar v-if="isShowInput" class="my-search-bar" :radius="100" :bgColor="config.backgroundColor"
			:placeholder="placeholderText" @confirm="onSearch" @focus="onFocus" @blur="onBlur" @clear="onClear"
			@cancel="onCancel" @input="onInput" :value="value">

			<uni-icons slot="clearIcon" type="clear" color="#999999"></uni-icons>
		</uni-search-bar>

		<view class="my-search-box" v-else :style="{
			height:config.height+'px', backgroundColor:config.backgroundColor, border:config.border }">
			<image class="icon" :src="config.icon" />
			<text class="placeholder" :style="{color:config.textColor}">{{placeholderText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-searcher",
		props: {
			//输入的内容
			//search-bar不可以使用v-model，直接使用v-model会修改父组件传递过来的数据
			value: {
				type: String
			},
			//是否显示输入框
			isShowInput: {
				type: Boolean,
				default: false
			},
			//样式配置对象
			config: {
				type: Object,
				default: () => ({
					height: 36,
					backgroundColor: '#ffffff',
					icon: '/static/images/search.png',
					textColor: '#454545',
					border: '1px solid #c9c9c9'

				})
			},
			placeholderText: {
				type: String,
				default: '搜索'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			//点击搜索按钮触发
			onSearch() {
				this.$emit("search", this.value);
			},
			//获取脚垫触发
			onFocus() {
				this.$emit("focus", this.value);
			},
			//失去焦点出发
			onBlur() {
				this.$emit("blur", this.value);
			},
			//点击清空按钮
			onClear() {
				this.$emit("clear", this.value);
			},
			//点击取消按钮
			onCancel() {
				this.$emit("cancel", this.value);
			},
			//value改变时触发
			onInput(val) {
				console.log('onInput');
				//通知父组件
				//v-model是vue中完成双向数据板顶的指令，如果说想要应用到组件的绑定中，那么需要遵守以下规则：
				//1.子组件中接收到的值必须以value命名
				//2.子组件中想要修改 value时，必须要发送一个叫做input的事件
				//满足以上两点，父组件可以通过v-model指令把值直接传给value这个props
				this.$emit('input', val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;

		.my-search-bar {
			width: 100%;
		}

		.my-search-box {
			height: 36px;
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: 15px;
			border: 1px solid $uni-bg-color-border;
			display: flex;
			align-items: center;
			padding: 0 $uni-spacing-row-base;

			.icon {
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
			}

			.placeholder {
				font-size: $uni-font-size-sm;
				margin-left: $uni-spacing-row-sm;
				color: $uni-text-color-placeholder;
			}
		}
	}
</style>
