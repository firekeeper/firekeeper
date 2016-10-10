module.exports = function(root) {
    const gulp     = require('gulp')
    const plugins  = require('gulp-load-plugins')()
    const argv     = require('yargs').argv
    const app      = `${root}/app`
    const dest     = `${root}/release`
    const resource = `${dest}/resource`

    const files = {
        css: `${app}/css/**/*.css`
        , sass: `${app}/css/**/*.{sass, scss}`
        , pug: `${app}/view/**/*.pug`
        , babel: `${app}/script/**/*.js`
        , less: `${app}/css/**/*.less`
        , image: `${app}/image/**/*.{jpg,png,svg,gif,ico}`
        , vendor: `${app}/vendor/**/*.*`
        , html: `${app}/view/**/*.html`
        , font: [`${app}/**/*.{svg,eot,ttf,woff}`, `!${app}/module/**/*.*`]
        , media: [`${app}/**/*.{mp4,mp3}`, `!{app}/module/**/*.*`]
    }

    require('./tasks/css')(files, argv, resource)
    require('./tasks/image')(files, argv, resource)
    require('./tasks/view')(files, argv, app, dest)
    require('./tasks/script')(files, argv, resource)
    require('./tasks/common')(files, argv, root, resource, dest, app)
    require('./tasks/webpack')(root, argv, resource)

}
