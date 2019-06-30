const {src, dest, parallel, watch, series} = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const eslint = require('gulp-eslint');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

// constants
const PUBLIC_PATH = 'public/';
const WP_THEME_PATH = 'public/wp-content/themes/likealunatic30/';
const SRC_PATH = './src/';
const GULPFILE_PATH = './gulpfile.js';
const PATHS = {
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
function taskSass() {
  return src(PATHS.sass)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest(PATHS.cssDir))
    .pipe(browserSync.stream());
}

// build JavaScript
function taskEslint() {
  return src(PATHS.jsSrc.concat([GULPFILE_PATH]))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// webpack
const WEBPACK_OPT = {
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

function taskBuild() {
  return src(PATHS.jsSrcMain)
    .pipe(gulpWebpack(WEBPACK_OPT, null, errorHandler))
    .pipe(dest(PATHS.jsDir))
    .pipe(browserSync.stream());
}

const WEBPACK_COMPRESS_OPT = {
  output: { filename: '[name].min.js' },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    /*
    // Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: function (astNode, comment) {
        return /^!\*?/.test(comment.value) ||
               /(@preserve|@license|Copyright)/.test(comment.value);
      },
      mangle: false
    })
    */
  ]
};
function taskCompress() {
  const opt = Object.assign({}, WEBPACK_OPT, WEBPACK_COMPRESS_OPT);
  return src(PATHS.jsSrcMain)
    .pipe(gulpWebpack(opt, null, errorHandler))
    .pipe(dest(PATHS.jsDir))
    .pipe(browserSync.stream());
}

// server
function taskBrowserSync() {
  browserSync.init({
    open: false,
    server: {
      baseDir: PUBLIC_PATH,
      middleware: [
        function (req, res, next) {
          let msg = req.method;
          msg += ' ';
          msg += req.url;
          msg += '  ';
          msg += req.statusCode;
          msg += ' ';
          msg += req.statusMessage;
          gutil.log(msg);
          next();
        }
      ]
    }
  });
}

// watch
function taskWatch() {
  gutil.log('start watching');
  watch(PATHS.sass, taskSass);
  watch(PATHS.jsSrc, series(taskEslint, taskBuild));
  watch([GULPFILE_PATH], taskEslint);
}

exports.sass = taskSass;
exports.eslint = taskEslint;
exports.build = taskBuild;
exports.compress = taskCompress;
exports.browserSync = taskBrowserSync;
exports.watch = taskWatch;
exports.default = parallel(taskBrowserSync, taskSass, taskEslint, taskWatch);
