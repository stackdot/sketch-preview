


module.exports = function( ops ){

	const gulp 				= ops.gulp
	const config 			= ops.config
	const env 				= ops.env
	const browserSync 		= ops.browserSync
	let initialCompile 		= false

	if(!config.tasks.webpack) return

	const path 			= require('path')
	const lodash 		= require('lodash')
	const notify 		= require('gulp-notify')
	const webpack 		= require('webpack')
	const raw 			= require('raw-loader')

	var getOptions = function( PROD ){

		PROD = PROD || Boolean.parse( process.env.prod )
		const context 				= path.resolve( __dirname, '../../', config.app, config.tasks.webpack.src )
		const dest 					= path.resolve( config.dest, 'js' )
		const modulesDirectories 	= path.resolve( __dirname, '../../node_modules/' )

		// Default DEV settings:
		let options = {
			context: context,
			entry: config.tasks.webpack.artifacts,
			output: {
				path: dest,
				filename: config.tasks.webpack.output,
				publicPath: '/js/'
			},
			node: {
				fs: 'empty'
			},
			resolve: {
				root: [ context ],
				// modulesDirectories: [ modulesDirectories ],
				alias: config.tasks.webpack.alias
			},
			module: {
				loaders: config.tasks.webpack.loaders
			},
			plugins: [
				new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
				new webpack.DefinePlugin({
					VER: '123',
					PROD: false
				}),
				// new webpack.ProvidePlugin({
				// 	d3: 'd3'
				// })
			],
			noParse: config.tasks.webpack.noParse || []
		}

		// PROD options ( minify, etc )
		if(PROD === true){
			options.plugins.push(
				// Minify the compiled JS:
				new webpack.optimize.UglifyJsPlugin({
					sourceMap: false,
					mangle: false
				})
			)
			options.plugins.push(
				// Make sure we dont have dupes:
				new webpack.optimize.DedupePlugin()
			)

			// Strip out console.log for prod:
			// options.module.loaders.push({
			// 	test: /\.js$/,
			// 	loader: 'strip-loader?strip[]=console.log'
			// })
		} else{
			options.devtool = 'source-map'
		}

		return options
	}

	// Dev version:
	const webPackTask_Watch = function( callback ){
		const options = getOptions()
		const WPAC = webpack(options).watch(200, function(err, stats){
			if( !lodash.isEmpty( stats.compilation.errors ) ){
				console.log('ERROR:', stats.compilation.errors[0].message)
				notify({
					title: '',
					'subtitle': 'WebPack Error',
					'message': stats.compilation.errors[0].message,
					'icon': path.join(__dirname, 'app/images/logo.png'), // case sensitive
				})
			}
			browserSync.reload()
			// On the initial compile, let gulp know the task is done
			if(!initialCompile){
				initialCompile = true
				callback()
			}
		})
	}

	// Prod version:
	const webPackTask_Production = function( callback ){
		const options = getOptions(true)
		const WPAC = webpack(options, function(err, stats){
			// logger(err, stats)
			if( !lodash.isEmpty( stats.compilation.errors ) ){
				console.log('ERROR:', stats.compilation.errors[0].message)
				notify({
					title: '',
					'subtitle': 'WebPack Error',
					'message': stats.compilation.errors[0].message,
					'icon': path.join(__dirname, 'app/images/logo.png'), // case sensitive
				})
			}
			callback(err)
		})
	}

	gulp.task('webpack:watch', webPackTask_Watch)
	gulp.task('webpack:production', webPackTask_Production)

	return {
		getOptions: getOptions
	}

}
