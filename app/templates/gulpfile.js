var clean, concat, gulp, gutil, livereload, lr, minifycss, rename, sass,
    server, uglify;

clean = require('gulp-clean');
concat = require('gulp-concat');
gulp = require('gulp');
livereload = require('gulp-livereload');
lr = require('tiny-lr');
minifycss = require('gulp-minify-css');
rename = require('gulp-rename');
sass = require('gulp-ruby-sass');
uglify = require('gulp-uglify');
gutil = require('gulp-util');

server = lr();

gulp.task('styles', function () {
    return gulp.src('./src/static/styles/main.scss')
        .pipe(sass({quiet: true, style: 'expanded', sourcemap: gutil.env.debug}))
        .pipe(gulp.dest('./src/static/dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./src/static/dist/styles'))
        .pipe(livereload(server));
});

gulp.task('scripts', function() {
    return gulp.src([
            // './src/static/bower_components/lodash/lodash.js',
            './src/static/scripts/**/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./src/static/dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({outSourceMap: gutil.env.debug}))
        .pipe(gulp.dest('./src/static/dist/scripts'))
        .pipe(livereload(server));
});

gulp.task('clean', function() {
    return gulp.src([
        './src/static/dist/scripts', './src/static/dist/styles'
    ], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
    server.listen(35729, function (err) {
        if (err) { return console.log(err) };
        gulp.watch('./src/static/styles/**/*.scss', ['styles']);
        gulp.watch('./src/static/scripts/**/*.js', ['scripts']);
    });
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});