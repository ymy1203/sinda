require(['jquery','dist','area&code'], function() {
    //实现页面验证码点击刷新
    $(".yz_pic").click(function() {
        var flag = "";
         flag = Math.random();
        this.src = "/xinda-api/ajaxAuthcode?a=" + flag;
    });
   	 //验证注册手机号是否合法Start
    var inputs = $("input");
    //设置手机号是否可用标识
    var phoneAvail=false;
    //获取手机号标识状态
    function getPhoneAvail(){
    	var text = inputs[0].value;
    	if (!text.match(/^((13[0-9])|(14[0-9])|(15([0-9]))|(18[0-9]))\d{8}$/)) {
    	phoneAvail=false;
        }else {
        	phoneAvail=true;
        }
    }
    getPhoneAvail();
    //添加错误提示
    function phoneErr(theNode) {
        var text = theNode.value;
        if (!text.match(/^((13[0-9])|(14[0-9])|(15([0-9]))|(18[0-9]))\d{8}$/)) {
            $("<p id='phoneErr' style='color:red;font-size:15px;text-align:center;margin:0'>手机号有误！</p>").insertAfter($(theNode));
        	phoneAvail=false;
        }else {
        	phoneAvail=true;
        }
    }
    //移除错误提示
    function delPhoneErr() {
        if ($("#phoneErr"))

        	0
            $("#phoneErr").remove();
    }
    //监听键盘enter键，按下即验证手机号是否可用
    $(inputs[0]).keydown(function(event) {
        delPhoneErr();
        if (event.keyCode == "13")
            phoneErr(this);
    });
    //定义手机号输入框内容改变触发的函数
    $(inputs[0]).change(function() {
        delPhoneErr();
        phoneErr(this);
    });
    //手机输入框重新获取焦点时移除错误提示
    $(inputs[0]).focus(function() {
            delPhoneErr();
        })
    $(inputs[0]).blur(function() {
           delPhoneErr();
        phoneErr(this);
        })
        //请求短信验证码start
        //定义是否成功获取验证码的标识
        var codeGeted=false;
    $('.clickget').click(function() {
    	if($("#msgErr"))$("#msgErr").remove();
        var codeText = inputs[1].value;
        if (phoneAvail) {
        	if(!codeGeted){
	        	var phoneNum = inputs[0].value;
	        	$.ajax({
		            type: "post",
		            url: "/xinda-api/register/sendsms",
		            data: {
		                cellphone: phoneNum,
		                smsType: 1,
		                imgCode: codeText
		            },
		            dataType: "json",
		            success: function(data, textStatus) {
		                console.log(data); //未登录
		                $("<p id='msgErr' style='color:red;font-size:15px;text-align:center;margin:0'>"+data.msg+"!</p>")
		                .insertAfter($(".clickget").parent());
		                if(data.status==1){$("#msgErr").css('color',"green");
		                codeGeted=true;
		            	}else{
		            		$(".yz_pic").click();
		            	}
		            },
		            error: function(xhr, textStatus) {
		                console.log(xhr.readyState);
		                console.log(textStatus);
		            }
	        	});
        	}else{
        		$("<p id='msgErr' style='color:red;font-size:15px;text-align:center;margin:0'>请勿重复获取验证码!</p>")
		                .insertAfter($(".clickget").parent());
		                $("#msgErr").css('color',"#ff8700");
		                setTimeout(function(){$("#msgErr").remove();},2000 );
        	}
        }
        else
        	$("<p id='msgErr' style='color:red;font-size:15px;text-align:center;margin:0'>请输入正确手机号</p>")
                .insertAfter($(".clickget").parent());
    });
   
   function pwdErr(theNode) {
        var text = theNode.value;
        if (!text.match(/^(?=.*\d)(?=.*\D).{8,20}/)) {
            $("<p id='pwdErr' style='color:red;font-size:15px;text-align:center;margin:0'>请设定8~20位包含字母数字的密码！</p>").insertAfter($(theNode));
        }
    }
    //移除错误提示
    function delPwderr() {
        if ($("#pwdErr"))
            $("#pwdErr").remove();
    }
    //监听键盘enter键，按下即验证手机号是否可用
    $(inputs[3]).keydown(function(event) {
        delPwderr();
        if (event.keyCode == "13")
            pwdErr(this);
    });
    //定义手机号输入框内容改变触发的函数
    $(inputs[3]).change(function() {
        delPwderr();
        pwdErr(this);
    });
    //手机输入框重新获取焦点时移除错误提示
    $(inputs[3]).focus(function() {
            delPwderr();
        })
    $(inputs[3]).blur(function() {
           delPwderr();
        pwdErr(this);
        })
    console.log(DISTRICTS);
    function getAreaNum(){
    	var places=$("select");
    	var pro=places[0].value;
    	var city=places[1].value;
    	var area=places[2].value;
    	for (ele in DISTRICTS[100000]){
    		if(pro==DISTRICTS[100000][ele]){var proNum=ele;break;}
    	}
    	if(proNum){
	    	for (ele in DISTRICTS[proNum]){
	    		if(city==DISTRICTS[proNum][ele]){var cityNum=ele;break;}
	    	}
    	}
    	if(cityNum){
	    	for (ele in DISTRICTS[cityNum]){
	    		if(pro==DISTRICTS[cityNum][ele]){var areaNum=ele;break;}
	    	}
	    }
	    if(areaNum)return areaNum;
    
    }
    $("#submit").click(function(){
    	var areaNum=getAreaNum();
    	var phoneNum = inputs[0].value;
    	var msgCode=inputs[2].value;
    	var pwd=inputs[3].value;
    	$.ajax({
		            type: "post",
		            url: "/xinda-api/register/register",
		            data: {
		              	cellphone: phoneNum,					
						smsType:1,								
						validCode:msgCode,					
						password:pwd, 
						regionId:areaNum		
		            },
		            dataType: "json",
		            success: function(data, textStatus) {
		                console.log(data);
		                $("<p id='submitMsg' style='color:red;font-size:15px;text-align:center;margin:0'>"+data.msg+"</p>")
                		.insertAfter($("#submit").parent());
                		if(data.status==1)$("#submitMsg").css("color","green");
                		if(data.status==-2)$("#submitMsg").css("color","#ff8700");
                		setTimeout(function(){$("#submitMsg").remove();location.href="login.html"},4000);
		            },
		            error: function(xhr, textStatus) {
		                console.log(xhr.readyState);
		                console.log(textStatus);
		            }
	    });
    });
    	

})
