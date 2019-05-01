const { src, dest, parallel } = require( 'gulp' ),
    autoprefixer = require ('gulp-autoprefixer'),
    concat = require( 'gulp-concat' ),
    cssMin = require('gulp-csso'),
    rename = require('gulp-rename'),
    sass = require( 'gulp-sass' ),
    tinify = require('gulp-tinify'),
    gcmq = require('gulp-group-css-media-queries'),
    htmlMin = require('gulp-htmlmin'),
    normalize = require('node-normalize-scss'),
    env = require('node-env-file'),

    API_KEY_TINIFY = env('../api/.env').tinify,
    views= ['index.html'],
    styles = ['sass/mixins/*.scss', 'sass/**/*.scss'],
    images = ['img/**/*'];

function css() {
    return src( styles )
        .pipe( concat( 'style.scss'))
        .pipe( sass({includePaths: normalize.includePaths}))
        .pipe(autoprefixer({
            browsers: ['last 11 version'],
            cascade: false,
        }))
        .pipe(gcmq())
        .pipe(dest('style/'))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist/style/'))
        .pipe(dest('style/'))

}

function html() {
    return src(views)
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(dest('dist/'))
}

function img() {
    return src(images, {nodir: true})
        .pipe(tinify(API_KEY_TINIFY))
        .pipe(dest('dist/img/'))
}
function build() {
    return src('fonts/**/*')
        .pipe(dest('dist/fonts/'))
}
exports.html = html;
exports.css = css;
exports.img = img;
exports.build = build;
exports.default = parallel(html, css);