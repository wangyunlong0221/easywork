var tplHome = require("../templates/home.string");

SPA.defineView("home", {
	html: tplHome,

	plugins: ["delegated", {
		name: "avalon",
		options: function(vm) {
			vm.livelist = [];
		}
	}],

	init: {
		dataArr: []
	},

	bindEvents: {
		beforeShow: function() {
			var _this = this;
			var vm = _this.getVM();
			//初始请求

			$.ajax({
				type: "get",
				url:"/easy_work/data/livelist.json",
				//url: "/api/getLivelist.php", //需要在fekit里面输入命令$ fekit server -m "easy_work/data/mock.js"    特别重要
				data: {
					rtype: "origin"
				},
				success: function(res) {
					vm.livelist = res.data;
					dataArr = vm.livelist;
				}
			});
		},
		show: function() {

			var _this = this;

			var myswiper = new Swiper(".slide-con", {
				autoplay: 3000,
				pagination: ".swiper-pagination"

			});

			// 下拉刷新，上拉加载更多
			var scrollSize = 30;
			var myScroll = this.widgets.homeScroll;
				myScroll.scrollBy(0, -scrollSize);

			var head = $('.head img'),
				topImgHasClass = head.hasClass('up');
			var foot = $('.foot img'),
				bottomImgHasClass = head.hasClass('down');
			myScroll.on('scroll', function() {
				var y = this.y,
					maxY = this.maxScrollY - y;
				if (y >= 0) {
					!topImgHasClass && head.addClass('up');
					return '';
				}
				if (maxY >= 0) {
					!bottomImgHasClass && foot.addClass('down');
					return '';
				}
			});

			myScroll.on('scrollEnd', function() {
				if (this.y >= -scrollSize && this.y < 0) {
					myScroll.scrollTo(0, -scrollSize);
					head.removeClass('up');
				} else if (this.y >= 0) {
					head.attr('src', '/easy_work/img/ajax-loader.gif');
					// ajax下拉刷新数据

					setTimeout(function() {
						myScroll.scrollTo(0, -scrollSize);
						head.removeClass('up');
						head.attr('src', '/easy_work/img/arrow.png');

						vm = _this.getVM();

						$.ajax({
							type: "get",
							url:"/easy_work/data/livelistrefresh.json",
							//url: "/api/getLivelist.php",
							data: {
								rtype: "refresh"
							},
							success: function(res) {
								var newDataArr = res.data;
								newDataArr = newDataArr.concat(dataArr);
								vm.livelist = newDataArr;
							}
						});

					}, 500);
				}

				var maxY = this.maxScrollY - this.y;
				var self = this;
				if (maxY > -scrollSize && maxY < 0) {
					myScroll.scrollTo(0, self.maxScrollY + scrollSize);
					foot.removeClass('down')
				} else if (maxY >= 0) {
					foot.attr('src', '/easy_work/img/ajax-loader.gif');
					// ajax上拉加载数据
					vm = _this.getVM();

					setTimeout(function() {
						$.ajax({
							type: "get",
							url:"/easy_work/data/livelistmore.json",
							//url: "/api/getLivelist.php",
							data: {
								rtype: "more"
							},
							success: function(res) {
								var newDataArr = dataArr.concat(res.data);
								vm.livelist = newDataArr;

							}
						});

						myScroll.refresh();

						//myScroll.scrollTo(0, self.y + scrollSize);
						myScroll.scrollTo(0, self.y - scrollSize);
						//myScroll.scrollTo(0, self.y);
						foot.removeClass('down');
						foot.attr('src', '/easy_work/img/arrow.png');
					}, 500);
				}
			})

		}
	},
	//绑定Events结束
	bindActions: {
		"goto-partTime": function() {
			SPA.open("part-time")
		},
		"goto-jackaroo": function() {
			SPA.open("jackaroo")
		},
		'goto-detail':function () {
			SPA.open('detail')
		}
	}
})
