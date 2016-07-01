var tplSelf_center = require("../templates/self-center.string");
SPA.defineView("self-center",{
	html:tplSelf_center,
	
	plugins:["delegated"],
	
	bindActions:{
		'to-sign':function () {
			SPA.open('sign')
		}
	}
	
})
