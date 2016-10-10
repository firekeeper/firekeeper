const gulp   = require('gulp'),
    changed  = require('gulp-changed'),
    gulpif   = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    watch    = require('gulp-watch'),
    logger   = require('gulp-logger')

module.exports = function(files, argv, resource) {
    gulp.task('image', () => {
        return gulp.src(files.image)
            .pipe(changed(`${resource}/image`))
            .pipe(gulpif(!argv.d, imagemin()))
            .pipe(logger({
                dest: `/release/resource/image`,
                showChange: true
            }))
            .pipe(gulp.dest(`${resource}/image`))
    })

    gulp.task('watch:image', () => {
        watch(files.image, () => {
            gulp.start('image')
        })
    })
}
