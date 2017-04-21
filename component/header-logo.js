//这是头部logo和搜索模块
define(['vue'],function(Vue){
	const headerLogo = Vue.extend({
		template:'	<div>\
						<div class="search clear">\
							<div class="logo" @click="goIndex"></div>\
							<div class="city">\
								<p>北京市</p>\
								<p class="col_b">[切换城市]</p>\
							</div>\
							<div class="input">\
								<span class="col_b">产品</span><span class="col_b">|</span><span>服务商</span>\
								<div class="clear">\
									<input type="text" placeholder="搜索您需要的服务或服务商">\
									<button></button>\
								</div>\
								<span>热门服务</span>:\
								<span><a href="#">社保开户</a></span>\
								<span><a href="#">公司注册</a></span>\
							</div>\
							<div class="tel">\
								<span class="tel_icon"></span>\
								<span class="tel_num">010-83421842</span>\
							</div>\
						</div>\
						<div class="guide">\
							<div class="content">\
								<a class="allCP" href="../index.html">全部产品</a>\
								<a class="money money1" @click="goCS" href="shop_list.html">财税服务</a>\
								<a class="company" @click="goGongshang" href="shop_list.html">公司工商</a>\
								<a href="join.html">加盟我们</a>\
								<a href="shop.html">店铺</a>\
							</div>\
						</div>\
					</div>\
				',
				created(){
					
				},
				data(){
					return{
						
					}
				},
				methods:{
					goIndex(){
						location.href="../index.html"
					},
					goGongshang(){
						sessionStorage.gs = "公司工商";
					},
					goCS(){
						sessionStorage.gs = "财税服务";
					}
				},
				mounted: function() {
		            //页签切换(静态单页面时可以实现页签切换功能)
		            // var pages = $(".guide .content a");
		            // pages.on('click',function(){
		            // 	var $this = $(this);
		            // 	if(!$this.hasClass('bor_b')){
		            // 		$this.addClass('bor_b');
		            // 		$this.siblings().removeClass('bor_b');
		            // 	}
		            // })
					
		        }
	})
	//绑定
	Vue.component('vue-header-logo',headerLogo)
})
// 