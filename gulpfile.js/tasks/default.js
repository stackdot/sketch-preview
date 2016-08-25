
const notify 			= require('gulp-notify')
const lodash			= require('lodash')


module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const browserSync = ops.browserSync
	const gulpSequence = ops.gulpSequence

	gulp.task('default', function( cb ){

		console.log('Default task')
		process.env.prod = false
		return gulpSequence( 'clean', [ 'generate-data', 'sass:watch', 'html:watch', 'webpack:watch', 'fonts:watch' ], 'images:watch', 'browserSync', cb )

	})

}