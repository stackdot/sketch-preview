

const path 			= require('path')
const notify 		= require('gulp-notify')

module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const env = ops.env
	const browserSync = ops.browserSync

	const paths = {
		src: path.resolve( __dirname, '../../', config.app, config.tasks.html.src ),
		dest: path.resolve( config.dest )
	}

	const htmlTask = function(){
		const PROD = Boolean.parse(process.env.prod)
		let stream = gulp.src( paths.src )
			.pipe(gulp.dest( paths.dest ))
		if(!PROD)
			stream = stream.pipe(browserSync.stream())
		return stream
	}

	gulp.task('html', htmlTask)
	gulp.task('html:watch', ['html'], function(){
		return gulp.watch( paths.src, ['html'] )
	})

	return htmlTask

}
