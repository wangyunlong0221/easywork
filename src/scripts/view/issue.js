var tplIssue = require("../templates/issue.string");

var issue = require('../lib/swiper.animate1.0.2.min.js');

SPA.defineView("issue",{
	html:tplIssue,
	plugins:['delegated'],
	
	
	bindActions:{
		"back":function () {
			this.hide();
		}
	}
	
	
})
