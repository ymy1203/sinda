require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue){
	new Vue({
		el:"#app",
		created(){
			this.getData(this.goodsID);
			// console.log(this.goodsID);
		},
		data(){
			return{
				fuwu:'',
				fuwu_product:'',
				fuwu_provider:'',
				//商品ID
				goodsID:sessionStorage.goodsID,
				//服务内容|商品评价的显示吟唱
				or_show:true,
				// bg_b:'bg_b',
				//
				num:1,
			}
		},
		mounted(){
			$(".allCP").css("color","#2693d4");
			// console.log(sessionStorage.goodsID);
		},
		methods:{
			getData:function (id){
				var that = this;
				$.ajax({
					type: "post",
                    url: "/xinda-api/product/package/detail",
                    data: {
                    	sId:id,
                    },
                    dataType: "json",
                    success: function(data) {
                    	//处理返回数据----0级；
                    	that.fuwu  = data.data;
                    	that.fuwu_product = data.data.product;
                    	that.fuwu_provider = data.data.providerProduct;
                    	// that.fuwu_provider = data.data.providerProduct;
                        // console.log(id);
                    }
				})
				//这是评论的
				$.ajax({
					type: "post",
                    url: "/xinda-api/product/judge/grid",
                    data: {
                    	start:0,
						limit:10,
						serviceId:id,
						type:1,
                    },
                    dataType: "json",
                    success: function(data) {
                    	//处理返回数据----0级；
                    	console.log(data);
                    }
				})
			},
			//服务内容，商品评价页签切换
			surInfo(bool){
				if(bool){
					this.or_show = true;
				}else{
					this.or_show = false;
				}
			},
			//立即购买跳到购物车
			nowBuy(){
				var theId=this.goodsID;
				var theNum=this.num;
				$.ajax({
		            type: "post",
		            url: "/xinda-api/cart/add",
		            async: false,
		            data: {
		               	id:theId,
						num:theNum			
		            },
		            async:false,
		            dataType: "json",
		            success: function(data, textStatus) {
		                console.log(data); //未登录
		            },
		            error: function(xhr, textStatus) {
		                console.log(xhr.readyState);
		                console.log(textStatus);
		            }
	        	});
				location.href="shoppingcart.html"
			},
			addCart(){
				var theId=this.goodsID;
				var theNum=this.num;
				$.ajax({
		            type: "post",
		            url: "/xinda-api/cart/add",
		            async: false,
		            data: {
		               	id:theId,
						num:theNum			
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
			},
			//数量加一
			addNum(){
				this.num++;
			},
			//数量减一
			subNum(){
				this.num--;
				if(this.num<=0){
					this.num=1;
				}
			},
			inputBlur(){
				var numval = $("#inNum").val();
				if(/\d/.test(numval)){
					this.num = numval;
				}else{
					this.num = 1;
				}
			}
		}
	})
})