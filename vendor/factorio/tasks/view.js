const gulp       = require('gulp'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    pug          = require('gulp-pug'),
    htmlBeautify = require('gulp-html-beautify'),
    htmlmin      = require('gulp-htmlmin'),
    watch        = require('gulp-watch'),
    logger       = require('gulp-logger')

module.exports = function(files, argv, app, dest, root) {
    gulp.task('pug', () => {
        return gulp.src([files.pug, `!${app}/view/**/_*.pug`])
            .pipe(changed(`${dest}/view`, { extension: '.html' }))
            .pipe(plumber())
            .pipe(logger({
                dest: '/release/view',
                extname: '.html',
                showChange: true
            }))
            .pipe(pug())
            .pipe(htmlBeautify({
                indent_size: 4
                , indent_char: ' '
                // 设置 head body 标签是否缩进
                , indent_inner_html: false
                , unformatted: true
                // 取消标签前的空行
                , extra_liners: []
            }))
            .pipe(htmlmin({
                // 是否显示单标签斜线
                keepClosingSlash: false
            }))
            .pipe(gulp.dest(`${dest}/view`))
    })

    gulp.task('watch:pug', () => {
        watch([`${root}/config/**/*.pug`, files.pug], () => {
            gulp.start('pug')
        })
    })

    gulp.task('html', () => {
        return gulp.src(files.html)
            .pipe(changed(`${dest}/view`))
            .pipe(plumber())
            .pipe(logger({
                dest: '/release/view',
                extname: '.html',
                showChange: true
            }))
            .pipe(htmlBeautify({
                indent_size: 4
                , indent_char: ' '
                // 设置 head body 标签是否缩进
                , indent_inner_html: false
                , unformatted: true
                // 取消标签前的空行
                , extra_liners: []
            }))
            .pipe(htmlmin({
                // 是否显示单标签斜线
                keepClosingSlash: false
            }))
            .pipe(gulp.dest(`${dest}/view`))
    })

    gulp.task('watch:html', () => {
        watch(files.html, () => {
            gulp.start('html')
        })
    })
}
