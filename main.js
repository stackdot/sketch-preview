
const path = require('path')

module.exports = function( OPS, gulp ){

	OPS.inputFile = path.resolve( process.cwd(), OPS.input )
	OPS.outputPath = path.resolve( process.cwd(), ( OPS.output || 'public/' ) )

	process.OPS 	= OPS
	process.gulp 	= gulp

	require('./gulpfile.js/index.js')

	return function( cb ){
		console.log('Generating Sketch Preview... Please be patient')
		gulp._cb = cb
		gulp.start('build')
	}

}