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
            }
        },
        mounted: function() {
            //
        }
    })
})