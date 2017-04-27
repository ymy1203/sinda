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
				da:'',
				detail:'',
				time:''
			}
		},
		methods:{
			// 订单详情方法
			order(){
				var that = this;
				var busId=sessionStorage.businessId;
				console.log(busId);
				$.ajax({
					type:"post",
					url:"/xinda-api/pay/detail",
					data:{
						businessNo:busId,
					},
					dataType:"json",
					success:function(data,textStatus){
						 that.da = data.data;
						 var date = new Date(that.da.createTime);
						 var year = date.getFullYear();
						 var month = date.getMonth()+1;
						 var mom;
						//判断月份是否在1-9月，在1-9月时，月份前面加0
						if (month<10){
							mom = "0"+month;
						}else {
							mom = month;
						}
						var dat;
						//判断月份是否在1-9日，在1-9日时，日期前面加0
						if (date.getDate()<10) {
							dat = "0"+date.getDate()
						} else{
							dat = date.getDate()
						}
						that.time =year+"-"+mom+"-"+dat;
						console.log('订单编号:',that.da); //订单详情
					},
					error:function(xhr,textStatus){
						console.log(xhr.readyState);
						console.log(textStatus);
					}
				});
				$.ajax({
					type:"post",
					url:"/xinda-api/business-order/detail",
					data:{
						businessNo:busId,
					},
					dataType:"json",
					success:function(data,textStatus){
						 that.detail = data.data.serviceOrderList
						console.log(that.detail); //订单详情
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
				var busId=sessionStorage.businessId;
				console.log(m);
				if(m==1){
					$.ajax({
						type:"post",
						url:"/xinda-api/pay/china-pay",
						data:{
							businessNo:busId,
						},
						dataType:"json",
						success:function(data,textStatus){
							console.log(data); //订单详情
						}
					});
					// location.href=""
				}else if (m==2) {
					$.ajax({
						type:"post",
						url:"/xinda-api/pay/weixin-pay",
						data:{
							businessNo:busId,
						},
						dataType:"json",
						success:function(data,textStatus){
							console.log(data); //订单详情
						}
					});
				}else if (m==3) {
					$.ajax({
						type:"post",
						url:"/xinda-api/pay/ali-pay",
						data:{
							businessNo:busId,
						},
						dataType:"json",
						success:function(data,textStatus){
							console.log(data); //订单详情
						}
					});
				}else {
					$.ajax({
						type:"post",
						url:"/xinda-api/pay/ weixin-js-pay",
						data:{
							businessNo:busId,
						},
						dataType:"json",
						success:function(data,textStatus){
							console.log(data); //订单详情
						}
					});
				}
			}

		},
	})
})