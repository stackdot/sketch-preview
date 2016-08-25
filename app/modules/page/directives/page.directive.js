

const directiveTemplate 	= require('./page.tpl.html')
const lodash 				= require('lodash')
const q 					= require('q')
const Hamster 				= require('hamsterjs')
const $ 					= require('jquery')

module.exports = ( dataService, $state, $rootScope ) => {
	
	return {
		scope: {
			pageId: '@',
			scale: '@'
		},
		restrict: 'E',
		replace: false,
		template: directiveTemplate,
		controller: 'pageCtrl'
	}

}