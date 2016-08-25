// page controller:

const lodash 				= require('lodash')
const q 					= require('q')
const Hamster 				= require('hamsterjs')
const $ 					= require('jquery')

module.exports = ( $scope, dataService, $rootScope, $state ) => {


	const ZOOM_PER_TICK = 20
	const INITIAL_SCALE = 80
	const TEXT_FILL_OFFSET = 40


	$scope.data = dataService.data
	$scope.page = {}
	let self = {}
	let maxx, maxy;

	$scope.minScale = 20
	$scope.maxScale = 400

	let boardContents = $('#boardcontents')
	let boardlayout = $('#boardlayout')
	$scope.data.scale 	= INITIAL_SCALE

	let boardlayoutWidth = parseInt( boardlayout.width(), false ) || 0
	let boardlayoutHeight = parseInt( boardlayout.height(), false ) || 0

	$scope.dblClick = function( board ){
		console.log('Board:', board)
		$state.go('pages.page.artboard', {
			id: $scope.page.id,
			artboard: board.id
		})
	}

	if($scope.data.returned){
		kickOff()
	}
	$scope.$watch('data.returned', function(){
		if(lodash.isEmpty( $scope.data.pages ) ) return false
		kickOff()
	})

	function centerContents(){
		updateLayoutWidth()
		if(boardlayoutWidth == 0){
			setTimeout( centerContents.bind( this ), 40 )
		}
		// If the content is bigger than the page width:
		if( boardlayoutWidth < maxx ) return false

		let midCont = ( maxx / 2 ) * ( $scope.data.scale / 100 )
		boardContents.css({
			left: ( ( boardlayoutWidth / 2 ) - midCont )
		})
	}

	function kickOff(){

		let page = lodash.find( $scope.data.pages, { id: $scope.pageId })

		let minx = lodash.min( lodash.map( page.artboards, ( b ) => lodash.get(b, 'rect.x') ) )
		let miny = lodash.min( lodash.map( page.artboards, ( b ) => lodash.get(b, 'rect.y') ) )

		// console.log('xx', )
		maxx = ( lodash.max( lodash.map( page.artboards, ( b ) => b.rect.x + b.rect.width ) ) + Math.abs(minx) )
		maxy = ( lodash.max( lodash.map( page.artboards, ( b ) => b.rect.y + b.rect.height ) ) + Math.abs(miny) )

		boardContents.css({ width: maxx, height: maxy })

		updateLayoutWidth()
		page.artboards = lodash.map( page.artboards, ( board ) => {
			board.rect.x -= minx
			board.rect.y -= miny
			return board
		})
		$scope.page = page
		centerContents()

	}


	boardlayout.bind('mousemove', function( e ){
		self.panEndX = e.pageX
		self.panEndY = e.pageY
		if(self.mouseDown){
			var pageTop = self.pageTop
			var pageLeft = self.pageLeft
			self.panTop = self.panEndY - self.panStartY
			self.panLeft = self.panEndX - self.panStartX
			pageTop += self.panTop
			pageLeft += self.panLeft
			boardContents.css({ top: pageTop, left: pageLeft })
		}
	})
	boardlayout.bind('mousedown', function( e ){
		e.preventDefault()
		self.panStartX = e.pageX
		self.panStartY = e.pageY
		self.pageTop = parseInt(boardContents.css('top'), false) || 0
		self.pageLeft = parseInt(boardContents.css('left'), false) || 0
		self.mouseDown = true
	})
	boardlayout.bind('mouseup', function(){
		self.mouseDown = false
	})

	function updateLayoutWidth(){
		boardlayoutWidth = parseInt( boardlayout.width(), false ) || 0
		boardlayoutHeight = parseInt( boardlayout.height(), false ) || 0
	}

	$scope.didChange = function(){
		scalePage()
	}

	$rootScope.$on('zoom', ( e, params ) => {
		const { direction, event } = params
		directionScale( direction )
		$scope.$apply()
	})

	$scope.clickZoom = function( direction ){
		directionScale( direction )
	}

	function directionScale( direction ){
		if(direction == 'in')
			$scope.data.scale += ZOOM_PER_TICK
		else
			$scope.data.scale -= ZOOM_PER_TICK
		scalePage()
	}
	
	Hamster( boardlayout[0] ).wheel(function( event, delta, deltaX, deltaY ){
		$scope.data.scale += deltaY
		scalePage()
		$scope.$apply()
	})

	function scalePage(){

		updateLayoutWidth()
		
		let offset = boardContents.offset()
		let pageWidth = parseInt(boardContents.css('width'), false) || 0
		let pageHeight = parseInt(boardContents.css('height'), false) || 0

		offset.top = offset.top - 49 // top bar has to be counted
		offset.left = offset.left - ( offset.left * 2 )
		offset.top = offset.top - ( offset.top * 2 )

		let halfScreenx = ( boardlayoutWidth / 2 )
		let halfScreeny = ( boardlayoutHeight / 2 )
		let toLeft =  ( offset.left + halfScreenx )
		let toTop =  ( offset.top + halfScreeny )

		
		if( $scope.data.scale <= $scope.minScale ) $scope.data.scale = $scope.minScale+0
		if( $scope.data.scale >= $scope.maxScale ) $scope.data.scale = $scope.maxScale+0
		// $scope.data.scale = parseFloat( parseFloat($scope.data.scale).toFixed(2) )

		let offsetPercx = ( toLeft / pageWidth )
		let offsetPercy = ( toTop / pageHeight )
		let newToLeft = ( ( ( ( maxx * ( $scope.data.scale / 100 ) ) * offsetPercx ) - halfScreenx ) )
		let newToTop = ( ( ( ( maxy * ( $scope.data.scale / 100 ) ) * offsetPercy ) - halfScreeny ) )

		newToLeft = newToLeft - ( newToLeft * 2 )
		newToTop = newToTop - ( newToTop * 2 )

		// console.log('SET', $scope.data.scale, `${toLeft}px 600px`)
		boardContents.css({
			left: `${newToLeft}px`,
			top: `${newToTop}px`,
			transform: `scale(${$scope.data.scale/100},${$scope.data.scale/100})`
		})

	}

}