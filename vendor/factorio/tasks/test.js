/**
 * Created by ashenone on 16-10-20.
 */

const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    serveIndex = require('serve-index'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    notify = require('gulp-notify'),
    lodash = require('lodash'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean')

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

module.exports = (root) => {

    gulp.task('vendor:test', ['vendor:test:clean'], () => {
        gulp.start([
            'vendor:test:serve',
            'vendor:test:webpack',
            'vendor:test:watch:webpack',
            'vendor:test:pug',
            'vendor:test:watch:pug'
        ])
    })

    gulp.task('vendor:test:pug', () => {
        return gulp.src(`${root}/test/handle/view/**/*`)
            .pipe(changed(`${root}/test/output`, { extension: '.html' }))
            .pipe(plumber())
            .pipe(pug())
            .pipe(gulp.dest(`${root}/test/output`))
    })

    gulp.task('vendor:test:watch:pug', () => {
        watch(`${root}/test/handle/view/**/*.pug`, () => {
            gulp.start('vendor:test:pug')
        })
    })

    const config = require('../webpack.test.config')(root)

    gulp.task('vendor:test:webpack', (callback) => {
        webpack(
            config,
            function(err, stats) {
                compileLogger(err, stats)
                callback()
            }
        )
    })

    gulp.task('vendor:test:watch:webpack', function() {
        webpack(lodash.merge(config, {
            watch: true
        })).watch(200, function(err, stats) {
            compileLogger(err, stats)
        })
    })

    gulp.task('vendor:test:clean', () => {
        return gulp.src(`${root}/test/output`, { read: false })
            .pipe(clean())
    })

    gulp.task('vendor:test:serve', () => {
        const file = `${root}/test/output/**/*`
        browserSync.init(file, {
            open: '',
            notify: false,
            logFileChanges: false,
            server: { baseDir: `${root}/test/output` },
            middleware: [
                serveIndex(`${root}/test/output`, { icons: true })
            ],
            snippetOptions: {
                rule: {
                    match: /<\/head>/i,
                    fn: function(snippet, match) {
                        return `${match}${snippet}`
                    }
                }
            }
        })
    })
}