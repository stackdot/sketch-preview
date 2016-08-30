


module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const env = ops.env

	const browserSync = ops.browserSync

	if(!config.tasks.fonts) return

	const lodash 			= require('lodash')
	const path 				= require('path')
	const notify 			= require('gulp-notify')
	const changed 			= require('gulp-changed')

	const sources = lodash.map( config.tasks.fonts.src, ( src ) => {
		return path.resolve( __dirname, '../../', src )
	})

	const paths = {
		src: sources,
		dest: path.resolve( config.dest, config.tasks.fonts.dest )
	}

	const fontsTask = function( cb ){
		const PROD = Boolean.parse(process.env.prod)
		let stream = gulp.src( paths.src )
			.pipe(changed(paths.dest))
			.pipe(gulp.dest(paths.dest))
		if(!PROD)
			stream = stream.pipe( browserSync.stream() )
		return stream
	}

	gulp.task('fonts', fontsTask)
	gulp.task('fonts:watch', ['fonts'], function(){
		return gulp.watch( paths.src, ['fonts'] )
	})
	return fontsTask

}