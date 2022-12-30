<template>
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view scroll-x class="scroll-view" scroll-with-animation :scroll-left="scrollLeft">
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item,index) in tabData" :key="index">
							<view class="tab-item" :id="'_tab_'+index"
								:class="{'tab-item-active':activeIndex === index}" @click="onTabClick(index)"
								:style="{color:activeIndex === index?defaultConfig.activeTextColor:defaultConfig.textColor}">

								{{item.label||item}}
							</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view class="underLine" :style="{transform:'translateX('+slider.left+'px)',
					width:defaultConfig.underLineWidth+'px',height:defaultConfig.underLineHeight+'px',
					backgroundColor:defaultConfig.underLineColor}"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-tabs",
		props: {
			config: {
				type: Object,
				default: () => {
					return {};
				}
			},
			tabData: {
				type: Array,
				default: () => {
					return [];
				}
			},
			defaultIndex: {
				type: Number,
				default: 0
			}

		},

		data() {
			return {
				//内部维护的数据对象，为每个Item单独维护一个slider滑块对象
				tabList: [],
				//当前激活项
				activeIndex: -1,
				//滑块
				slider: {
					//滑块距左侧距离
					left: 0
				},
				//scrollview横向滚动位置
				scrollLeft: 0,
				//默认配置
				defaultConfig: {
					//默认字体颜色
					textColor: '#333333',
					//高亮的字体颜色
					activeTextColor: '#f94d2a',
					//下划线的宽度
					underLineWidth: 24,
					//下划线高度
					underLineHeight: 2,
					//下划线颜色
					underLineColor: '#f94d2a'
				}
			};
		},
		methods: {
			//更新tab的宽度
			updateTabWidth() {
				//tabitem的宽度，tabItem的left,为tabList中的每个item维护一个slider对象
				let data = this.tabList;
				if (data.length === 0)
					return;
				//uniapp中拿到渲染之后的dom 
				//获取dom的固定写法
				const query = uni.createSelectorQuery().in(this);
				//循环数据源
				data.forEach((item, index) => {
					// 获取 dom 的固定写法
					query
						.select('#_tab_' + index)
						.boundingClientRect((res) => {
							// 为数据对象中每一个 item 都维护一个 _slider（滑动条） 对象
							item._slider = {
								// 当前的 tab 距离左侧的距离
								left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
							};
							// 运算完成之后，执行一次 【滑块】位置运算
							if (data.length - 1 === index) {
								this.tabToIndex();
							}
						})
						.exec();
				});
			},
			//tabitem的点击事件
			onTabClick(index) {
				this.activeIndex = index;
				this.tabToIndex();
				//发送一个通知，表示激活项发生变化
				this.$emit('tabCLick', index)
			},
			//根据当前的activeIndex,计算滑块滚动
			tabToIndex() {
				const index = this.activeIndex;
				//计算滑块滚动
				this.slider = {
					// 计算公式：`滑块左侧位置 = item.left + (item.width - slider.width) / 2`
					left: this.tabList[index]._slider.left
				};
				//控制scrollview进行横向滚动
				this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth;
			}

		},
		//监听器
		watch: {
			//监听样式变化
			config: {
				//当config发生变化时的回调方法
				handler(val) {
					this.defaultConfig = {
						...this.defaultConfig,
						...val
					};

				},
				//表示当前的回调将会在侦听开始之后立即被调用
				immediate: true
			},
			//监听激活项目的变化
			tabData: {
				//当tabData发生变化时的回调方法
				handler(val) {
					this.tabList = val;
					//维护tabList中的每个item,为DOM渲染完成之后
					//uniapp $nextTick()存在兼容性问题
					setTimeout(() => {
						this.updateTabWidth();
					}, 0)
				},
				//表示当前的回调将会在侦听开始之后立即被调用
				immediate: true
			},
			//监听激活项目的变化
			defaultIndex: {
				//当defaultIndex发生变化时的回调方法
				handler(val) {
					this.activeIndex = val;
				},
				//表示当前的回调将会在侦听开始之后立即被调用
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-container {
		font-size: $uni-font-size-base;
		height: 45px;
		line-height: 45px;
		background-color: $uni-bg-color;
	}

	.tab-box {
		width: 100%;
		height: 45px;
		display: flex;
		position: relative;
	}

	.scroll-view {
		white-space: nowrap;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.scroll-content {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.tab-item-box {
		height: 100%;
	}

	.tab-item {
		height: 100%;
		display: inline-block;
		text-align: center;
		padding: 0 15px;
		position: relative;
		color: $uni-text-color;

		&-active {
			color: $uni-text-color-hot;
		}
	}

	.underLine {
		height: 2px;
		width: 24px;
		background-color: $uni-text-color-hot;
		border-radius: 3px;
		transition: .5s;
		position: absolute;
		bottom: 0;
	}
</style>
