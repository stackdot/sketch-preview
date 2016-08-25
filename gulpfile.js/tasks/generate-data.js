

const fs 			= require('fs')
const exec 			= require('child_process').exec
const path 			= require('path')

module.exports = function( ops ){

	const gulp 		= ops.gulp;
	const config 	= ops.config;
	
	const BIN = path.resolve( __dirname, '../../sketchtool/bin/sketchtool' )

	function getParams(){
		if( process.OPS.input ){
			return {
				exportDir: 	path.resolve( process.OPS.outputPath, '../_artboards' ),
				jsonDir: 	path.resolve( process.OPS.outputPath, './data.json' ),
				sketchFile: process.OPS.inputFile
			}
		}else{
			return {
				exportDir: 	path.resolve( config.app, '../_artboards' ),
				jsonDir: 	path.resolve( config.app, '../public/data.json' ),
				sketchFile: path.resolve( config.app, '../sketch/social-app-ui-kit.sketch' )
			}
		}
	}

	gulp.task( 'export-images', function( cb ){
		const { exportDir, jsonDir, sketchFile } = getParams()
		exec( `${BIN} export artboards --include-symbols --output=${exportDir} --scales=2.0 --use-id-for-name=YES --format=jpg ${sketchFile}`, cb )
	})

	gulp.task( 'generate-data', [ 'export-images' ], function( cb ){
		const { exportDir, jsonDir, sketchFile } = getParams()
		exec( `${BIN} list artboards ${sketchFile}`, ( err, out ) => {
			let json = JSON.parse( out )
			fs.writeFileSync( jsonDir, out )
			cb(err)
		})

	});

};