const gulp                    = require('gulp'),
    watch                     = require('gulp-watch'),
    browserSync               = require('browser-sync').create(),
    clean                     = require('gulp-clean'),
    serveIndex                = require('serve-index'),
    connectLogger             = require('connect-logger'),
    connectHistoryApiFallback = require('connect-history-api-fallback')

module.exports = function(files, argv, root, resource, dest, app) {
    const mockMiddleware = require(`${root}/vendor/mock/mock-middleware`)

    gulp.task('default', ['serve', 'watch'])

    gulp.task('watch', [
        'watch:image',
        'watch:webpack',
        'watch:vendor',
        'watch:css',
        'watch:less',
        'watch:sass',
        'watch:babel',
        'watch:pug',
        'watch:html',
        'watch:font',
        'watch:media'
    ])

    gulp.task('media', () => {
        return gulp.src(files.media)
            .pipe(gulp.dest(`${resource}`))
    })

    gulp.task('watch:media', () => {
        watch(files.media, () => {
            gulp.start('media')
        })
    })

    gulp.task('font', () => {
        return gulp.src(files.font)
            .pipe(gulp.dest(`${resource}`))
    })

    gulp.task('watch:font', () => {
        watch(files.font, () => {
            gulp.start('font')
        })
    })

    gulp.task('vendor', () => {
        return gulp.src(files.vendor)
            .pipe(gulp.dest(`${resource}/vendor`))
    })

    gulp.task('watch:vendor', () => {
        watch(files.vendor, () => {
            gulp.start('vendor')
        })
    })

    gulp.task('clean', () => {
        return gulp.src(`${dest}`, { read: false })
            .pipe(clean())
    })

    gulp.task('release', ['clean'] ,() => {
        gulp.start(['pug', 'sass', 'css', 'babel', 'image', 'vendor', 'webpack', 'html', 'less', 'font', 'media'])
    })

    gulp.task('serve', () => {
        const file = [`${dest}/**/*`]
        browserSync.init(file, {
            open: '',
            notify: false,
            logFileChanges: false,
            server: { baseDir: dest },
            plugins: ['bs-latency'],
            middleware: [
                mockMiddleware(),
                serveIndex(`${root}/release`, { icons: true }),
                connectLogger(),
                connectHistoryApiFallback()
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
