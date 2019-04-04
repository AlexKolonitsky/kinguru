var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var gm = require('gulp-gm');

var htmlmin = require('gulp-htmlmin');
var validateHtml = require('gulp-html-validator');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var favicons = require('gulp-favicons');
var data = require('gulp-data');
var replace = require('gulp-replace');
var file = require('gulp-file');
var debug = require('gulp-debug');
var runSequence = require('run-sequence');


gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('min-js', function() {
  return gulp.src('js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./dist/js'));

});

gulp.task('min-css', function() {
  gulp.src('dist/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'));
  return gulp.src(['dist/css/*.css', '!styles.min.css'])
    .pipe(clean({force: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('min-html', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('scss-css', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('min', ['min-js', 'min-css', 'min-html']);

gulp.task('copy', function () {
  gulp.src([
    './fonts/*',
    './img/*',
    './js/*',
    './vendor/**/*',

  ], { base: './'})
    .pipe(gulp.dest('./dist/'));

  return gulp.src(['./favicon/*'], {dot: true})
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function () {
  return runSequence('clean', 'scss-css', 'copy', 'min-css', 'min-html');
});