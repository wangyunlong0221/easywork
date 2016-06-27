var testIndex = require("../templates/index.string");
//var bodyIndex = document.body.innerHTML;
//document.body.innerHTML = testIndex + bodyIndex;

SPA.defineView("index",{
	html:testIndex,
	
	plugins:['delegated'],
	
	modules:[{
		name:"content",
		views:["home","work-help","active","self-center"],
		defaultTag:"home",
		container: ".l-container"
	}],
	
	bindActions:{
		//footer tabs切换
		"swich-tabs":function (e,data) {
			$(e.el).addClass("active").siblings().removeClass("active");
			this.modules.content.launch(data.tag);
			//console.log(this.modules);
		}
	}
});




//var myswiper = new Swiper(".swiper-container",{
//	loop:true,
//	autoplay:3000,
//	pagination: '.swiper-pagination',
//})
