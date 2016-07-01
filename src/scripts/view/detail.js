var tplDetail = require("../templates/detail.string");
SPA.defineView('detail',{
	html:tplDetail,
	
	plugins:['delegated',{
		name:'avalon',
		options:function (vm) {
			vm.livelist = [];
		}
	}],
	
	init:{
		detailSwiper : null
	},
	
	
	bindEvents:{
		show:function () {
			this.detailSwiper = new Swiper('#detail-con',{
				onSlideChangeStart: function (swiper) {
			        var index = swiper.activeIndex;
			        var $list = $('nav li');				
			        					$list.eq(index).addClass('active').siblings().removeClass('active');
		        }
			});
		}
	},
	
	bindActions:{
		'tabs-slide':function (e,data) {
			this.detailSwiper.slideTo($(e.el).index());
		}
	}
})
