'use strict'


// 3rd party modules:
const angular = require('angular')
const router = require('angular-ui-router')
require('angular-animate')
require('angular-aria')
require('angular-panhandler')
require('angular-material/angular-material')

const pagesTpl = require('modules/pages/pages.tpl.html')

// Local modules:
require('modules/data')
require('modules/nav')
require('modules/page')
require('modules/artboard')


// Create App:
angular.module('app', [
	'ui.router',
	'app.data',
	'app.page',
	'app.nav',
	'app.artboard',
	'ngMaterial'
]).config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function( $stateProvider, $urlRouterProvider, $mdThemingProvider ){

	// Theming 
	$mdThemingProvider.theme('header')
		.primaryPalette('grey')
		.dark()

	// URL Routing:
	$urlRouterProvider.otherwise('/pages')
	$stateProvider
		.state('pages', {
			url: '/pages',
			views: {
				nav: {
					template: '<navbar></navbar>'
				},
				content: {
					template: pagesTpl
				}
			}
		})
		.state('pages.page', {
			url: '/:id',
			views: {
				page: {
					template: '<page flex="100" layout="column" page-id="{{pageId}}"></page>',
					controller: ['$scope', '$stateParams', function( $scope, $stateParams ){
						// console.log('Pages page')
						$scope.pageId = $stateParams.id
					}]
				}
			}
		})
		.state('pages.page.artboard', {
			url: '/:artboard',
			views: {
				'page@pages': {
					template: '<artboard flex="100" layout="column" page-id="{{pageId}}" artboard-id="{{artboardId}}"></artboard>',
					controller: ['$scope', '$stateParams', function( $scope, $stateParams ){
						console.log('Artboard')
						$scope.pageId = $stateParams.id
						$scope.artboardId = $stateParams.artboard
					}]
				}
			}
		})


}])
.controller('app.main', ['$scope', '$state', function( $scope, $state ){

	console.log('Stackdot App Controller')

}])

