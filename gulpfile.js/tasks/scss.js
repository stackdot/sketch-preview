

module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const env = ops.env
	const browserSync = ops.browserSync

	if(!config.tasks.sass) return

	const path 				= require('path')
	const lodash 			= require('lodash')
	const minifyCSS 		= require('gulp-minify-css')
	const sourcemaps 		= require('gulp-sourcemaps')
	const sass 				= require('gulp-sass')
	const concat 			= require('gulp-concat')
	const notify 			= require('gulp-notify')

	let tasks = []
	const DEST = path.resolve( config.dest, config.tasks.sass.dest )

	const sassTask = function( artifact, output ){

		const PROD = Boolean.parse(process.env.prod)

		const filename = output+'.css'
		const paths = lodash.map(config.tasks.sass.paths, function(dir){
			return path.resolve( __dirname, '../..', dir )
		})

		let stream = gulp.src( artifact.src )

		if(!PROD){
			stream = stream.pipe(sourcemaps.init())
		}

		stream = stream.pipe(sass({
			includePaths: paths
		}).on('error', notify.onError(function(err){
			return {
				title: '',
				'subtitle': 'SASS Error',
				'message': err.message,
				'icon': path.resolve(__dirname, 'app/images/logo.png'), // case sensitive
			}
		}))).pipe(concat( filename ))

		if(PROD){
			stream = stream.pipe(minifyCSS())
		}else{
			// sourcemap LESS files, easy debugging:
			stream = stream.pipe(sourcemaps.write('.'))
		}
		stream = stream.pipe(gulp.dest(DEST))
		return stream
	}


	const sassTask_Watch = function( cb ){
		lodash.each(config.tasks.sass.artifacts, function( artifact, output ){
			gulp.watch(artifact.src, ['sass-'+output])
		})
		// Inject on css changes in destination directory:
		gulp.watch([DEST+'/**/*.css']).on('change', function(){
			gulp.src(DEST+'/**/*.css')
				.pipe(browserSync.stream())
		})
		cb()
	}

	lodash.each(config.tasks.sass.artifacts, function( artifact, output ){
		const task = 'sass-'+output
		gulp.task(task, function(){
			return sassTask( artifact, output )
		})
		tasks.push(task)
	})

	gulp.task('sass', tasks)
	gulp.task('sass:watch', ['sass'], sassTask_Watch)
	return sassTask

}
