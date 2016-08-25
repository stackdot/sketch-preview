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

const exe = require('./main.js')( OPS, gulp )
exe(function(){
	console.log('All Done!')
})