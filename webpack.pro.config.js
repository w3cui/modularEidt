'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * Module dependencies
 */
module.exports = {
    cache: false,
    entry: {
        'app': __dirname + '/src/main'
    },

    output: {
        path: 'build/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'])
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
        }]
    },
    babel: {
        babelrc: false,
        presets: [
            ['es2015'],
        ],
    },
    resolve: {
        root: [
            './node_modules',
            './src/lib'
        ],
        moduleDirectories: [
            'bower_components',
        ],
        alias: {
            '@':path.resolve(__dirname,'src'),
        }
    },

    externals: {
        "angular": "angular",
        "uirouter": "\'ui.router\'",
        'ionic': 'ionic'
    },

    plugins: [
        new ExtractTextPlugin("./styles.css"),
        // new CopyWebpackPlugin([{
        //     from: [__dirname + '/src/style/**','!'+__dirname + '/src/style/**.less'], 
        //     to: __dirname + '/build/style',
        // }], {
        //     ignore: [],
        //     copyUnmodified: true,
        //     debug: "debug"
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Angular with webpack',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
                drop_console: true
            },

        }),
    ],
    //watch:true
};