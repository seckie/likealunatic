'use strict';
// gulp tasks
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

// constants
var PUBLIC_PATH = 'public/';
var WP_THEME_PATH = 'public/wp-content/themes/likealunatic30/';
var SRC_PATH = './src/';
var PATHS = {
  jsSrc: [SRC_PATH + 'js/**/*.js'],
  jsSrcMain: SRC_PATH + 'js/main.js',
  js: [WP_THEME_PATH + '**/*.js'],
  jsDir: WP_THEME_PATH,

  sass: [SRC_PATH + 'sass/**/*.sass'],
  sassEntry: [ SRC_PATH + 'sass/**/!(_)*.sass'],
  css: [WP_THEME_PATH + '**/*.css'],
  cssDir: WP_THEME_PATH
};

// methods
function errorHandler (err, stats) {
  if (err || (stats && stats.compilation.errors.length > 0)) {
    const error = err || stats.compilation.errors[0].error;
    notify.onError({ message: '<%= error.message %>' })(error);
  }
}

// build CSS
gulp.task('sass', function () {
  return gulp.src(PATHS.sass)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(PATHS.cssDir))
    .pipe(browserSync.stream());
});

// build JavaScript
gulp.task('jshint', function () {
  return gulp.src(PATHS.jsSrc.concat(['./gulpfile.js']))
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// webpack
var WEBPACK_OPT = {
  entry: { script: PATHS.jsSrcMain },
  output: {filename: '[name].js'},
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  externals: { }
};
gulp.task('build', function () {
  return gulp.src(PATHS.jsSrcMain)
    .pipe(gulpWebpack(WEBPACK_OPT, null, errorHandler))
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});

var WEBPACK_COMPRESS_OPT = {
  output: { filename: '[name].min.js' },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: function (astNode, comment) {
        return /^!\*?/.test(comment.value) ||
               /(@preserve|@license|Copyright)/.test(comment.value);
      },
      mangle: false
    })
  ]
};
gulp.task('compress', function () {
  var opt = Object.assign({}, WEBPACK_OPT, WEBPACK_COMPRESS_OPT);
  return gulp.src(PATHS.jsSrcMain)
    .pipe(gulpWebpack(opt, null, errorHandler))
    .pipe(gulp.dest(PATHS.jsDir))
    .pipe(browserSync.stream());
});

// server
gulp.task('browser-sync', function () {
  browserSync.init({
    open: false,
    server: {
      baseDir: PUBLIC_PATH,
      middleware: [
        function (req, res, next) {
          var msg = req.method;
          msg += ' ';
          msg += req.url;
          msg += '  ';
          msg += req.statusCode;
          msg += ' ';
          msg += req.statusMessage;
          console.log(msg);
          next();
        }
      ]
    }
  });
});

// watch
gulp.task('watch', function () {
  gutil.log('start watching');
  gulp.watch(PATHS.sass, ['sass']);
  gulp.watch(PATHS.jsSrc, ['build']);
});

// commands
gulp.task('default', ['browser-sync', 'sass', 'watch']);

