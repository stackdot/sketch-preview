// artboard controller:

const lodash = require('lodash')

module.exports = ( $scope, dataService ) => {

	// var self = this

	// $scope.page = {}
	// $scope.artboard = {}

	// dataService.get().then(( res ) => {
	// 	
	// 	console.log('D', $scope.page)
	// 	
	// })

	$scope.data = {}
	$scope.data = dataService.data
	$scope.page = {}
	$scope.artboard = {}

	console.log('artboard')

	if($scope.data.returned){
		kickOff()
	}
	$scope.$watch('data.returned', function(){
		if(lodash.isEmpty( $scope.data.pages ) ) return false
		kickOff()
	})

	function kickOff(){

		$scope.page = lodash.find( $scope.data.pages, { id: $scope.pageId })

		$scope.artboard = lodash.find( $scope.page.artboards, { id: $scope.artboardId })

	}

}