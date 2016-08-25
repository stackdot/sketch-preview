#! /usr/bin/env node

const DIR 		= process.cwd()
let OPS 		= {}

const lodash	= require('lodash')
const argv		= require('optimist').argv
const path		= require('path')
const gulp 		= require('gulp')


OPS.input = argv.input
OPS.output = argv.output || 'public/'
OPS.open = argv.open || false

if( lodash.isEmpty( OPS.input ) ){
	console.error( "No input file defined. Use --input=filename.sketch" )
	return process.exit( 1 )
}


OPS.inputFile = path.resolve( process.cwd(), OPS.input )
OPS.outputPath = path.resolve( process.cwd(), OPS.output )

process.OPS = OPS

require('./gulpfile.js/index.js')

gulp.start('build')