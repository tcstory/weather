var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postPxToEm = require('postcss-px-to-em');

process.argv.forEach(function (item) {
    if (item === 'auto') {
        process.env.AUTO = '1';
    } else if (item === 'https') {
        process.env.HTTPS = '1';
    }
});

module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: "js/chunk/[name].js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    resolve: {
        extensions: ['', '.js'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url?limit=10000&name=images/[name].[ext]'
            },
            {
                test: /\.(woff|eot|ttf).*?$/i,
                loader: 'url?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ],
    postcss: function () {
        return [autoprefixer, postPxToEm({base: 16})];
    }
};

if (process.env.AUTO === '1') {
    module.exports.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
