require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue) {
    // body...
    new Vue({
        el: "#app",
        created(){
        	this.shops();
        },
        data:{
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
                inputsearch:'',
                dat:'',
                protypes:[
					"所有",
					"专利申请",
					"版权保护",
					"商标注册",
					"代理记账",
					"公司注册",
					"企业社保",
					"公司变更",
					"税务代办",
					"个人社保",
					"审计报告"
				],
				sorts:[
					"综合排序",
					"评价↿↾",
					"接单↿↾"
				],
				//服务分类默认背景颜色为第一个
        		spanKey:0,
        		spanKey2:0,
        		types:[],
        		sort:0,
        },
        mounted:function(){
        	
        },
        methods:{
        	//
	        shops(){
	        		var that = this;
	        	 $.ajax({
			    	type: "post",
					url: "/xinda-api/provider/grid",
					data: {
					    start:0,
			            limit:6,
						productTypeCode:10,
						regionId: 110102,
						sort:1		
					},
					dataType: "json",
					processData:false,
					success: function(data, textStatus) {
						var datz = data.data;
						that.dat = datz
						console.log(that.dat)
						var arr = [];
						for(var i = 0;i<that.dat.length;i++){
							that.types[i] =that.dat[i].productTypes.split(',');
						}
					},
					error: function(xhr, textStatus) {
					    console.log(xhr.readyState);
					    console.log(textStatus);
					}
					      
			    })
        	},
        	type(TYPE){
				this.types = TYPE.split(",");
//				console.log(this.types)
			},
        	//服务分类的点击事件
        	toogle(index){
        		this.spanKey = index;
        	},
        	show(index){
        		this.spanKey2 = index;
        	},
		    enter(key,company) {
		    	sessionStorage.shopindexid = company.id
		    	sessionStorage.shopindexnum = key
//				this.$router.push({
//					name: "jump2",
//					params:	{
//						id:company.id,
//						name: company.regionName,
//						detail: company.providerInfo
//					}
//				})
				location.href = "shopindex.html"
			},
			//
			judge(good,total){
				if(total!=0) {
					return good/total*100+"%";
				}else {
					return "暂无评论";
				}
			}
		}
    });
});