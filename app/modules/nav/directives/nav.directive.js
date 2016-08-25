
const directiveTemplate = require('./nav.tpl.html')

module.exports = () => {
	
	return {
		scope: { },
		restrict: 'E',
		replace: false,
		template: directiveTemplate,
		controller: 'navCtrl',
		controllerAs: 'ctrl'
	}

}