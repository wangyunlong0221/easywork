var tplWorkhelp = require("../templates/work-help.string");
SPA.defineView("work-help",{
	html:tplWorkhelp,
	
	plugins:["delegated",{
		name: "avalon",
		options: function(vm) {
			vm.livelist = [];
		}
	}],
	
	bindEvents:{
		beforeShow:function () {
			var _this = this;
			var vm = _this.getVM();
			//初始请求

			$.ajax({
				type: "get",
				//url:"/easy_work/data/livelist.json",
				url: "/api/getLivelist.php", 
				data: {
					rtype: "work_help-origin"
				},
				success: function(res) {
					vm.livelist = res.data;
					dataArr = vm.livelist;
				}
			});
			
			
		},
		show:function () {
			
			
			  var _this = this;
			
			  var scrollSize = 30;
		      var myScroll = this.widgets.work_helpScroll;
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
				url:"/api/getLivelist.php",  
				data:{
					rtype:"work_help-refresh"
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
				//vm = _this.getVM();
				
					
                   setTimeout(function () {
					$.ajax({
						type:"get",
						//url:"/easy_work/data/livelist.json",
						url:"/api/getLivelist.php", 
						data:{
							rtype:"work_help-more"
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
	},
	
	bindActions:{
		"goto-ask":function () {
			SPA.open("ask-answer");
			
		},
		"goto-issue":function () {
			SPA.open("issue",{
				ani: {
			          name: 'actionSheet',
			          "autoHide": true,
					  "distance": 0,
					  "duration": 200, 
					  "showMask": true,
					  "maskColor": "#000",
					  "maskOpacity": "0.4"
			          
		        }
//				ani: {
//			          name: 'Popup',
//			          "autoHide": true,
//					  "autoDirection": true,
//					  "direction": "right",
//					  "duration": 100,
//					  "width": 100,
//					  "height": 100,
//					  "position": "center"
//		        }


//				ani: {
//			          name: 'dialog',
//			           "autoHide": false,
//					    "maskColor": "#000",
//					    "maskOpacity": "0.4",
//					    "duration": 200,
//					    "width": 280,
//					    "height": 200
//			          
//		        }
			});
		}
	
		
	}
})