<template>
	<div class="foot">
		<!-- 底部导航 -->
		<ul class="foot-nav">
			<li class="foot-nav_line">
				<span class="foot-nav_icon"></span>
				<div class="foot-nav_img"></div>
			</li>
			<li class="foot-nav_line">
				<span class="foot-nav_icon"></span>
				<div class="foot-nav_img"></div>
			</li>
			<li class="foot-nav_line">
				<span class="foot-nav_icon"></span>
				<div class="foot-nav_img"></div>
			</li>
			<li class="foot-nav_line">
				<a href="mailto:1521624684@lwpersonal.cn,1521624684@qq.com?subject=邮箱留言&body=留言："
				   class="foot-nav_icon"
				   title="邮箱留言"></a>
			</li>
		</ul>
		<div class="foot-icon">
			<ul class="hacker-icon">
				<li class="iconson"></li>
				<li class="iconson"></li>
				<li class="iconson"></li>
				<li class="iconson"></li>
				<li class="iconson"></li>
			</ul>
		</div>
		<div class="foot-dec clearfix">
			<!-- 声明 -->
			<div class="foot-icon_botom"></div>
			<p class="foot-font">蒙ICP备16004669&nbsp;
				<a href="mailto:1521624684@qq.com,1521624684@lwpersonal.cn?subject=网站反馈&body=反馈：">网站反馈</a> 丨
				<a href="http://lwpersonal.cn"
				   target="_blank">lwpersonal.cn</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.foot {
	width: 100%;
	height: 1.5rem;
	margin: .1rem 0 0 0;
	border-top: .01rem solid #34778b;
	background: #1b3b56;
}

.foot-icon {
	position: relative;
	left: 1.5rem;
	width: 1.5rem;
	height: .95rem;
	padding: .1rem 0;
	background: #83c335;
	background-size: .6rem;
}

.foot-nav {
	float: right;
	margin: 0 20% 0 0;
}

.foot-nav_line {
	float: left;
	width: .6rem;
	height: .6rem;
	margin: .2rem .8rem 0 0;
	border-radius: 50%;
	.foot-nav_icon {
		display: block;
		width: .6rem;
		height: .6rem;
		background: url(img/icon/sprite.png);
	}
}

.foot-nav_img {
	position: relative;
	visibility: hidden;
	opacity: 0;
	top: -2.2rem;
	left: -.45rem;
	width: 1.5rem;
	height: 1.5rem;
	transition: all ease 1s;
}

.foot-nav_line:hover {
	.foot-nav_img {
		opacity: 1;
		visibility: visible;
	}
}

.foot-nav_line:nth-child(1) {
	.foot-nav_img {
		background: url(img/weibo.png);
		background-size: 1.5rem 1.5rem;
	}
}

.foot-nav_line:nth-child(1):hover {
	.foot-nav_icon {
		background-position: 0 -.62rem;
	}
}

.foot-nav_line:nth-child(2) {
	.foot-nav_icon {
		background-position: -.62rem -.02rem;
	}
	.foot-nav_img {
		background: url(img/weixin.png);
		background-size: 1.5rem 1.5rem;
	}
}

.foot-nav_line:nth-child(2):hover {
	.foot-nav_icon {
		background-position: -.62rem -.64rem;
	}
}

.foot-nav_line:nth-child(3) {
	.foot-nav_icon {
		background-position: -1.22rem -.02rem;
	}
	.foot-nav_img {
		background: url(img/QQ.png);
		background-size: 1.5rem 1.5rem;
	}
}

.foot-nav_line:nth-child(3):hover {
	.foot-nav_icon {
		background-position: -1.22rem -.64rem;
	}
}

.foot-nav_line:nth-child(4) {
	.foot-nav_icon {
		background-position: -1.84rem -.02rem;
	}
}

.foot-nav_line:nth-child(4):hover {
	.foot-nav_icon {
		background-position: -1.84rem -.64rem;
	}
}

.friend-href {
	float: right;
}

.foot-dec {
	width: 100%;
	height: 1rem;
	background: #e5eaf2;
}

.foot-icon_botom {
	position: relative;
	float: left;
	left: 1.5rem;
	width: 1.5rem;
	height: .5rem;
	background: #e5b73d;
}

.foot-font {
	color: #5e5a5a;
	text-align: center;
	font-size: .14rem;
	line-height: .5rem;
	> a {
		color: #EA6418;
	}
}
</style>