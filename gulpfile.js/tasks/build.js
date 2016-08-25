
const notify 			= require('gulp-notify')
const lodash			= require('lodash')


module.exports = function( ops ){

	let gulp 				= ops.gulp
	const config 			= ops.config
	const browserSync 		= ops.browserSync
	const gulpSequence 		= ops.gulpSequence

	gulp.task('build', function( cb ){

		process.env.prod = true

		// callback if nothing else
		gulp._cb = gulp._cb || function(){ cb() }
		
		console.log('build')

		let tasks = [
			'sass',
			'html',
			'webpack:production',
			'generate-data',
			'fonts'
		]

		// Running as a global CLI:
		if( process.OPS.open ){
			return gulpSequence( 'clean', tasks, 'images', 'browserSync', gulp._cb)
		}
		return gulpSequence( 'clean', tasks, 'images', gulp._cb)

	})

}