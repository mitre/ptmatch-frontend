var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // opens a URL in a web browser
var browserify = require('browserify'); // bundles JS
var babelify = require('babelify'); // transforms to ES6
var source = require('vinyl-source-stream'); // uses conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lints JS files, including JSX
var sass = require('gulp-sass'); // bundles Sass CSS
var plumber = require('gulp-plumber'); // error handling for gulp streams
var gutil = require('gulp-util');
var buffer = require('gulp-buffer');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var uglify = require('gulp-uglify');
var order = require('gulp-order');
var cssnano = require('gulp-cssnano');
var watch = require('gulp-watch');
var inject = require('gulp-inject-string');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');

var isBuild = false;
var connectServerRunning = false;
var config = {
  port: 9005,
  liveReloadPort: 35729,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
      './src/**/*.css'
    ],
    sass: [
      './src/styles/application.scss'
    ],
    fonts: [
      './node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
      './node_modules/font-awesome/fonts/*',
      './src/fonts/**/*'
    ],
    images: './src/images/**/*',
    dist: './dist',
    mainJs: './src/index.js',
    externalJs: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
    ]
  },
  sassOptions: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};

gulp.task('default', ['serve']);

gulp.task('build', function(done) {
  isBuild = true;

  gutil.log(gutil.colors.green('Cleaning up previous build files...'));
  rimraf.sync('rev-manifest.json');
  rimraf.sync('dist');

  gutil.log(gutil.colors.green('Starting build...'));
  runSequence('vendorJs', 'js', 'sass', 'images', 'favicon', 'fonts', 'html', 'lint', done);
});

// starts a local development server
gulp.task('serve', function() {
  connectServerRunning = true;

  runSequence('vendorJs', 'js', 'sass', 'images', 'favicon', 'fonts', 'html', 'lint', function() {
    connect.server({
      root: 'dist',
      port: config.port,
      base: config.devBaseUrl,
      livereload: {
        port: config.liveReloadPort
      },
      fallback: 'dist/index.html'
    });

    gulp.start('watch');
  });
});

// watches files for changes and reloads
gulp.task('watch', function() {
  gutil.log(gutil.colors.green('Watching for file changes...'));

  watch(config.paths.sass, function (vinyl) {
    gutil.log(gutil.colors.green(vinyl.relative), 'fired', gutil.colors.green(vinyl.event));

    runSequence('sass');
  });
  watch(config.paths.js, function (vinyl) {
    gutil.log(gutil.colors.green(vinyl.relative), 'fired', gutil.colors.green(vinyl.event));

    runSequence('js', 'lint');
  });
  watch(config.paths.dist + '/**/*').pipe(connect.reload());
});

// moves html files to dist folder
gulp.task('html', function html() {
  var stream = gulp.src(isBuild ? ['rev-manifest.json', config.paths.html] : [config.paths.html])
    .pipe(plumber({
      errorHandler: handleError
    }));

  if (connectServerRunning) {
    stream = stream.pipe(inject.before('</body', '  <script src="http://localhost:' + config.liveReloadPort + '/livereload.js?snipver=1"></script>' + "\n  "));
  }

  if (isBuild) {
    stream = stream.pipe(revCollector({ replaceReved: true }));
  }

  return stream.pipe(gulp.dest(config.paths.dist));
});

// bundles external js files, moves them to dist folder
gulp.task('vendorJs', function() {
  var stream = gulp.src(config.paths.externalJs)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(order(config.paths.externalJs.map(function(path) { return path.replace(/^\.\//, ''); }), { base: '.' }))
    .pipe(concat('vendor.js'));

  if (isBuild) {
    stream = stream.pipe(uglify());
  }

  stream = stream.pipe(buffer());

  if (isBuild) {
    stream = stream.pipe(rev());
  }

  stream = stream.pipe(gulp.dest(config.paths.dist + '/assets/scripts')); // destination

  if (isBuild) {
    stream = stream.pipe(rev.manifest({ merge: true })).pipe(gulp.dest('.'));
  }

  return stream;
});

// bundles js files, moves them to dist folder, and reloads
gulp.task('js', function() {
  var stream = browserify({
      entries: config.paths.mainJs,
      extensions: ['.js'],
      debug: true
    })
    .transform(babelify, { presets: ["es2015", "react"] }) // transforms JSX to JS & ES6
    .bundle() // combines all JS files into one
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(source('ptmatch.js')) // names bundle
    .pipe(buffer());

  if (isBuild) {
    stream = stream.pipe(uglify()).pipe(rev());
  }

  stream = stream.pipe(gulp.dest(config.paths.dist + '/assets/scripts')); // destination

  if (isBuild) {
    stream = stream.pipe(rev.manifest({ merge: true })).pipe(gulp.dest('.'));
  }

  return stream;
});

// bundles sass files, moves them to dist folder
gulp.task('sass', function() {
  var stream = gulp.src(config.paths.sass)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(sass(config.sassOptions))
    .pipe(concat('ptmatch.css'));

  if (isBuild) {
    stream = stream.pipe(cssnano());
  }

  stream = stream.pipe(buffer());

  if (isBuild) {
    stream = stream.pipe(rev());
  }

  stream = stream.pipe(gulp.dest(config.paths.dist + '/assets/css'));

  if (isBuild) {
    stream = stream.pipe(rev.manifest({ merge: true })).pipe(gulp.dest('.'));
  }

  return stream;
});

// copies images to dist folder
gulp.task('images', function() {
  return gulp.src(config.paths.images).pipe(gulp.dest(config.paths.dist + '/assets/images'));
});

// copies favicon to dist folder
gulp.task('favicon', function() {
  return gulp.src('./src/favicon.ico').pipe(gulp.dest(config.paths.dist));
});

// copies fonts to a dist folder
gulp.task('fonts', function() {
  return gulp.src(config.paths.fonts).pipe(gulp.dest(config.paths.dist + '/assets/fonts'));
});

// handles js linting
gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(plumber({
      errorHandler: handleError
    }))
   .pipe(lint({ config: '.eslintrc' }))
   .pipe(lint.format());
});

function handleError(error) {
  gutil.beep();
  var message = null;
  if (error.hasOwnProperty('formatted')) {
    message = error.formatted;
  } else {
    message = error;
  }
  gutil.log(gutil.colors.red(message));
  this.emit('end');
}
