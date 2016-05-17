const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	// path.resolve is the same as path.join
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;
const common = {
	// Entry accepts a path or an object of enteries. Using Latter form
	entry: {
		app: PATHS.app
	},
	// Add resolve.extensions
	// '' is needed to allow imports without an extension
	// Note the .'s before extensions
	// Can make custom extensions 
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				// Test Expects a RegExp!
				test: /\.css$/,
				loaders: ['style', 'css'],
				// Include Accepts a path or array of paths
				include: PATHS.app

			},
			// Set up jsx, accepts js too with Regex
			{
				test: /\.jsx?$/,
				// Enable caching for improved performance during development
				// It uses default OS directory by default
				// If need cusom, pass a path i.e. babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'],
				// Parse on app files
				// Will be slow and result in error if goes through whole
				// project structure
				include: PATHS.app

			}
		]
	}
};

// If want to set up own server and use
// webpack as middleware:https://webpack.github.io/docs/webpack-dev-server.html#api
// Default Configuration, returned if Webpack
// called outside of npm
if (TARGET == 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,

			// Enable history API fallback so 
			// HTML5 History API based routing
			// works
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			// Only display errors
			stats: 'errors-only',

			// Parse host and port from env
			// Look at textbook if switching to vagrant
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true // --save
			})
		]
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {});
}