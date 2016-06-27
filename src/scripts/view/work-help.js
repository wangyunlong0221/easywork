var tplWorkhelp = require("../templates/work-help.string");
SPA.defineView("work-help",{
	html:tplWorkhelp,
	
	plugins:["delegated"],
	
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