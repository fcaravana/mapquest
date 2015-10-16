var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');

gulp.task('basket-js', function() {
    return gulp.src(['./assets/js/bower_components/basket.js/dist/basket.js'])
        .pipe(concat('basket.min.js'))
        .pipe(uglify())
        .pipe(debug())
        .pipe(gulp.dest('./assets/js/libs'));
});

gulp.task('rsvp-js', function() {
    return gulp.src(['./assets/js/bower_components/rsvp/rsvp.js'])
        .pipe(concat('rsvp.min.js'))
        .pipe(uglify())
        .pipe(debug())
        .pipe(gulp.dest('./assets/js/libs'));
});

gulp.task('swig-js', function() {
    return gulp.src(['./assets/js/bower_components/swig/*.js'])
        .pipe(concat('swig.min.js'))
        .pipe(debug())
        .pipe(gulp.dest('./assets/js/libs'));
});

gulp.task('bower-minify-js', function() {
    var filter = gulpFilter(['**/*.js', '!**/rsvp.js', '!**/basket.js', '!**/swig.min.js']);
    return gulp.src('./assets/js/bower.json')
        .pipe(mainBowerFiles())
        .pipe(filter)
        .pipe(debug())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/libs'));
});

gulp.task('bower-minify-css', function() {
    return gulp.src(['**/bootstrap.min.css', '**/bootstrap-table.min.css', '**/magnific-popup.css'])
        .pipe(debug())
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['basket-js', 'rsvp-js', 'swig-js', 'bower-minify-js', 'bower-minify-css']);