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
import nunjucks from 'gulp-nunjucks-render'
import concat from 'gulp-concat'
import minify from 'gulp-clean-css'
import uglify from'gulp-uglify'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import prettify from 'gulp-jsbeautifier'
import removeEmptyLines from 'gulp-remove-empty-lines'

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
gulp.task('build-templates',
  [
    'build-templates-styles'
  ], () => {

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
  ))
})

gulp.task('build-templates-styles', () => {
  return gulp.src(
    path.join(conf.paths.src, '/templates/styles/**/*.scss')
  )
  // Compile.
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // Minify output.
  .pipe(minify())
  // Concat files.
  .pipe(concat('app.css'))
  // Output file.
  .pipe(gulp.dest(
    path.join(conf.paths.dist, '/')
  ))
})

/**
 * Build app task.
 */
gulp.task('build-app', (callback) => {

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
 * Build examples
 */
gulp.task('build-examples', () => {
  return gulp.src(
    path.join(conf.paths.src + '/examples/*.tapp')
  )
  .pipe(gulp.dest(conf.paths.dist + '/examples/'))
})

/**
 * Build tasks
 */
gulp.task('build', [
  'build-app',
  'build-templates',
  'build-examples'
])

/**
 * Watch task
 */
gulp.task('watch', () => {
  // Watch for templates changes.
  gulp.watch(
    path.join(conf.paths.src, '/templates/**/*.+(html|scss)'),
    ['build-templates']
  );
  // Watch for app changes.
  gulp.watch(
    path.join(conf.paths.src, '/app/**/*.js'),
    ['build-app']
  )
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
      path.join(conf.paths.dist, '/*.js')
    ], (event) => {
      bsync.reload(event.path);
  });
});

gulp.task('serve', [
  'build',
  'watch',
  'server'
]);
