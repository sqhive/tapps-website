/**
 *
 */
'use strict';

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';

import bsync from 'browser-sync';
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
    path.join(conf.paths.src, '/*.+(html)')
  )
  // Rendering the templates.
  .pipe(nunjucks({
    path: [conf.paths.src]
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
 * Watch task
 */
gulp.task('watch',function() {
  // Watch for styles changes.
  gulp.watch(
    path.join(conf.paths.src, "/css/**/*.scss"),
    ['build-css']
  );
  // Watch for templates changes.
  gulp.watch(
    path.join(conf.paths.src, '/*.+(html)'),
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
