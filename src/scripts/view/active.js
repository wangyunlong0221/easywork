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
			});
			
			
			  var _this = this;
			
			  var scrollSize = 30;
		      var myScroll = this.widgets.activeScroll;
		      myScroll.scrollBy(0, -scrollSize);
			  //myScroll.y=0;
		      
				
		      var head = $('.head img'),
		          topImgHasClass = head.hasClass('up');
		      var foot = $('.foot img'),
		          bottomImgHasClass = head.hasClass('down');
		      myScroll.on('scroll', function () {
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
		      
		      
		       	myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/easy_work/img/ajax-loader.gif');
              // ajax下拉刷新数据

              setTimeout(function () {
                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/easy_work/img/arrow.png');
                 
                 vm = _this.getVM();
                 
                $.ajax({
				type:"get",
				//url:"/easy_work/data/livelist.json",
				url:"/api/getLivelist.php",  
				data:{
					rtype:"active_refresh-origin"
				},
				success:function (res) {
					console.log(res);
					
					var newDataArr =res.data;
					newDataArr =  newDataArr.concat(dataArr);
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
				
					
                   setTimeout(function () {
					$.ajax({
						type:"get",
						//url:"/easy_work/data/livelist.json",
						url:"/api/getLivelist.php", 
						data:{
							rtype:"active_more-origin"
						},
						success:function (res) {
							console.log(res);
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
	
	
	bindActions:{
		'tabs-slide':function (e,data) {
			this.myswiper.slideTo($(e.el).index());
		}
	}
})
