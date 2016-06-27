var tplPartTime = require("../templates/part-time.string");

SPA.defineView("part-time",{
	html:tplPartTime,
	
	plugins:['delegated',
		{
			name:'avalon',
			options:function (vm) {
				vm.livelist = [] 
			}
		}
	],
	modules:[{
		name:'content'
		//views:''
	}
	],
	
	bindActions:{
		'taps-swich':function () {
			$('.taps-list li:nth-of-type(1) i').addClass('swich-right')
		},
		'back':function () {
			this.hide();
		}
	},
	bindEvents:{
		'beforeShow':function (){
			var _this = this;
			var vm = _this.getVM();
			$.ajax({
				type:"get",
				url:"/api/getLivelist.php",
				data:{
					'rtype':'part-origin'
				},
				async:true,
				success:function (res) {
					vm.livelist = res.data; 
					dataArr = vm.livelist;
				}
			});
		},
		
		'show':function () {
			
			  var _this = this;
			
			  var scrollSize = 30;
		      var myScroll = this.widgets.partWorkScroll;
		      myScroll.scrollBy(0, -scrollSize);
			  myScroll.y=0;
		      
				
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
				url:"/api/getLivelist.php",  //需要在fekit里面输入命令$ fekit server -m "easy_work/data/mock.js"    特别重要
				data:{
					rtype:"refresh"
				},
				success:function (res) {
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
							rtype:"more"
						},
						success:function (res) {
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
	}
})
