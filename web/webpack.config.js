const webpack = require('webpack')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const validate = require('webpack-validator')
const path = require('path')
const parts = require('../lib/webpack.parts')

const paths = {
	root: path.resolve(__dirname),
	template: path.resolve(__dirname, '../lib/index.html'),
	app: path.resolve(path.join(__dirname, 'src/index.js')),
	build: path.resolve(path.join(__dirname, 'build')),
	dist: path.resolve(__dirname, '../api/assets'),
	style: path.resolve(path.join(__dirname, 'style/index.css')),
	images: path.resolve(path.join(__dirname, 'img')),
	fonts: path.resolve(path.join(__dirname, 'fonts'))
}

const common = merge(
	{
		context: paths.root,
		output: {
			filename: '[name].js'
		},
		plugins: [
			new htmlWebpackPlugin({
				title: 'Threads',
				template: paths.template
			}),
			new webpack.optimize.OccurenceOrderPlugin()
		],
	},
	parts.images(paths.images),
	parts.fonts(paths.fonts)
)

var config

switch (process.env.npm_lifecycle_event){
	case 'deploy':
		config = merge(
			common,
			{
				entry: {
					app: [ 'babel-polyfill', paths.app],
					vendor: ['react']
				},
				devtool: 'cheap-module-source-map',
				output: {
					path: paths.dist,
					filename: 'js/[name][chunkhash].js',
					chunkFilename: '[chunkhash].js'
				}
			},
			parts.CSSdist(),
			parts.freeVar('process.env.NODE_ENV', 'production'),
			parts.babelDist(),
			parts.extractBundle({
				name: 'vendor',
				entries: ['react']
			}),
			parts.minify(),
			parts.clean(paths.dist)
		)
		break
	default:
		config = merge(
			common,
			{
				entry: {
					app: [
						'react-hot-loader/patch',
						'babel-polyfill',
						'webpack-dev-server/client?http://localhost:8081',
						'webpack/hot/only-dev-server',
						paths.app
					],
					style: [
						'webpack-dev-server/client?htpp://localhost:8081',
						'webpack/hot/only-dev-server',
						paths.style
					],
				},
				output: {
					path: path.build,
					publicPath: '',
				},
				devtool: 'source-map',
				node: {
					fs: 'empty'
				}
			},
			parts.devServer({
				host: process.env.HOST,
				port: process.env.PORT,
				contentBase: paths.build
			}),
			parts.babelDev(),
			parts.CSSDev()
		)
}
module.exports = validate(config)
