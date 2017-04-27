require(['vue', 'jquery', 'header', 'headerlogo', 'footer','laydate'], function(Vue) {
    // body...
    new Vue({
        el: "#app",
        created(){

        },
        data(){
        	return{
        		//也签切换（左部）
        		menpage:0,
        		//账户设置，也签切换
        		zhPage:true,
        		//已评价，未评价
        		pingjia:true,
        	}
        },
        methods:{
        	//页签切换，三连击
        	turnpage(m){
        		this.menpage = m;
        	},
        	clpage(bool){
        		if(bool){
        			this.zhPage = true;
        		}else{
        			this.zhPage = false;
        		}
        	},
        	clpingjia(bool){
        		if(bool){
        			this.pingjia = true;
        		}else{
        			this.pingjia = false;
        		}
        	}
        }

    });
});