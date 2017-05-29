const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
		path.join(__dirname, '/src/index.jsx'),
        path.join(__dirname, '/src/styles/base.scss'),
    ],

    output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
        root: [
            path.resolve(__dirname, 'src')
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('app.min.css')
    ],

    module: {
        loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel']
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loaders: ['babel']
			},
			{
				test: /\.html$/,
				loaders: ['html']
			},
			{
				test: /\.json$/,
				loaders: ['json']
			},
			{
				test: /\.svg$/,
				loaders: ['url']
			}
		],     
        preLoaders: [
            { test: /\.js$/, include: [/src/], loader: 'source-map-loader' },
        ]
    },
    postcss: function() {
		return [
			require('autoprefixer')
		]
	},   
    target: 'electron-renderer'
};