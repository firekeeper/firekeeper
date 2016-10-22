/**
 * Created by ashenone on 16-10-20.
 */

const path              = require('path'),
    postcssAutoprefixer = require('autoprefixer'),
    webpack             = require('webpack'),
    CommonsChunkPlugin  = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = function(root) {
    return {
        entry: {
            unit: `${root}/test/handle/entry/unit`,
            media: `${root}/test/handle/entry/media`,
            layout: `${root}/test/handle/entry/layout`
        },
        output: {
            path: `${root}/test/output/vendor`,
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: [path.resolve('node_modules'), path.resolve('app/vendor')],
                    loaders: ['babel?presets[]=es2015,presets[]=stage-1']
                },
                {
                    test: /\.css$/,
                    loaders: ['style', 'css', 'postcss']
                },
                {
                    test: /\.(sass|scss)$/,
                    loaders: ['style', 'css', 'postcss', 'sass']
                },
                {
                    test: /\.less$/,
                    loaders: ['style', 'css', 'postcss', 'less']
                },
                {
                    test: /jquery/,
                    loaders: ['expose?$', 'expose?jQuery']
                },
                {
                    test: /\.(jpg|png|gif|ico)$/,
                    loader: 'url?limit=8192'
                },
                {
                    test: /\.(svg|eot|ttf|woff)$/,
                    loader: 'url?limit=8192'
                },
                {
                    test: /\.pug$/,
                    loader: 'pug'
                }
            ]
        },
        resolve: {
            alias: {
                'jquery': 'jquery/dist/jquery.min',
                'vendor': `${root}/vendor`
            },
            extensions: ['', '.js']
        },
        plugins: [
            new CommonsChunkPlugin('vendor.js')
        ],
        postcss: function() {
            return [postcssAutoprefixer]
        }
    }
}
