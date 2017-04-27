require(['vue', 'jquery', 'header', 'headerlogo', 'footer'], function(Vue) {
    // body...
    new Vue({
        el: "#app",
        created(){

        },
        data(){
        	return{
                num:1,
                total:""
        	}
        },
        mounted(){
			$(".allCP").css("color","#2693d4");
		},
		methods:{
            //数量加一
            addNum:function(){
                this.num++;
            },
            //数量减一
            subNum:function(){
                this.num--;
                if(this.num<=0){
                    this.num=0;
                }
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