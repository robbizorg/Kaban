const path = require('path');

const PATHS = {
	// path.resolve is the same as path.join
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

module.exports = {
	// Entry accepts a path or an object of enteries. Using Latter form
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	}
}