
const notify 			= require('gulp-notify')
const lodash			= require('lodash')


module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config
	const browserSync = ops.browserSync

	const settings = config.browserSync || {
		server: {
			baseDir: config.dest,
		},
		notify: false,
		ghostMode: false,
		port: config.uiPort,
	}

	const browserSyncTask = function( cb ){
		browserSync.init( settings )

		gulp.watch([
			config.dest+"/**/*.html",
		]).on( 'change', browserSync.reload )
	}

	gulp.task( 'browserSync', browserSyncTask )

	return browserSyncTask

}