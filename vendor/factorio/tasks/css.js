const gulp       = require('gulp'),
    watch        = require('gulp-watch'),
    gulpif       = require('gulp-if'),
    changed      = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    cssnano      = require('gulp-cssnano'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    less         = require('gulp-less'),
    logger       = require('gulp-logger')

module.exports = function(files, argv, resource) {
    // 处理 css
    gulp.task('css', () => {
        return gulp.src(files.css)
            .pipe(gulpif(argv.d, sourcemaps.init()))
            .pipe(plumber())
            .pipe(changed(`${resource}/css`))
            .pipe(logger({
                dest: '/release/resource/css',
                extname: '.css',
                showChange: true
            }))
            .pipe(autoprefixer())
            .pipe(gulpif(!argv.d, cssnano()))
            .pipe(gulpif(argv.d, sourcemaps.write()))
            .pipe(gulp.dest(`${resource}/css`))
    })
    // 监听 css
    gulp.task('watch:css', () => {
        watch(files.css, () => {
            gulp.start('css')
        })
    })
    // 处理 sass
    gulp.task('sass', () => {
        return gulp.src(files.sass)
            .pipe(gulpif(argv.d, sourcemaps.init()))
            .pipe(plumber())
            .pipe(changed(`${resource}/css`, { extension: '.css' }))
            .pipe(logger({
                dest: '/release/resource/css',
                extname: '.css',
                showChange: true
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulpif(!argv.d, cssnano()))
            .pipe(gulpif(argv.d, sourcemaps.write()))
            .pipe(gulp.dest(`${resource}/css`))
    })
    // 监听 sass
    gulp.task('watch:sass', () => {
        watch([`/config/**/*.sass`, files.sass], () => {
            gulp.start('sass')
        })
    })
    // 处理 less
    gulp.task('less', () => {
        return gulp.src(files.less)
            .pipe(gulpif(argv.d, sourcemaps.init()))
            .pipe(plumber())
            .pipe(changed(`${resource}/css`, { extension: '.css' }))
            .pipe(logger({
                dest: '/release/resource/css',
                extname: '.css',
                showChange: true
            }))
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(gulpif(!argv.d, cssnano()))
            .pipe(gulpif(argv.d, sourcemaps.write()))
            .pipe(gulp.dest(`${resource}/css`))
    })
    // 监听 less
    gulp.task('watch:less', () => {
        watch(files.less, () => {
            gulp.start('less')
        })
    })
}
