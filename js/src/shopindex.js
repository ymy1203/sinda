require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue){
	new Vue({
		el:"#app",
		created(){

		},
		data(){
			return{
				dat:[],
				services:[
					"服务产品",
					"客服",
					"资质证书"
				],
				flag:0,
				providerInfo:'',
				spanKey3:0,
				yi: true,
				er: false,
				san: false,
				regionName:'',
				weixin:'',
				qq:'',
				cellphone:'',
				businessCertPath:'',
				workTime:'',
				name:'',
				products:[]
			}
		},
		mounted:function(){
			var that = this
			$.ajax({
				type:"post",
				url:"/xinda-api/provider/detail?id="+sessionStorage.shopindexid,
				dataType: "json",
				processData:false,
				success: function(data, textStatus) {
					that.dat = data.data;
					that.providerInfo = that.dat.providerInfo;
					that.regionName = that.dat.regionName;
					that.weixin = that.dat.weixin;
					that.qq = that.dat.qq;
					that.cellphone = that.dat.cellphone;
					that.businessCertPath = that.dat.hrCertPath;
					that.workTime = that.dat.workTime;
					that.name = that.dat.name;
					
				},
				error: function(xhr, textStatus) {
					console.log(xhr.readyState);
					console.log(textStatus);
				}
			})
			$.ajax({
                type: "post",
                url: "http://115.182.107.203:8088/xinda/xinda-api/recommend/list",
                data: {},
                dataType: "json",
                success: function(data) {
                    var data = data.data.product;
                    console.log(data);
                    that.products = data;
                }
            })
		},
		methods:{
			cobo(index){
        		this.spanKey3 = index;
        		this.flag=index;
				if(index==0) {
					this.yi=true;
					this.er=false;
					this.san=false;
				}else if(index==1){
					this.yi=false;
					this.er=true;
					this.san=false;
				}else if(index==2){
					this.yi=false;
					this.er=false;
					this.san=true;
				}
			}
		}
	})
})