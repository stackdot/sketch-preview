'use strict'

process.OPS = process.OPS || {}

// passed in ops:
let gulp 				= process.gulp || require('gulp')
const lodash 			= require('lodash')
const browserSync 		= require('browser-sync')
const gulpSequence 		= require('gulp-sequence').use( gulp )
const requireDir		= require('require-dir')
const path				= require('path')


const vendors = [
	'angular',
	'angular-ui-router',
	'angular-animate',
	'angular-aria',
	'angular-material',
	'jquery',
	'lodash'
]

var config = {
	app: './app',
	dest: process.OPS.outputPath || './public',
	uiPort: 5000,
	tasks: {
		sass: {
			dest: 'styles',
			paths: [
				'node_modules/',
				'../../node_modules/',
				'node_modules/font-awesome/scss'
			],
			artifacts: {
				'app': {
					src: [
						path.resolve(__dirname, '../')+'/app/styles/app.scss',
						path.resolve(__dirname, '../')+'/app/modules/**/*.scss'
					]
				}
			}
		},
		webpack: {
			src: '',
			dest: '',
			artifacts: {
				app: './app',
				vendors: vendors
			},
			output: '[name].bundle.js',
			loaders: [
				{ test: /\.html$/, loader: 'raw' },
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
					query: {
						presets: ['es2015-script']
					}
				}],
			noParse: vendors
		},
		html: {
			src: '*.html'
		},
		images: {
			src: [
				path.resolve(__dirname, '../')+'/app/images/**/*.+(png|jpg|gif|jpeg)',
				process.cwd()+'/_artboards/**/*.+(png|jpg|gif|jpeg)'
			],
			dest: 'images'
		},
		fonts: {
			src: [
				'node_modules/font-awesome/fonts/**/*',
				'../../node_modules/font-awesome/fonts/**/*'
			],
			dest: 'styles/fonts'
		}
	}
}

// console.log('D', __dirname, process.cwd())
// return console.log('config', JSON.stringify(config, null, 4) )

let env = 'dev'
const falsy = /^(?:f(?:alse)?|no?|0+)$/i
Boolean.parse = (val) => {
	return !falsy.test(val) && !!val;
}

// custom additions to ops:
let ops = {}
ops.gulp = gulp
ops.config = config
ops.browserSync = browserSync
// ops.program = program
ops.gulpSequence = gulpSequence
ops.prod = function(){
	return false
}
ops.env = env


// Require all tasks in gulpfile.js/tasks, including subfolders
let tasks = requireDir( './tasks' )

// load each gulp task and pass it ops:
tasks = lodash.each( tasks, (task) => task( ops ) )
