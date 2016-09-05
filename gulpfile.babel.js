/**
 *
 */
'use strict';

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';

import babelify from 'babelify';
import browserify from 'browserify';
import bsync from 'browser-sync';
import vss from 'vinyl-source-stream'
import nunjucks from 'gulp-nunjucks-render';
import removeEmptyLines from 'gulp-remove-empty-lines';
import prettify from 'gulp-jsbeautifier';

/**
 * Common paths.
 */
var conf = {
  paths: {
    src: './src',
    dist: './dist',
    tmp: './tmp'
  }
}


/**
 * Build task
 */
gulp.task('build', () => {

  return gulp.src(
    path.join(conf.paths.src, '/templates/*.+(html)')
  )
  // Rendering the templates.
  .pipe(nunjucks({
    path: [
      path.join(conf.paths.src, '/templates/')
    ]
  }))
  // Make output pretty.
  .pipe(removeEmptyLines())
  .pipe(prettify())
  // Output files.
  .pipe(gulp.dest(
    path.join(conf.paths.dist, '/')
  ));
});

/**
 * Browserify task
 */
gulp.task('browserify', function(callback) {

  return browserify({
      // Required watchify args
      cache: {}, packageCache: {}, fullPaths: false,
      // Specify the entry point of your app
      entries: path.join(conf.paths.src, '/app/app.js'),
      // Add file extensions to make optional in your requires
      extensions: ['.js'],
      // Enable source maps!
      debug: true
    })
    .transform(babelify.configure({
      presets: ['es2015', 'react', 'stage-1']
    }))
    .bundle()
    .pipe(vss('app.js'))
    .pipe(gulp.dest(conf.paths.dist))
});


/**
 * Watch task
 */
gulp.task('watch',function() {
  // Watch for styles changes.
  gulp.watch(
    path.join(conf.paths.src, '/templates/css/**/*.scss'),
    ['build-css']
  );
  // Watch for templates changes.
  gulp.watch(
    path.join(conf.paths.src, '/templates/*.+(html)'),
    ['build']
  );
});


/**
 * Server task.
 */
gulp.task('server', () => {
  // Initialise the server.
  bsync.init({
    server: {
      baseDir: conf.paths.dist
    }
  });
  // Reload on updates to distribution code.
    gulp.watch([
        path.join(conf.paths.dist, '/')
      ], (event) => {
        bsync.reload(event.path);
    });
});

gulp.task('serve', [
  'build',
  'server',
  'watch'
]);
