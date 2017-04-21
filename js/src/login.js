require(['jquery'], function() {
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
    $('#login').click(function(){
    	var phone=inputs[0].value;
    	var pwd=inputs[1].value;
    	var imgCode=inputs[2].value;
    	if(phoneAvail){
    		if(pwd==null){
    			$("<p id='msgErr' style='color:red;font-size:15px;text-align:center;margin:0'>请输入密码!</p>").
    			insertAfter($(inputs[1]));
    		}else if(imgCode==null)
    		{
    				$("<p id='msgErr' style='color:red;font-size:15px;text-align:center;margin:0'>请输入图片验证码!</p>").
    			insertAfter($(inputs[2]));
    		}else 
    		{
    			$.ajax({
		            type: "post",
		            url: "/xinda-api/sso/login",
		            data: {
		               	loginId: phone,					  
						password:pwd,
						imgCode:imgCode			
		            },
		            dataType: "json",
		            success: function(data, textStatus) {
		                console.log(data); //未登录
		                $("<p id='msgErr' style='color:red;font-size:15px;text-align:center;margin:0'>"+data.msg+"!</p>")
		                .insertAfter($("#login").parent());
		                if(data.status==1){$("#msgErr").css('color',"green");
		                	$("#msgErr")[0].innerHTML=data.msg+"!4s后跳转至主页...";
		                	setTimeout(function(){
		                		location.href="../index.html";
		                	},4000)
		            	}else{
		            		$(".yz_pic").click();
		            		setTimeout(function(){
		            			$("#msgErr").remove();
		            		},3000);
		            	}
		            },
		            error: function(xhr, textStatus) {
		                console.log(xhr.readyState);
		                console.log(textStatus);
		            }
	        	});
    		}
    	}
    });
})