require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue) {
    // body...
    new Vue({
        el: "#app",
        created(){

        },
        data(){
        	return{
                // num:1,
                total:0,
                list:"",
                numm:''
        	}
        },
        mounted(){
			$(".allCP").css("color","#2693d4");
            this.getlist();
            this.allnum();
            // this.computeprice();
            /*var simTotal=$('.xiaoji');
            console.log(simTotal);
            console.log('simTotal');
            simTotal.each(function(index, el) {
                console.log(el);
                console.log(el.innerHTML.slice(1,-1));

            });*/
            // this.total=
		},
		methods:{
            getlist(){
                var that = this;
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/list",
                    data: {},
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级；
                        console.log(data)
                        // that.fuwu  = data.data;
                        that.list = data.data
                        $.each( data.data,function(inx,ele){
                            that.total+=ele.unitPrice/100*ele.buyNum;
                        });
                        // console.log(that.total);
                        // ID=
                        // console.log(that.list[0].unitPrice)
                    }
                })
            },
            //数量加一
            addNum(item,index,node){
                var inut = $(node.path[1]).find('input');
                console.log( Number(inut[0].value));
                var vall =parseInt(inut[0].value)+1;
               inut[0].value=""+vall;
                // console.log(node);
                var sss = $(node.path[2]).find('.xiaoji');
                // console.log(sss.html());
                var newST=parseInt(sss.html());
                newST=newST+ (parseInt(item.unitPrice))/100; 
                sss.html("￥"+newST);
                //this.numm = inut.val();
                this.total+=(item.unitPrice/100);
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/set",
                    data: {
                        id:item.serviceId,
                        num:inut[0].value
                    },
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级；
                        console.log(data)
                    }
                }) 
                // computeprice()
            },
            //数量减一
            subNum(item,index,node){
                var inut = $(node.path[1]).find('input');
                var vall = Number(inut.val())-1;
                inut.val(vall);
                if(inut.val()<=1){
                    inut.val(1)
                }
                this.numm = inut.val();
                var sss = $(node.path[2]).find('.xiaoji');
                var newST=parseInt(sss.html());
                newST=newST- (parseInt(item.unitPrice))/100; 
                sss.html("￥"+newST);
                this.total-=(item.unitPrice/100);
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/add",
                    data: {
                        id:item.serviceId,
                        num:1
                    },
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级;
                        console.log(data)
                    }
                })
                // computeprice()
            },
            //输入框值通过输入改变时
            inputBlur(item,index){
                this.num = $("#inNum").val();
                this.numm = $("#inNum").val();
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/set",
                    data: {
                        id:item.serviceId,
                        num:this.num
                    },
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级；
                        console.log(data)
                    }
                })
                // computeprice()
            },
            //删除某个已选商品
            delate(item,index,node) {
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/del",
                    data: {
                        id:item.serviceId,
                    },
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级；
                        console.log(data)
                    }
                })
                // $(item.currentTarget).parent().remove();
                $(node.path[1]).remove();
            },
            //登录状态：全部商品数量
            allnum(){    
                var carnum = $('.all_num');
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/cart-num",
                    data: {},
                    dataType: "json",
                    success: function(data, textStatus) {
                        if (data.status == 1) {
                            carnum[0].innerHTML=data.data.cartNum; 
                        }
                        // console.log(data);
                    },
                    error: function(xhr, textStatus) {
                        // console.log(xhr.readyState);
                        // console.log(textStatus);
                    }
                });
            },
            goPay(){
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/submit",
                    data: {},
                    dataType: "json",
                    async:false,
                    success: function(data, textStatus) {
                        console.log(data);
                        sessionStorage.businessId=data.data;
                        console.log(sessionStorage.businessId);
                    },
                    error: function(xhr, textStatus) {
                        // console.log(xhr.readyState);
                        // console.log(textStatus);
                    }
                });
                location.href="order.html";
            }
            // var span = $(".cartlist")
            // computeprice(item){
            //     console.log(this.numm)

            //     this.total = this.numm*
            // }
		}
    });
});