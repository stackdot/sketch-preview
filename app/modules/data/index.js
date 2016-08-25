// data modules components:

var service = require('./services/data.service.js');



module.exports = angular.module('app.data', [])
	.service('dataService', [ '$http', '$state', service ]);