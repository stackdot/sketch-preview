// nav modules components:

const controller = require('./controllers/nav.ctrl.js')
const directive = require('./directives/nav.directive.js')

module.exports = angular.module('app.nav', [] )
	.controller( 'navCtrl', [ '$scope', '$state', 'dataService', controller ] )
	.directive( 'navbar', [ directive ] )
