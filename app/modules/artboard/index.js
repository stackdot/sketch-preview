// artboard modules components:

const controller = require('./controllers/artboard.ctrl.js')
const directive = require('./directives/artboard.directive.js')

module.exports = angular.module('app.artboard', [] )
	.controller( 'artboardCtrl', [ '$scope', 'dataService', controller ] )
	.directive( 'artboard', [ directive ] )
