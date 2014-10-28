var gulp = require('gulp');
var bem = require('gulp-bem');
var concat = require('gulp-concat');
var concatCSS = require('gulp-concat-css');
var del = require('del');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var buildBranch = require('buildbranch');
var watch = require('gulp-watch');
var debug = require('gulp-debug');
var replace = require('gulp-replace');

var levels = ['blocks', 'pages'];

var tree;

gulp.task('tree', function() {
    tree = bem.objects(levels).pipe(bem.deps()).pipe(bem.tree());
});

gulp.task('js', ['tree'], function() {
    return tree.deps('pages/index')
        .pipe(bem.src('{bem}.js'))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['js'], function() {
    return gulp.src('dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['tree'], function() {
    return tree.deps('pages/index')
        .pipe(bem.src('{bem}.css'))
        .pipe(concatCSS('index.css'))
        .pipe(replace(/url\("../gim, 'url("../blocks'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css-images', function() {
    return gulp.src('blocks/**').pipe(gulp.dest('dist/blocks'));
});

gulp.task('html', ['tree'], function() {
    return tree.deps('pages/index')
        .pipe(bem.src('{bem}.jade'))
        .pipe(concat({
            path: 'pages/index/index.jade',
            base: 'pages/index'
        }))
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

gulp.task('build', ['html', 'css', 'css-images', 'js']);

gulp.task('production', ['build', 'uglify']);

gulp.task('gh', ['production'], function(done) {
    buildBranch({ folder: 'dist', ignore: ['libs'] }, done);
});

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(express.static('dist'));
    app.listen(4000);
    console.log('Server is running on http://localhost:4000/');
});

gulp.task('watch', ['express', 'build'], function() {
    watch('{blocks,pages}/**/*.deps.js',  function() { gulp.start('build'); });
    watch('{blocks,pages}/**/*.css',  function() { gulp.start('css'); });
    watch('{blocks,pages}/**/*.js',  function() { gulp.start('js'); });
    watch('{blocks,pages}/**/*.jade', function() { gulp.start('html'); });
    watch('*.js', function() { gulp.start('build'); });
});

gulp.task('default', ['watch']);
