




module.exports = function( ops ){

	const gulp 			= ops.gulp
	const config 		= ops.config
	const ghPages 		= require('gulp-gh-pages')

	gulp.task('deploy', ['build'], function(){
		return gulp.src( config.dest+'/**/*' )
			.pipe(ghPages())
	})

}