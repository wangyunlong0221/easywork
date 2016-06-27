var tplActive = require("../templates/active.string");

SPA.defineView("active",{
	html:tplActive,
	plugins:['delegated',{
		name:'avalon',
		options:function (vm) {
			vm.livelist = [];
		}
	}],
	
	init:{
		myswiper : null
	},
	
	
	bindEvents:{
		beforeShow:function (){
			var vm = this.getVM();
			$.ajax({
				type:"get",
				url:"/api/getLivelist.php",
				async:true,
				data: {
					rtype: "active-origin"
				},
				success: function(res) {
					vm.livelist = res.data;
				}
			});
			
		},
		
		show:function () {
			this.myswiper = new Swiper('#active-con',{
				onSlideChangeStart: function (swiper) {
			        var index = swiper.activeIndex;
			        var $list = $('nav li');				
			        					$list.eq(index).addClass('active').siblings().removeClass('active');
		        }
			})
		}
		
	},
	
	
	bindActions:{
		'tabs-slide':function (e,data) {
			this.myswiper.slideTo($(e.el).index());
		}
	}
})
