//这是头部登录注册模块
define(['vue', 'jquery'], function(Vue, $) {
    const header = Vue.extend({
        template: '	<!-- 头部 -->\
					<div class="header">\
						<div class="content">\
							<span id="welcome" >欢迎来到信达！</span>\
							<a id="login_a" href="login.html">登录</a>\
							<a id="register_a" href="register.html">快速注册</a>\
							<div class="f-r">\
								<span class="cart f-l"></span>\
								<span>购物车<span class="cart_num">0</span>件</span>\
								<span class="col_b fws">服务商入口</span>\
							</div>\
						</div>\
					</div>\
				',
        created() {


        },
        data() {
            return {

            }
        },
        methods: {
            login() {
                var welEle = $("#welcome");
                var loginBtn = $("#login_a");
                var registerBtn = $("#register_a");
                var cartNum = $(".cart_num");
                var loginStatus = 0;
                //登陆状态：用户显示于header
                $.ajax({
                    type: "post",
                    url: "/xinda-api/sso/login-info",
                    data: {},
                    dataType: "json",
                    async: false,
                    success: function(data, textStatus) {
                        if (data.status == 1) {
                            loginStatus = 1;
                            welEle[0].innerHTML="欢迎,"+data.data.name;
                            $("<a id='login_quit' href='javascript:void(0)'>退出登录</a>")
                                .insertAfter(loginBtn);
                            var quitBtn = $('#login_quit');
                            //退出登陆
                            quitBtn.click(function() {
                                $.ajax({
                                    type: "post",
                                    url: "/xinda-api/sso/ logout",
                                    data: {},
                                    dataType: "json",
                                    success: function(data, textStatus) {
                                        if (data.status == 1) {
                                            location.href = "index.html";
                                        }
                                        // console.log(data);

                                    },
                                    error: function(xhr, textStatus) {
                                        // console.log(xhr.readyState);
                                        // console.log(textStatus);
                                    }
                                });
                            });
                            registerBtn.css("display", "none");
                            loginBtn.css("display", "none");
                        }
                        // console.log(data);

                    },
                    error: function(xhr, textStatus) {
                        // console.log(xhr.readyState);
                        // console.log(textStatus);
                    }
                });
                //登陆状态：购物车数量
                // console.log(loginStatus);
                if (loginStatus == 1) {
                    $.ajax({
                        type: "post",
                        url: "/xinda-api/cart/cart-num",
                        data: {},
                        dataType: "json",
                        success: function(data, textStatus) {
                            if (data.status == 1) {
                                cartNum[0].innerHTML=data.data.cartNum;
                                $(".fws")[0].innerHTML = "会员中心";
                                $(".fws").click(function() {
                                    location.href = "member.html";
                                });
                            }
                            // console.log(data);
                        },
                        error: function(xhr, textStatus) {
                            // console.log(xhr.readyState);
                            // console.log(textStatus);
                        }
                    });
                }
            }
        },
        mounted: function() {
        	this.login();
        }
    })
    $();

    //绑定
    Vue.component('vue-header', header);
})
