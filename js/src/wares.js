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
			//立即购买加入购物车页签切换
			surInfo(bool){
				if(bool){
					this.or_show = true;
				}else{
					this.or_show = false;
				}
			}
		}
	})
})