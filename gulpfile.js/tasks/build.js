
const notify 			= require('gulp-notify')
const lodash			= require('lodash')


module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const browserSync = ops.browserSync
	const gulpSequence = ops.gulpSequence

	gulp.task('build', function( cb ){

		process.env.prod = true

		let tasks = [
			'sass',
			'html',
			'webpack:production',
			'generate-data',
			'fonts'
		]

		// Running as a global CLI:
		if( process.OPS.open ){
			return gulpSequence( 'clean', tasks, 'images', 'browserSync', cb)
		}
		return gulpSequence( 'clean', tasks, 'images', function(){
			console.log('All done.')
			cb()
		})

	})

}