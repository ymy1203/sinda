//这是头部登录注册模块
define(['vue'],function(Vue){
	const header = Vue.extend({
		template:'	<!-- 头部 -->\
					<div class="header">\
						<div class="content">\
							<span>欢迎来到信达！</span>\
							<a href="login.html">登录</a>\
							<a href="register.html">快速注册</a>\
							<div class="f-r">\
								<span class="cart f-l"></span>\
								<span>购物车<span class="cart_num">0</span>件</span>\
								<span class="col_b fws">服务商入口</span>\
							</div>\
						</div>\
					</div>\
				'
	})
	//绑定
	Vue.component('vue-header',header)
})