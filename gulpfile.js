var gulp = require('gulp'),
sass = require('gulp-sass'),
coffee = require('gulp-coffee'),
uglify = require('gulp-uglify'),
minifyCss = require('gulp-minify-css'),
livereload = require('gulp-livereload'),
server = require('gulp-server-livereload');

var styleSrc = 'scss/**/*.scss',
coffeeSrc = 'coffee/**/*.coffee',
htmlSrc = 'html/**/*.html';

gulp.task('scss', function() {
  gulp.src(styleSrc)
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(gulp.dest('css'));
});

gulp.task('coffee', function() {
  gulp.src(coffeeSrc)
  .pipe(coffee())
  .pipe(uglify({
    compress: true,
    mangle: false
  }))
  .pipe(gulp.dest('js'));
});

gulp.task('html', function() {
  gulp.src(htmlSrc)
  .pipe(gulp.dest('./'));
});

gulp.task('watch', ['coffee', 'scss', 'html'], function() {
  gulp.src('./')
  .pipe(server({
    livereload: true,
    directoryListing: true,
    open: true
  }));
  gulp.watch(styleSrc, ['scss']);
  gulp.watch(coffeeSrc, ['coffee']);
  gulp.watch(htmlSrc, ['html']);
});
