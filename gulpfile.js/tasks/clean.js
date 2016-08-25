

const clean 		= require('rimraf')
const mkdirp 		= require('mkdirp')
const path 			= require('path')

module.exports = function( ops ){

	const gulp = ops.gulp
	const config = ops.config

	gulp.task('clean-artboards', function( cb ){

		let _path = path.resolve( config.dest, '../_artboards' )
		if(process.OPS.input){
			_path = path.resolve( process.OPS.outputPath, '../_artboards' )
		}
		clean( _path, cb )
	})

	gulp.task('clean', [ 'clean-artboards' ], function( cb ){
		clean(config.dest, ( err ) => {
			mkdirp(config.dest, cb)
		})
	})

}