// pages controller:

const lodash = require('lodash')

module.exports = ( $scope, $state, dataService ) => {

	var self = this

	console.log('SS', $state.params.id)

	this.data = {}
	this.data = dataService.data

	dataService.get()

	return this

}