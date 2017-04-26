require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue) {
    // body...
    new Vue({
        el: "#app",
        created() {
            this.product();
        },
        data() {
            return {
                //产品列表返回数据，并且根据返回值排序
                producType: [],
                //明星产品、初创企业必备、推荐商服务
                starTeams:'',
                //推荐服务商、推荐服务页签切换
                col_b:'col_b',
                service_show:true,
                tri_left:'left:37px',
                //产品|服务商
                cpTrue:true,
            }
        },
        methods: {
            //产品类型，明星产品、初创企业必备、推荐商服务推荐接口
            product: function() {
                var that = this;
                $.ajax({
                    type: "post",
                    url: "http://115.182.107.203:8088/xinda/xinda-api/product/style/list",
                    data: {},
                    dataType: "json",
                    success: function(data) {
                    	//处理返回数据----0级；
                        var data0 = data.data;
                        that.producType = that.sort(data0);
                    }
                })
                //明星产品、初创企业必备、推荐商服务推荐接口
                $.ajax({
                    type: "post",
                    url: "http://115.182.107.203:8088/xinda/xinda-api/recommend/list",
                    data: {},
                    dataType: "json",
                    success: function(data) {
                        var data = data.data;
                        console.log(data);
                        that.starTeams = data;
                        // console.log(typeof data.product[0].price);
                    }
                })
            },
            //给返回数据排序，并且写入数组（方便循环）；
            sort:function(data) {
                var paixu_objs = [];
                for (key in data) {
                    var index = data[key].code;
                    paixu_objs[index - 1] = data[key];
                }
                // console.log(paixu_objs[0]);
               return paixu_objs;
            },
            //推荐服务商、推荐服务页签切换
            service_man(){
            	this.service_show = true;
            	this.tri_left  = 'left:37px';
            },
            service(){
            	this.service_show = false;
            	this.tri_left  = 'left:121px';
            },
            //产品|服务商
            cpDown(){
            	this.cpTrue = true;
            },
            fwsDown(){
            	this.cpTrue = false;
            },
            //搜索 先根据cpTru值判断搜索的是产品|服务商
            //将判断结果，与value值保存，并且跳转页面
            submit_go(){
            	if(this.cpTrue){
            		sessionStorage.aa_cp = true;
            		sessionStorage.aa_value = $("#cp_input").val();
            	}else{
            		sessionStorage.aa_cp = false;
            		sessionStorage.aa_value = $("#cp_input").val();
            	}
            	location.href="html/shop_list.html";
            },
            //跳转的是公司工商还是财税服务
            goGongshang(){
                sessionStorage.gs = "公司工商";
            },
            goCS(){
                sessionStorage.gs = "财税服务";
            }
        },
        mounted: function() {
            //
        }
    })
    $(function(){
        var welEle=$("#welcome");
        var loginBtn=$("#login_a");
        var registerBtn=$("#register_a");
        var cartNum=$(".cart_num");
        var loginStatus=0;
        //登陆状态：用户显示于header
        $.ajax({
            type: "post",
             url: "/xinda-api/sso/login-info",
            data: {
            },
            dataType: "json",
            async: false,
            success: function(data, textStatus) {
                if (data.status==1){
                    loginStatus=1;
                    welEle[0].innerHTML="欢迎,"+data.data.name;
                    $("<a id='login_quit' href='javascript:void(0)'>退出登录</a>")
                        .insertAfter(loginBtn);
                    var quitBtn=$('#login_quit');
                     //退出登陆
                    quitBtn.click(function(){
                        $.ajax({
                            type: "post",
                            url: "/xinda-api/sso/ logout",
                            data: {
                            },
                            dataType: "json",
                            success: function(data, textStatus) {
                                if (data.status==1){
                                    location.href="index.html";
                                }
                                // console.log(data); 
                                        
                            },
                            error: function(xhr, textStatus) {
                                // console.log(xhr.readyState);
                                // console.log(textStatus);
                            }
                        });
                    });
                    registerBtn.css("display","none");
                    loginBtn.css("display","none");
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
        if(loginStatus==1){
            $.ajax({
                type: "post",
                 url: "/xinda-api/cart/cart-num",
                data: {
                },
                dataType: "json",
                success: function(data, textStatus) {
                    if (data.status==1){
                       cartNum[0].innerHTML=data.data.cartNum;
                       $(".fws")[0].innerHTML="会员中心";
                       $(".fws").click(function(){
                            location.href="html/member.html";
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
    });
})
