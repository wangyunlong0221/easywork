var tplsign = require("../templates/sign.string");

SPA.defineView('sign',{
	html:tplsign,
	
	plugins:['delegated',{
		name:'avalon',
		options:function (vm) {
			
		}
	}],
	
	init:{
		signSwiper : null
	},
	
	
	bindEvents:{
		show:function () {
			this.signSwiper = new Swiper('#sign-swiper',{
				onSlideChangeStart: function (swiper) {
			        var index = swiper.activeIndex;
			        var $list = $('.sign-list li i');				
			        					$list.eq(index).addClass('active').siblings().removeClass('active');
		        }
			});
			
			var $reg_tel = $("#reg_tel");
			var reg = /^1[34578]{1}\d{9}$/;
			$reg_tel.blur(function () {
				console.log();
				if (reg.test($reg_tel.val())) {
					
				} else{
					//SPA.open('index')
				}
			})
			
		}
	},
	
	bindActions:{
		'sign-slide':function (e,data) {
			this.signSwiper.slideTo($(e.el).index());
		},
		
		'to-see':function () {
			SPA.open('index');
		},
		'clear_reg':function () {
			var $reg_tel = $('#reg_tel');
			$reg_tel.val("");
		}
		
	}
})

