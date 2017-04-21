/*
*	@author yourname
*	index.html
*/
require.config({
　　　paths: {
　　　　　"jquery"              : "../lib/jquery/jquery-1.9.0.min",
		  "vue"	    			: "../lib/vue/vue",
		  "dist"	    		: "../lib/plugins/distpicker",//省市区级联
		  "v-dist"	    		: "../lib/plugins/v-distpicker",//省市区级联
		  "header"              : "../../component/header",
		  "headerlogo"          : "../../component/header-logo",
		  "footer"              : "../../component/footer",
　　　},
	 shim: {
		"vue" :{
			exports:"Vue"
		},
		"dist" :{
			exports:"Dist"
		},
		"v-dist" :{
			exports:"Distpicker"
		},
	 }
});





//---
function goIndex(){
	location.href="../index.html"
}