<template>
	<div class="head">
		<!-- 顶部导航 -->
		<div class="nav-box">
			<ul class="hacker-icon">
				<li class="iconson"></li>
				<li class="iconson"></li>
				<li class="iconson"></li>
				<li class="iconson"></li>
				<li class="iconson"></li>
			</ul>
	
			<el-button class="logoin iconfont" type="text" @click="dialogVisible = true">&#xe736;</el-button>
	
			<el-dialog title="提示" v-if="log_in" v-model="dialogVisible" size="tiny">
				<span>已经登录为管理员，确认退出登录吗！</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="loginOut">确 定</el-button>
				</span>
			</el-dialog>
	
			<el-dialog v-if="!log_in" title="管理员登录" v-model="dialogVisible" :close-on-click-modal="false" size="tiny">
				<input class="logoInput" type="password" placeholder="请输入密码" v-model="password">
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="logoin" :loading="logoin_sta">确 定</el-button>
				</span>
			</el-dialog>
	
			<ul class="nav">
				<li class="nav-line" data-js="home" @click.capture="navClicked" v-bind:class="{ nav_clicked: nav.home }">
					<div class="line-box">
						<router-link :class="line_to" to="/">首页</router-link>
					</div>
					<p class="line-english" :class="{line_english: nav.home}">Home</p>
				</li>
				<li class="nav-line" data-js="article" @click="navClicked" v-bind:class="{ nav_clicked: nav.article }">
					<div class="line-box">
						<router-link :class="line_to" to="/article?byself=false">文摘</router-link>
					</div>
					<p class="line-english" :class="{line_english: nav.article}">Article</p>
				</li>
				<li class="nav-line" data-js="learn" @click="navClicked" v-bind:class="{ nav_clicked: nav.learn }">
					<div class="line-box">
						<router-link :class="line_to" to="/learn?byself=true">学无止境</router-link>
					</div>
					<p class="line-english" :class="{line_english: nav.learn}">Learn</p>
				</li>
				<li class="nav-line" data-js="review" @click="navClicked" v-bind:class="{ nav_clicked: nav.review }">
					<div class="line-box">
						<router-link :class="line_to" to="/review">留言板</router-link>
					</div>
					<p class="line-english" :class="{line_english: nav.review}">Review</p>
				</li>
				<li class="nav-line" data-js="aboutMe" @click="navClicked" v-bind:class="{ nav_clicked: nav.aboutMe }">
					<div class="line-box">
						<router-link :class="line_to" to="/aboutMe">关于我</router-link>
					</div>
					<p class="line-english" :class="{line_english: nav.aboutMe}">AboutMe</p>
				</li>
				<li v-if="log_in" class="nav-line" data-js="system" @click="navClicked" :class="{ nav_clicked: nav.system }">
					<div class="line-box">
						<router-link :class="line_to" to="/system">系统管理</router-link>
					</div>
					<p class="line-english" :class="{line_english: nav.system}">System</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// 轮播图
import { Slide } from '../../static/js/slide.js'
const CryptoJS = require('crypto-js');

export default {
	name: 'head',
	data() {
		return {
			// 弹窗
			dialogVisible: false,
			password: '', // 密码
			logoin_sta: false, // 加载动画
			log_in: false,
			// Navstatus
			clickedName: '',
			clicked: true,
			nav: {
				home: false,
				article: false,
				learn: false,
				system: false,
				aboutMe: false,
				review: false,
			},
			// 
			obj: {
				a: 1
			},
			line_to: 'line_to'
		}
	},
	component: {
		"content_2": {
			template: '<p>I am content-2</p>'
		}
	},
	watch: {
		dialogFormVisible() {
			console.log('change');
		},
		clicked: function () {
			console.log(this.nav.home + 'home');
			if (this.nav.home) {
				$(function () {
					Slide.init($('[data-js="slide"]'));
				})
			}
		}
	},
	computed: {
	},
	methods: {
		loginOut() {
			// 退出登录
			const _this = this;
			this.dialogVisible = false;
			this.axios.post('api/login/out').then(function (res) {
				if (res.data.code === 0) {
					_this.log_in = false;
				} else {
					_this.$notify({
						title: '警告',
						message: '请求出错！',
						type: 'warning'
					});
				}
			}).catch(function (err) {
				console.log(err);
				_this.$notify({
					title: '警告',
					message: '请求出错！',
					type: 'warning'
				});
			});
		},
		logoin() {
			// 登录验证的回调函数
			this.logoin_sta = true;
			const _this = this;
			const hash = CryptoJS.SHA1(this.password);
			let params = new URLSearchParams();
			params.append('password', hash.toString());
			this.axios.post('api/login', params).then(function (res) {
				_this.logoin_sta = false;
				console.log(res.data);
				if (res.data.code === 0) {
					_this.$notify({
						title: '成功',
						message: '以管理员身份登录,获得管理权限！',
						type: 'success'
					});
					_this.log_in = true;
					_this.dialogVisible = false;
				} else if (res.data.code === 101) {
					_this.$notify({
						title: '警告',
						message: '密码错误！',
						type: 'warning'
					});
				} else if (res.data.code === 1) {
					_this.$notify.error({
						title: '错误',
						message: '登录出错，请稍后再试！'
					});
					_this.dialogVisible = false;
				}
			}).catch(function (err) {
				_this.logoin_sta = false;
				this.$notify.error({
					title: '错误',
					message: '登录出错，请稍后再试！'
				});
				console.log(err);
			});
			this.password = '';
		},
		navClicked(e) {
			var e = $.event.fix(event || window.event);
			if (e.target.nodeName !== 'P') {
				this.clicked = !this.clicked;
				// 浮现的英文标识不可点击
				for (let key in this.nav) {
					this.nav[key] = false;
				}
				let selfDate = $(e.currentTarget).attr('data-js');// target会指向子元素，currentTarget指向本元素 
				this.nav[selfDate] = true;
			}
		}
	},
	created: function () {
		// 判断是否登录
		const _this = this;
		this.axios.post('api/login/status').then(function (res) {
			if (res.data.code === 0) {
				_this.log_in = true;
			} else {
				_this.log_in = false;
			}
		}).catch(function (err) {
			console.log(err);
		});
		const regexp = /\w+/;
		try {
			this.clickedName = regexp.exec(location.hash)[0];
			this.nav[this.clickedName] = true;
		} catch (err) {
			this.nav.home = true;
		}
	}
}

</script>

<style lang="scss" scoped>
@import '../../static/css/common';
.head{
	position: relative;
}
.hacker-icon {
	position: absolute;
	margin: .15rem 0 0 .6rem;
}

.nav-box {
	width: 100%;
	height: 1.2rem;
	background: #1b3b56;
	border-bottom: .01rem solid #34778b;
}

.logoin {
	position: absolute;
	z-index: 999;
	cursor: pointer;
	right: .5rem;
	top: .4rem;
	padding: .05rem; // border: 1.5px #fff solid;
	border-radius: 50%;
	font-size: .18rem;
	color: #333;
	background: #fff;
}

.logoInput {
	appearance: none;
	background-color: #fff;
	background-image: none;
	border-radius: 4px;
	border: 1px solid #bfcbd9;
	box-sizing: border-box;
	color: #1f2d3d;
	display: block;
	font-size: inherit;
	height: 36px;
	line-height: 1;
	outline: 0;
	padding: 3px 10px;
	transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	width: 100%;
}

.nav {
	position: relative;
	top: 50%;
	transform: translate(0, -50%);
	justify-content: center;
	@include flexDiv();
}

.nav-line {
	width: 1rem;
	height: .4rem;
	margin: .1rem 0 0 .2rem;
	border-radius: .05rem;
	box-shadow: .02rem .05rem .05rem #161b1f;
	font-size: .18rem;
	text-align: center;
	line-height: .4rem;
	background: #1b3b56;
	cursor: pointer;
	transition: all ease 0.5s;
	@include prefix(transition, all ease 0.5s);
	@include prefix(transform, skewX(-30deg));
	.line-box {
		@include prefix(transform, skewX(30deg));
	}
}

.line-english {
	position: relative;
	visibility: hidden;
	color: rgba(235, 233, 233, 0);
	top: -.3rem;
	font-size: .14rem;
	transition: all .3s ease;
}

.nav_clicked {
	margin: -.1rem 0 0 .2rem;
	background: #000;
	.line_to {
		color: #EA6418;
	}
}

.line_to {
	display: inline-block;
	width: 110%;
	height: 100%;
	margin: -.05rem
}

.line_english {
	visibility: visible;
	top: 0;
	color: rgba(235, 233, 233, .9);
}

.nav-line:hover {
	margin: -.1rem 0 0 .2rem; // color: #EA6418;
	background: #000;
	.line-english {
		visibility: visible;
		top: 0;
		color: rgba(235, 233, 233, .9);
	}
}
</style>