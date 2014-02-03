var clean, concat, gulp, livereload, lr, minifycss, notify,
    rename, sass, server, uglify;

clean = require('gulp-clean');
concat = require('gulp-concat');
gulp = require('gulp');
livereload = require('gulp-livereload');
lr = require('tiny-lr');
minifycss = require('gulp-minify-css');
notify = require('gulp-notify');
rename = require('gulp-rename');
sass = require('gulp-ruby-sass');
uglify = require('gulp-uglify');

server = lr();

gulp.task('styles', function () {
    return gulp.src('./src/static/styles/main.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('./src/static/dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./src/static/dist/styles'))
        .pipe(livereload(server))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src([
            // './src/static/bower_components/lodash/lodash.js',
            './src/static/scripts/**/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./src/static/dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('./src/static/dist/scripts'))
        .pipe(livereload(server))
        .pipe(notify({ message: 'Scripts task complete' }));
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