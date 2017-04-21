/*
*	@author yourname
*	index.html
*/
require.config({
　　　paths: {
　　　　　"jquery"              : "../lib/jquery/jquery-1.9.0.min",
		  "vue"	    			: "../lib/vue/vue",
		  "dist"	    		: "../lib/plugins/distpicker",//省市区级联
		  "header"              : "../../component/header",
		  "headerlogo"          : "../../component/header-logo",
		  "footer"              : "../../component/footer",
		  "area&code"			:"../lib/plugins/area&code"//静态文件用于检索地区编码
　　　},
	 shim: {
		"vue" :{
			exports:"Vue"
		},
		"dist" :{
			exports:"Dist"
		},
	 }
});





//---
function goIndex(){
	location.href="../index.html"
}