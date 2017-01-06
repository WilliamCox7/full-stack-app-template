var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    //uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();


// gulp.task('clean', function (cb) {
//   del(['dist'], cb);
// });

gulp.task('build-css', /*['clean'],*/ function () {
  return gulp.src('styles/**/*.*css')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/styles'));
});


gulp.task('build-js', /*['clean'],*/ function() {
  return gulp.src(['js/app.js', 'js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(print())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('bundle.js'))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', [ /*'clean',*/ 'build-css', 'build-js'], function() {
  return gulp.src('index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  return gulp.watch([
    './index.html',
    './partials/*.html',
    './styles/*.*css',
    './js/**/*.js'],
    ['build']
  );
});
