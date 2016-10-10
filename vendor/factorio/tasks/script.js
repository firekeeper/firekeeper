const gulp     = require('gulp'),
    watch      = require('gulp-watch'),
    logger     = require('gulp-logger'),
    gulpif     = require('gulp-if'),
    changed    = require('gulp-changed'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber    = require('gulp-plumber'),
    babel      = require('gulp-babel'),
    uglify     = require('gulp-uglify')

module.exports = function(files, argv, resource) {
    gulp.task('babel', () => {
        return gulp.src(files.babel)
            .pipe(gulpif(argv.d, sourcemaps.init()))
            .pipe(plumber())
            .pipe(changed(`${resource}/script`))
            .pipe(logger({
                dest: '/release/resource/script',
                extname: '.js',
                showChange: true
            }))
            .pipe(babel({ presets: ['es2015', 'stage-1'] }))
            .pipe(gulpif(!argv.d, uglify()))
            .pipe(gulpif(argv.d, sourcemaps.write()))
            .pipe(gulp.dest(`${resource}/script`))
    })

    gulp.task('watch:babel', () => {
        watch([`/config/**/*.js`, files.babel], () => {
            gulp.start('babel')
        })
    })
}
