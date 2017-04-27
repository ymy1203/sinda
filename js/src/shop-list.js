// require(["v-dist"]);
require(['vue','dist','jquery','header','headerlogo', 'footer'], function(Vue) {
    new Vue({
        el: "#app",
        created() {
            this.search(this.val,this.page_n);
            this.csorgs();
            // this.val=='财务税收'?this.vShow = true:this.vShow=false;
        },
        data(){
        	return{
        		//传过来的value值
        		val : sessionStorage.aa_value,
        		//产品的Ajax数据
        		product:[],
        		//默认页数为一
        		page_n :0,
        		//页脚样式默认显示1
        		page_num:1,
        		//
        		producType:'',
        		//判断是财务税收还是公司工商,判定v-for的v-if等于
        		vforVif:1,
        		//公司工商时类型默认循环为1
        		//财税服务时类型默认循环为3
        		item2Vif:0,
        		//服务分类默认背景颜色为第一个
        		spanKey:0,
        		spanKey2:0,
        		//显示隐藏
                vShow:true,
                //公司工商的AJAX数据
                gsgs:'',
        	}
        },
        methods:{
        	//判断是财税服务还是公司工商
        	csorgs(){
        		var that = this;
				$.ajax({
			            type: "post",
			            url: "http://115.182.107.203:8088/xinda/xinda-api/product/style/list",
			            data: {},
			            dataType: "json",
			            success: function(data) {
			            //处理返回数据----0级；

			            	var data0 = data.data;
			            	that.producType = data0;
		                }
		        })
        	},
        	// 产品|服务商搜索接口
        	search(val,n){
        		var that = this;
        		//接口用错了，等着改
        		if(sessionStorage.gs == '财税服务'){
        			$.ajax({
        				type: "post",
	                    url: "http://115.182.107.203:8088/xinda/xinda-api/product/package/search-grid",
	                    data: {
	                    	start:n,
	                    	limit:8,
	                    	searchName:val,
	                    	sort:''
	                    },
	                    dataType: "json",
	                    success: function(data) {
	                    	console.log(data);
	                    	that.product = data;
	                    }
        			})
	        	}else{
	        		//公司工商页面接口
	        		$.ajax({
        				type: "post",
	                    url: "http://115.182.107.203:8088/xinda/xinda-api/product/package/grid",
	                    data: {
	                    	start:n,
	                    	limit:8,
	                    	productTypeCode: "1",
                            productId: "8a82f52b674543e298d2e5f685946e6e",
	                    	sort:'2'
	                    },
	                    dataType: "json",
	                    success: function(data) {
                            that.gsgs = data.data; 
	                    	console.log(that.gsgs);
	                    	// that.product = data;
	                    }
        			})
	        	}
        	},
        	//
        	//页数切换
        	pageGo(n){
        		//改变页脚样式
        		this.page_num = n;
        		//改变ajax请求数据
        		this.page_n = n-1;
        		this.search(this.val,this.page_n);
        	},
        	//上一页
        	upGo(){
        		this.page_n = this.page_n-1;
        		//this.page_n最小为0
        		this.page_n<0?this.page_n = 0:this.page_n;
        		//改变页脚样式
        		this.page_num = this.page_n+1;
        		this.search(this.val,this.page_n);	
        	},
        	//下一页
        	downGo(){
        		this.page_n = this.page_n+1;
        		//this.page_n最大为返回来的总页数-1
        		this.page_n == this.product.pageSize?
        		this.page_n =this.product.pageSize-1:
        		this.page_n;
        		//改变页脚样式
        		this.page_num = this.page_n+1;
        		this.search(this.val,this.page_n);
        	},
        	//服务分类的点击事件
        	changeSpanKey(index){
        		this.spanKey = index;
        		this.item2Vif = index;
        	},
        	changeSpanKey2(index){
        		this.spanKey2 = index;
        	},
        	//跳转商品详情页
        	goShopDetil(id){
                sessionStorage.goodsID = id;
        		location.href = "wares.html"
        	},
            addCart(id){
                var theId=id;
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/add",
                    async: false,
                    data: {
                        id:theId,
                        num:1         
                    },
                    dataType: "json",
                    success: function(data, textStatus) {
                        console.log(data); //未登录
                    },
                    error: function(xhr, textStatus) {
                        console.log(xhr.readyState);
                        console.log(textStatus);
                    }
                });
                 var loginStatus = 0;
                //修改头部购物车数量
                $.ajax({
                    type: "post",
                    url: "/xinda-api/sso/login-info",
                    data: {},
                    dataType: "json",
                    async: false,
                    success: function(data, textStatus) {
                        if (data.status == 1)loginStatus = 1; 
                            
                    },
                    error: function(xhr, textStatus) {
                                        // console.log(xhr.readyState);
                                        // console.log(textStatus);
                    }
                });
                if (loginStatus == 1) {
                    $.ajax({
                        type: "post",
                        url: "/xinda-api/cart/cart-num",
                        data: {},
                        dataType: "json",
                        async: false,
                        success: function(data, textStatus) {

                            if (data.status == 1) {
                                console.log(data.data.cartNum);
                               $(".cart_num")[0].innerHTML=data.data.cartNum;
                                
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
        mounted:function() {
        	//判断是财务税收还是公司工商
        	if(sessionStorage.gs=="公司工商"){
        		$(".money").removeClass("bor_b");
        		$(".company").addClass("bor_b");
        		//改变DOM元素
        		this.vforVif = 2;
                this.vShow = false;
        	}else if(sessionStorage.gs=="财税服务"){
        		$(".money").addClass("bor_b");
        		$(".company").removeClass("bor_b");
        		//改变DOM元素
        		this.vforVif = 1;
                this.vShow = true;
        	};
            // console.log($("#welcome"));
        }
    })
})


