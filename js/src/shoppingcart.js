require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue) {
    // body...
    new Vue({
        el: "#app",
        created(){

        },
        data(){
        	return{
                num:1,
                total:"",
                list:"",
        	}
        },
        mounted(){
			$(".allCP").css("color","#2693d4");
            this.getlist()
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
                        ID=
                        console.log(that.list[0].unitPrice)
                    }
                })
            },
            //数量加一
            addNum(item){
                this.num++;
                console.log(item.id);
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/set",
                    data: {
                        id:item.id,
                        num:this.num
                    },
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级；
                        console.log(data)
                    }
                })
            },
            //数量减一
            subNum(item){
                this.num--;
                if(this.num<=0){
                    this.num=0;
                }
                $.ajax({
                    type: "post",
                    url: "/xinda-api/cart/set",
                    data: {
                        id:item.id,
                        num:this.num
                    },
                    dataType: "json",
                    success: function(data) {
                        //处理返回数据----0级；
                        console.log(data)
                    }
                })
            },
            inputBlur(){
                this.num = $("#inNum").val();
            },
            //删除某个已选商品
            delate:function (ziji) {
                $(ziji.currentTarget).parent().remove()
            }
		}
    });
});