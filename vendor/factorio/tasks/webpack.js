const gulp              = require('gulp'),
    gutil               = require('gulp-util'),
    webpack             = require('webpack'),
    notify              = require('gulp-notify'),
    lodash              = require('lodash')

function handleErrors(errorObject, callback) {
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments)
    // 防止gulp进程挂掉
    if (typeof this.emit === 'function') {
        this.emit('end');
    }
}

function compileLogger(err, stats) {
    if (err)
        throw new gutil.PluginError("webpack", err)

    var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow'

    if (stats.compilation.errors.length > 0) {
        stats.compilation.errors.forEach(function(error) {
            handleErrors(error)
            statColor = 'red'
        })
    }
    else {
        gutil.log(stats.toString({
            colors: gutil.colors.supportsColor,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false,
            version: false,
            cached: false,
            cachedAssets: false,
            reasons: false,
            source: false,
            errorDetails: false
        }))
    }
}

module.exports = function(root, argv, resource) {
    const config = argv.d ? require('../webpack.dev.config')(root) : require('../webpack.release.config')(root)
    gulp.task('webpack', (callback) => {
        webpack(
            config,
            function(err, stats) {
                compileLogger(err, stats)
                callback()
            }
        )
    })

    gulp.task('watch:webpack', function() {
        webpack(lodash.merge(config, {
            watch: true
        })).watch(200, function(err, stats) {
            compileLogger(err, stats)
        })
    })
}
