//这是头部logo和搜索模块
define(['vue'],function(Vue){
	const footer = Vue.extend({
		template:'	<div>\
						<!-- 关于我们 -->\
						<div class="aboutus">\
							<div class="content">\
								<p class="p1">关于我们</p>\
								<p>联系我们：contact@xinkeher.com</p>\
								<p>公司地址：北京市朝阳区大望路soho现代城</p>\
								<p>官方客服电话：010-83421842</p>\
							</div>\
						</div>\
						<!-- 脚部 -->\
						<div class="footer">©Copyright 2016北京信达科技有限公司&nbsp&nbsp&nbsp京ICP备&nbsp&nbsp&nbsp16011621号</div>\
					</div>\
				'
	})
	//绑定
	Vue.component('vue-footer',footer)
})







