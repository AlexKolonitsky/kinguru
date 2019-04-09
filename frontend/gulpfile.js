var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');


gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('min-js', function() {
  return gulp.src('js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./build/js'));

});

gulp.task('min-css', function() {
  gulp.src('build/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./build/css'));
  return gulp.src(['build/css/*.css', '!styles.min.css'])
    .pipe(clean({force: true}))
});

gulp.task('min-html', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('scss-css', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('min', ['min-js', 'min-css', 'min-html']);

gulp.task('copy', function () {
  gulp.src([
    './fonts/*',
    './img/*',
    './js/*',
    '!./js/environmentDev.js',
    '!./js/environmentProd.js',
    './css/*',  // delete after scss
    './vendor/**/*',

  ], { base: './'})
    .pipe(gulp.dest('./build/'));

  return gulp.src(['./favicon/*'], {dot: true})
    .pipe(gulp.dest('./build/'));
});

gulp.task('environment-dev', function () {
  return gulp.src('./js/environmentDev.js')
    .pipe(rename('environment.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('environment-prod', function () {
  return gulp.src('./js/environmentProd.js')
    .pipe(rename('environment.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('default', function () {
  return runSequence('clean', 'scss-css', 'copy', 'environment-dev', 'min-css', 'min-html');
});

gulp.task('prod', function () {
  return runSequence('clean', 'scss-css', 'copy', 'environment-prod', 'min-css', 'min-html');
});