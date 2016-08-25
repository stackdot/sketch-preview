
const lodash = require('lodash')

module.exports = function( $http, $state ){
	return {
		data: {
			returned: false,
			scale: 100,
			pages: [],
			currentPage: 0,
			updateCurrentPage: function(){
				if( this.pages.length < 1 ) return false
				this.currentPage = lodash.indexOf( this.pages, lodash.find( this.pages, { id: $state.params.id }))
			}
		},
		get: function( callback ){
			console.log('getting..', this)
			return $http({
				method: 'GET',
				withCredentials: true,
				url: 'data.json'
			}).then(( res ) => {
				this.data.pages = lodash.reject(res.data.pages, { name: 'Symbols' })
				this.data.updateCurrentPage()
				this.data.returned = true
			})
		}
	};
};