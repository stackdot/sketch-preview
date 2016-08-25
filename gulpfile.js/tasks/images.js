

module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const env = ops.env
	const browserSync = ops.browserSync

	if(!config.tasks.images) return

	const lodash 			= require('lodash')
	const imagemin 			= require('gulp-imagemin')
	const path 				= require('path')
	const notify 			= require('gulp-notify')
	const changed 			= require('gulp-changed')


	const sources = lodash.map(config.tasks.images.src, function( src ){
		return path.join( src )
	})

	const paths = {
		src: sources,
		dest: path.resolve(config.dest, config.tasks.images.dest)
	}

	const imagesTask = function(){
		const PROD = Boolean.parse(process.env.prod)
		let stream = gulp.src(paths.src)
			.pipe(changed(paths.dest)) // Ignore unchanged files
			.pipe(imagemin({
				optimizationLevel: 5,
				progressive: true,
				interlaced: true
			})) // Optimize
			.pipe(gulp.dest(paths.dest))
		if(!PROD)
			stream = stream.pipe(browserSync.stream())
		return stream
	}

	gulp.task('images', imagesTask)
	gulp.task('images:watch', ['images'], function(){
		return gulp.watch( paths.src, ['images'] )
	})
	return imagesTask

}