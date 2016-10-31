const path              = require('path'),
    postcssAutoprefixer = require('autoprefixer'),
    webpack             = require('webpack'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin  = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = function(root) {
    return {
        entry: require(`${root}/config/entry`)(root),
        output: {
            path: `${root}/release/resource/vendor`,
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
                    loader: ExtractTextPlugin.extract('style', 'css!postcss')
                },
                {
                    test: /\.(sass|scss)$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
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
                },
                {
                    test: /\.vue$/,
                    loader: 'vue'
                }
            ]
        },
        resolve: {
            alias: {
                'jquery': 'jquery/dist/jquery.min',
                'vendor': `${root}/vendor`,
                'pioneer': `${root}/vendor/pioneer`
            },
            extensions: ['', '.js', '.vue']
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            new CommonsChunkPlugin('vendor.js')
        ],
        postcss: function() {
            return [postcssAutoprefixer]
        }
    }
}
