var gulp = require('gulp');
var del = require('del');
var swPrecache = require('sw-precache');
var $ = require('gulp-load-plugins')();
var path = require('path');
var htmlreplace = require('gulp-html-replace');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');

var rootDir = 'dist';

gulp.task('clean', function () {
  del(['dist/**/*', '!dist'])
});

gulp.task('build', ['clean'], function () {
  return gulp.src('src/index.js')
    .pipe(gulpWebpack(require('./webpack.prod.config'), webpack))
    .pipe(gulp.dest(rootDir));
});

gulp.task('test', function () {
  gulp.src(path.join(rootDir,'index.html'))
    .pipe(htmlreplace({
      precache: 'service-worker.js'
    }))
    .pipe(gulp.dest(rootDir))
})

gulp.task('precache', function (cb) {
  writeServiceWorkerFile(rootDir, false, cb);
});

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    logger: $.util.log,
    staticFileGlobs: [
      rootDir + '/css/**.css',
      rootDir + '/**.html',
      rootDir + '/images/**.*',
      rootDir + '/js/**.js'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
}