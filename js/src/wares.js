require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue){
	new Vue({
		el:"#app",
		created(){
			this.getData();
		},
		data(){
			return{
				fuwu:'',
			}
		},
		methods:{
			getData:function (){
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
                        console.log(data.data);
                    }
				})
			}
		},
		mounted(){
			$(".allCP").css("color","#2693d4");
		}

	})
})