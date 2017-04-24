require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue){
	new Vue({
		el:"#app",
		created(){
			this.getData();
		},
		data(){
			return{
				fuwu:'',
				fuwu_product:'',
				fuwu_provider:'',
				//商品ID
				goodsID:sessionStorage.goodsID,
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
                    url: "http://115.182.107.203:8088/xinda/xinda-api/product/package/detail",
                    data: {
                    	sId:'0cb85ec6b63b41fc8aa07133b6144ea3'
                    },
                    dataType: "json",
                    success: function(data) {
                    	//处理返回数据----0级；
                    	that.fuwu  = data.data;
                    	that.fuwu_product = data.data.product;
                    	that.fuwu_provider = data.data.providerProduct;
                        // console.log(data.data);
                    }
				})
			}
		}
	})
})