
const directiveTemplate = require('./artboard.tpl.html')

module.exports = () => {
	
	return {
		scope: {
			pageId: '@',
			artboardId: '@'
		},
		restrict: 'E',
		replace: false,
		template: directiveTemplate,
		controller: 'artboardCtrl',
		controllerAs: 'ctrl'
	}

}