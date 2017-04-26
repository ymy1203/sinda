// 订单页订单编号
require(['vue','jquery','header','headerlogo','footer'],function (Vue,header,headerlogo) {
	new Vue({
		el:"#app",
		created(){
			//调用订单方法
			this.order()
		},
		data(){
			return{
				//初始化 数组[],对象{},字符串" ";
				ordernum:[],
				hiden:true,
			}
		},
		methods:{
			// 订单详情方法
			order:function(){
				var pointerr = this;
				$.ajax({
					type:"post",
					url:"http://115.182.107.203:8088/xinda/xinda-api/business-order/detail",
					data:{
						businessNo:"S1704040001075133085",
					},
					dataType:"json",
					success:function(data,textStatus){
						var da = data.businessOrder;
						var daa = data.serviceOrderList;
						console.log('订单编号:',data); //订单详情
						pointerr.ordernum = pointerr.da;
					},
					error:function(xhr,textStatus){
						console.log(xhr.readyState);
						console.log(textStatus);
					}
				});
			},
			yincang:function(){
				this.hiden?this.hiden=false:this.hiden=true;
				if (this.hiden) {
					$(".sanjiao").css({"transform":"rotate(0deg)","transition":"transform 0.5s"});
				}else{
					$(".sanjiao").css({"transform":"rotate(180deg)","transition":"transform 0.5s"});
				}
			},
			paystyle:function(m){
				console.log(m);
				// if(m==1){
				// 	location.href=""
				// }
				// var paytype=$(this)
			}

		},
	})
})